import React, { useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '5px', padding: '4px 0', alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: '50%',
          background: 'var(--accent-cyan)',
          animation: `pulse-glow 1.2s ease-in-out infinite`,
          animationDelay: `${i * 0.2}s`,
          opacity: 0.7,
        }} />
      ))}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        marginLeft: '4px',
        letterSpacing: '0.05em',
      }}>
        analyzing circuit...
      </span>
    </div>
  );
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const isStreaming = message.streaming;

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text).catch(() => {});
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: isUser ? 'row-reverse' : 'row',
      gap: '0.75rem',
      alignItems: 'flex-start',
      animation: 'fadeSlideIn 0.3s ease',
      maxWidth: '100%',
    }}>
      {/* Avatar */}
      <div style={{
        width: 36, height: 36, flexShrink: 0,
        borderRadius: isUser ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
        background: isUser ? 'var(--accent-cyan-dim)' : 'rgba(255,179,0,0.1)',
        border: `1px solid ${isUser ? 'var(--border)' : 'rgba(255,179,0,0.25)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1rem', flexShrink: 0,
        boxShadow: isUser ? 'none' : '0 0 12px rgba(255,179,0,0.15)',
      }}>
        {isUser ? '👤' : '⚡'}
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: 'calc(100% - 120px)',
        minWidth: 80,
      }}>
        {/* Label */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: isUser ? 'var(--accent-cyan)' : 'var(--accent-amber)',
          letterSpacing: '0.12em',
          marginBottom: '0.3rem',
          textAlign: isUser ? 'right' : 'left',
          opacity: 0.8,
        }}>
          {isUser ? 'YOU' : 'CIRCUIT TUTOR AI'}
          {!isUser && isStreaming && (
            <span style={{ marginLeft: '0.5rem', animation: 'blink 1s infinite' }}>▊</span>
          )}
        </div>

        {/* Content */}
        <div style={{
          background: isUser
            ? 'linear-gradient(135deg, rgba(0,245,255,0.1), rgba(0,245,255,0.05))'
            : 'var(--bg-card)',
          border: `1px solid ${isUser ? 'var(--border)' : 'rgba(255,179,0,0.2)'}`,
          borderRadius: isUser ? '12px 2px 12px 12px' : '2px 12px 12px 12px',
          padding: '0.9rem 1.1rem',
          position: 'relative',
          boxShadow: isUser ? 'none' : '0 4px 20px rgba(0,0,0,0.3)',
        }}>
          {isStreaming && !message.content ? (
            <TypingIndicator />
          ) : isUser ? (
            <p style={{
              color: 'var(--text-primary)',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {message.content}
            </p>
          ) : (
            <div className="md-content">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const codeText = String(children).replace(/\n$/, '');
                    if (!inline && match) {
                      return (
                        <div style={{ position: 'relative' }}>
                          <div style={{
                            position: 'absolute', top: 6, right: 8,
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.05em',
                          }}>
                            {match[1].toUpperCase()}
                          </div>
                          <pre style={{
                            background: '#040a14',
                            border: '1px solid var(--border)',
                            borderRadius: 6,
                            padding: '0.9rem',
                            paddingTop: '1.5rem',
                            overflowX: 'auto',
                            margin: '0.5rem 0',
                          }}>
                            <code style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.83rem',
                              color: 'var(--accent-green)',
                            }} {...props}>
                              {codeText}
                            </code>
                          </pre>
                          <button
                            onClick={() => copyToClipboard(codeText)}
                            style={{
                              position: 'absolute', bottom: 14, right: 8,
                              background: 'var(--accent-cyan-dim)',
                              border: '1px solid var(--border)',
                              borderRadius: 3,
                              padding: '2px 8px',
                              color: 'var(--text-secondary)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.65rem',
                              cursor: 'pointer',
                              letterSpacing: '0.05em',
                            }}
                          >
                            COPY
                          </button>
                        </div>
                      );
                    }
                    return (
                      <code className={className} {...props}>{children}</code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
              {isStreaming && (
                <span style={{
                  display: 'inline-block',
                  width: 8, height: 16,
                  background: 'var(--accent-cyan)',
                  marginLeft: 2,
                  verticalAlign: 'text-bottom',
                  animation: 'blink 0.8s infinite',
                  opacity: 0.8,
                }} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
