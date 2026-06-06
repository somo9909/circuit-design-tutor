const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are an expert circuit design tutor with deep knowledge of electronics engineering. Your role is to:

1. **Explain Theory**: Clearly explain the underlying electrical/electronic theory behind any circuit problem
2. **Walk Through Calculations**: Provide step-by-step mathematical derivations using proper notation
3. **Analyze Circuit Behavior**: Describe DC operating points, AC behavior, transient responses, and stability
4. **Suggest Design Improvements**: Offer practical ways to improve efficiency, reliability, noise immunity, or cost
5. **Identify Common Pitfalls**: Warn about common mistakes and how to avoid them

## Formatting Guidelines:
- Use **bold** for key terms and component values
- Use ## and ### headings to organize sections clearly
- Use LaTeX math notation wrapped in $...$ for inline math or $$...$$ for display math equations
- Present calculations step-by-step with explanations at each step
- Use tables when comparing options or listing component specs
- Use code blocks for SPICE netlists, pseudocode, or component lists
- Always include units (Ω, V, A, Hz, F, H, W, etc.)

## Response Structure:
For each circuit problem, organize your response as:
1. **Theory Overview** — Key concepts and laws applicable
2. **Circuit Analysis** — Step-by-step calculations  
3. **Key Results** — Summary of important values
4. **Design Improvements** — Practical suggestions
5. **Further Learning** — Related topics to explore

Be thorough but clear. Use analogies to explain complex concepts. Encourage the student with positive but constructive feedback.`;

export async function askCircuitTutor(messages, apiKey, onChunk) {
  // Groq uses OpenAI-compatible chat completions with CORS support
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: 4096,
      temperature: 0.7,
      stream: true,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role, content: m.content })),
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = err?.error?.message || `API error: ${response.status}`;
    throw new Error(msg);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6).trim();
        if (!data || data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          const text = parsed?.choices?.[0]?.delta?.content;
          if (text) {
            fullText += text;
            onChunk(fullText);
          }
        } catch {}
      }
    }
  }

  return fullText;
}

export const EXAMPLE_QUESTIONS = [
  {
    icon: '⚡',
    label: 'RC Low-Pass Filter',
    question: 'Design an RC low-pass filter with a cutoff frequency of 1kHz. What values should I use for R and C? Explain the theory and show the transfer function.',
  },
  {
    icon: '🔋',
    label: 'Voltage Divider',
    question: 'I have a 12V supply and need 5V for a microcontroller using a resistor voltage divider. The load draws 10mA. Calculate the resistor values and explain the limitations of this approach.',
  },
  {
    icon: '📡',
    label: 'Op-Amp Amplifier',
    question: 'Design a non-inverting op-amp amplifier with a gain of 10. What resistors should I use? Show the gain formula derivation and explain the virtual ground concept.',
  },
  {
    icon: '🌊',
    label: 'BJT Bias Circuit',
    question: 'Design a voltage divider bias circuit for a BJT amplifier. The transistor has β=100, VCC=15V, IC=5mA, VCE=7.5V. Show all calculations.',
  },
  {
    icon: '🔌',
    label: 'Buck Converter',
    question: 'Explain how a buck (step-down) converter works. I need to convert 12V to 5V at 2A. Calculate the inductor and capacitor values needed.',
  },
  {
    icon: '🎚️',
    label: 'Oscillator Circuit',
    question: 'Design a 555 timer astable oscillator with a frequency of 1kHz and 50% duty cycle. Show the calculations and explain how it works.',
  },
];
