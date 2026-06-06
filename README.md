# ⚡ Circuit Design Q&A Tutor

An interactive AI-powered tutoring app for electronics and circuit design, built with React and Claude AI.

![Circuit Tutor](https://img.shields.io/badge/Powered%20by-Grok%20AI-000000?style=flat-square&logo=x)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)

## ✨ Features

- **Theory Explanation** — Clear breakdown of electrical/electronic concepts behind any circuit problem
- **Step-by-Step Calculations** — Properly formatted math with LaTeX rendering (KaTeX)
- **Design Improvement Suggestions** — Expert advice on efficiency, reliability, noise immunity
- **Multi-turn Conversation** — Context-aware follow-up questions
- **Markdown + Math Rendering** — Beautiful LaTeX math, tables, code blocks (SPICE netlists, etc.)
- **6 Quick Examples** — One-click starter questions (RC filter, op-amp, BJT bias, etc.)
- **Streaming Responses** — Real-time streaming from Claude API
- **Cyberpunk UI** — Industrial/tech aesthetic with animated elements

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Grok API key](https://console.x.ai) from xAI

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/circuit-design-tutor.git
cd circuit-design-tutor
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and enter your Anthropic API key.

### Build for Production

```bash
npm run build
npm run preview
```

## 🧩 Project Structure

```
circuit-tutor/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with logo & stats
│   │   ├── Sidebar.jsx         # Topic filters & quick examples
│   │   ├── MessageBubble.jsx   # Chat messages with MD + Math
│   │   ├── ChatInput.jsx       # Textarea input with send button
│   │   ├── ApiKeyModal.jsx     # API key entry screen
│   │   └── WelcomeScreen.jsx   # Empty state with featured examples
│   ├── utils/
│   │   └── api.js              # Anthropic API client + examples
│   ├── App.jsx                 # Root app with state management
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles & CSS variables
├── index.html
├── vite.config.js
└── package.json
```

## 🔧 Technology Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| xAI Grok API | grok-3-mini model (OpenAI-compatible) |
| react-markdown | Markdown rendering |
| remark-math + rehype-katex | LaTeX math rendering |
| KaTeX | Math typesetting |

## 🎓 Example Questions

- "Design an RC low-pass filter with cutoff frequency of 1kHz"
- "Calculate the voltage divider for 12V → 5V with a 10mA load"
- "Design a non-inverting op-amp amplifier with gain = 10"
- "Explain BJT voltage divider bias design with calculations"
- "How does a buck converter work? Calculate L and C values"
- "Design a 555 timer astable oscillator at 1kHz"

## 🔐 Security

Your API key is stored **only in memory** during the browser session. It is never persisted to localStorage, cookies, or any server. It is only sent directly to `api.x.ai`.

## 📄 License

MIT License — free to use, modify, and distribute.
