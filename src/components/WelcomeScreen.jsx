import React from 'react';
import { EXAMPLE_QUESTIONS } from '../utils/api.js';

export default function WelcomeScreen({ onSelectQuestion }) {
  const featured = EXAMPLE_QUESTIONS.slice(0, 3);

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem', gap: '2rem',
      overflow: 'auto',
    }}>
      {/* Main hero */}
      <div style={{ textAlign: 'center', maxWidth: 560 }}>
        {/* Big icon */}
        <div style={{
          width: 80, height: 80, margin: '0 auto 1.5rem',
          position: 'relative',
        }}>
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="38" stroke="rgba(0,245,255,0.2)" strokeWidth="1"/>
            <circle cx="40" cy="40" r="30" stroke="rgba(0,245,255,0.1)" strokeWidth="1" strokeDasharray="4 4"/>
            <path d="M10 40 H24 L28 28 L36 52 L44 28 L52 52 L56 40 H70"
              stroke="#00f5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="10" cy="40" r="3" fill="rgba(0,245,255,0.5)"/>
            <circle cx="70" cy="40" r="3" fill="rgba(0,245,255,0.5)"/>
            <circle cx="40" cy="40" r="4" fill="rgba(0,245,255,0.8)"
              style={{ filter: 'drop-shadow(0 0 6px #00f5ff)' }}/>
          </svg>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.2rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          lineHeight: 1.1,
          marginBottom: '0.75rem',
        }}>
          <span style={{ color: 'var(--accent-cyan)' }}>Circuit</span>
          <span style={{ color: 'var(--text-primary)' }}> Design</span>
          <br />
          <span style={{
            color: 'var(--accent-amber)',
            fontSize: '1.4rem',
            letterSpacing: '0.15em',
          }}>
            Q&A TUTOR
          </span>
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          lineHeight: 1.7,
          maxWidth: 420,
          margin: '0 auto',
        }}>
          Ask any electronics question — get step-by-step theory, calculations with proper formulas, and expert design suggestions.
        </p>

        {/* Feature pills */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
          justifyContent: 'center', marginTop: '1.25rem',
        }}>
          {[
            { icon: '📐', text: 'Circuit Analysis' },
            { icon: '∑', text: 'Math Derivations' },
            { icon: '🔧', text: 'Design Tips' },
            { icon: '⚠️', text: 'Pitfall Warnings' },
            { icon: '📊', text: 'Component Tables' },
          ].map(f => (
            <div key={f.text} style={{
              background: 'var(--accent-cyan-dim)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '4px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
              display: 'flex', gap: '0.35rem', alignItems: 'center',
            }}>
              <span>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured questions */}
      <div style={{ width: '100%', maxWidth: 620 }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.15em',
          textAlign: 'center',
          marginBottom: '0.75rem',
        }}>
          ── TRY THESE EXAMPLES ──
        </div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {featured.map((q, i) => (
            <button
              key={i}
              onClick={() => onSelectQuestion(q.question)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '0.85rem 1.1rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'left',
                lineHeight: 1.5,
                transition: 'all 0.2s',
                display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--bg-panel)';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--bg-card)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{q.icon}</span>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem', fontWeight: 600,
                  color: 'var(--accent-cyan)',
                  letterSpacing: '0.04em',
                  marginBottom: '0.2rem',
                }}>
                  {q.label}
                </div>
                <div style={{ fontSize: '0.83rem', lineHeight: 1.4 }}>
                  {q.question.slice(0, 100)}…
                </div>
              </div>
              <div style={{
                marginLeft: 'auto', flexShrink: 0,
                color: 'var(--text-muted)', fontSize: '1rem',
                alignSelf: 'center',
              }}>
                →
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
