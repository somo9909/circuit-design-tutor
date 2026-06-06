import React, { useState, useRef, useEffect, useCallback } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import MessageBubble from './components/MessageBubble.jsx';
import ChatInput from './components/ChatInput.jsx';
import ApiKeyModal from './components/ApiKeyModal.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import { askCircuitTutor } from './utils/api.js';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);
  const chatHistoryRef = useRef([]); // tracks conversation for API

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(async (text) => {
    const userText = (text || input).trim();
    if (!userText || isLoading) return;

    setInput('');
    setError('');

    const userMsg = { role: 'user', content: userText, id: Date.now() };
    const assistantMsgId = Date.now() + 1;

    setMessages(prev => [
      ...prev,
      userMsg,
      { role: 'assistant', content: '', id: assistantMsgId, streaming: true },
    ]);

    // Update API history
    chatHistoryRef.current = [
      ...chatHistoryRef.current,
      { role: 'user', content: userText },
    ];

    setIsLoading(true);
    try {
      let finalText = '';
      await askCircuitTutor(
        chatHistoryRef.current,
        apiKey,
        (streamedText) => {
          finalText = streamedText;
          setMessages(prev => prev.map(m =>
            m.id === assistantMsgId
              ? { ...m, content: streamedText, streaming: true }
              : m
          ));
        }
      );

      // Mark streaming done
      setMessages(prev => prev.map(m =>
        m.id === assistantMsgId
          ? { ...m, content: finalText, streaming: false }
          : m
      ));

      // Add to API history
      chatHistoryRef.current = [
        ...chatHistoryRef.current,
        { role: 'assistant', content: finalText },
      ];
    } catch (err) {
      setMessages(prev => prev.filter(m => m.id !== assistantMsgId));
      chatHistoryRef.current = chatHistoryRef.current.slice(0, -1);
      setError(err.message || 'Something went wrong. Check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, apiKey]);

  const handleSelectQuestion = useCallback((question) => {
    setInput(question);
    // Auto-send after short delay
    setTimeout(() => {
      sendMessage(question);
    }, 100);
  }, [sendMessage]);

  const handleClear = useCallback(() => {
    setMessages([]);
    chatHistoryRef.current = [];
    setError('');
  }, []);

  if (!apiKey) {
    return <ApiKeyModal onSubmit={setApiKey} />;
  }

  const hasMessages = messages.length > 0;

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <Header sessionCount={messages.length} />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar */}
        <Sidebar
          onSelectQuestion={handleSelectQuestion}
          onClear={handleClear}
          hasMessages={hasMessages}
        />

        {/* Main chat area */}
        <main style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Messages or Welcome */}
          <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
            {!hasMessages ? (
              <WelcomeScreen onSelectQuestion={handleSelectQuestion} />
            ) : (
              <div style={{
                flex: 1,
                padding: '1.25rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}>
                {messages.map(msg => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
                {error && (
                  <div style={{
                    background: 'rgba(255,56,96,0.08)',
                    border: '1px solid rgba(255,56,96,0.3)',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    color: 'var(--accent-red)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    display: 'flex', gap: '0.5rem', alignItems: 'flex-start',
                    animation: 'fadeSlideIn 0.3s ease',
                  }}>
                    <span>⚠</span>
                    <div>
                      <strong>Error:</strong> {error}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={() => sendMessage()}
            isLoading={isLoading}
            disabled={false}
          />
        </main>
      </div>
    </div>
  );
}
