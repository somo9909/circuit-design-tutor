import React, { useState } from 'react';

export default function ApiKeyModal({ onSubmit }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const trimmed = key.trim();
    if (trimmed.length < 20) {
      setError('Please enter a valid Gemini API key');
      return;
    }
    setError('');
    onSubmit(trimmed);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(6,11,24,0.97)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,245,255,0.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,245,255,0.04) 40px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        width: '100%', maxWidth: 480,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '2.5rem',
        boxShadow: 'var(--glow-cyan), 0 40px 80px rgba(0,0,0,0.6)',
        animation: 'fadeSlideIn 0.4s ease',
      }}>
        {/* Corner accents */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
          <div key={pos} style={{
            position: 'absolute',
            width: 14, height: 14,
            borderColor: 'var(--accent-cyan)',
            borderStyle: 'solid',
            borderWidth: pos.includes('top') ? '2px 0 0 2px' : '0 2px 2px 0',
            ...(pos.includes('top') ? { top: 8 } : { bottom: 8 }),
            ...(pos.includes('left') ? { left: 8 } : { right: 8 }),
            ...(pos.includes('right') && !pos.includes('top-left') ? { borderWidth: pos === 'top-right' ? '2px 2px 0 0' : '0 2px 2px 0' } : {}),
          }} />
        ))}

        {/* Icon */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: 64, height: 64, margin: '0 auto 1rem',
            background: 'var(--accent-cyan-dim)',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: 'var(--glow-cyan)',
          }}>
            🔐
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem', fontWeight: 700,
            letterSpacing: '0.08em',
            color: 'var(--accent-cyan)',
            marginBottom: '0.4rem',
          }}>
            AUTHENTICATION REQUIRED
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
            Enter your Anthropic API key to initialize the circuit tutor engine
          </p>
        </div>

        {/* Input */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            display: 'block',
            marginBottom: '0.5rem',
          }}>
            API KEY
          </label>
          <input
            type="password"
            value={key}
            onChange={e => { setKey(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="gsk_..."
            autoFocus
            style={{
              width: '100%',
              background: 'var(--bg-input)',
              border: `1px solid ${error ? 'var(--accent-red)' : 'var(--border)'}`,
              borderRadius: '6px',
              padding: '0.75rem 1rem',
              color: 'var(--accent-cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent-cyan)'}
            onBlur={e => e.target.style.borderColor = error ? 'var(--accent-red)' : 'var(--border)'}
          />
          {error && (
            <div style={{
              color: 'var(--accent-red)', fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)', marginTop: '0.4rem',
            }}>
              ⚠ {error}
            </div>
          )}
        </div>

        {/* Note */}
        <div style={{
          background: 'var(--accent-amber-dim)',
          border: '1px solid rgba(255,179,0,0.2)',
          borderRadius: '6px',
          padding: '0.6rem 0.9rem',
          marginBottom: '1.25rem',
          fontSize: '0.78rem',
          color: 'var(--accent-amber)',
          fontFamily: 'var(--font-mono)',
          display: 'flex', gap: '0.5rem',
        }}>
          <span>⚡</span>
          <span>Key stored in memory only — never persisted to disk or sent anywhere except Groq's API.</span>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(0,245,255,0.05))',
            border: '1px solid var(--accent-cyan)',
            borderRadius: '6px',
            padding: '0.85rem',
            color: 'var(--accent-cyan)',
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            cursor: 'pointer',
            transition: 'all 0.2s',
            textTransform: 'uppercase',
          }}
          onMouseEnter={e => {
            e.target.style.background = 'rgba(0,245,255,0.2)';
            e.target.style.boxShadow = 'var(--glow-cyan)';
          }}
          onMouseLeave={e => {
            e.target.style.background = 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(0,245,255,0.05))';
            e.target.style.boxShadow = 'none';
          }}
        >
          Initialize Tutor →
        </button>

        <p style={{
          textAlign: 'center', marginTop: '1rem',
          fontSize: '0.75rem', color: 'var(--text-muted)',
        }}>
          Get your free key at{' '}
          <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>
            console.groq.com
          </a>
        </p>
      </div>
    </div>
  );
}
