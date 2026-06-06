import React, { useState } from 'react';
import { EXAMPLE_QUESTIONS } from '../utils/api.js';

const TOPICS = [
  { label: 'DC Circuits', color: 'cyan' },
  { label: 'AC Analysis', color: 'amber' },
  { label: 'Op-Amps', color: 'green' },
  { label: 'BJT/MOSFET', color: 'cyan' },
  { label: 'Filters', color: 'amber' },
  { label: 'Power Electronics', color: 'green' },
  { label: 'Digital Logic', color: 'cyan' },
  { label: 'Oscillators', color: 'amber' },
  { label: 'RF Circuits', color: 'green' },
  { label: 'PCB Design', color: 'cyan' },
];

const colorMap = {
  cyan: { bg: 'var(--accent-cyan-dim)', border: 'var(--border)', text: 'var(--accent-cyan)' },
  amber: { bg: 'var(--accent-amber-dim)', border: 'rgba(255,179,0,0.2)', text: 'var(--accent-amber)' },
  green: { bg: 'var(--accent-green-dim)', border: 'rgba(0,255,136,0.2)', text: 'var(--accent-green)' },
};

export default function Sidebar({ onSelectQuestion, onClear, hasMessages }) {
  const [activeTopic, setActiveTopic] = useState(null);

  return (
    <aside style={{
      width: 260,
      flexShrink: 0,
      borderRight: '1px solid var(--border-subtle)',
      background: 'rgba(12,20,40,0.6)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Topics */}
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.12em',
          marginBottom: '0.6rem',
        }}>
          TOPIC FILTERS
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {TOPICS.map(topic => {
            const c = colorMap[topic.color];
            const active = activeTopic === topic.label;
            return (
              <button
                key={topic.label}
                onClick={() => setActiveTopic(active ? null : topic.label)}
                style={{
                  background: active ? c.bg : 'transparent',
                  border: `1px solid ${active ? c.border : 'var(--border-subtle)'}`,
                  borderRadius: '4px',
                  padding: '2px 8px',
                  color: active ? c.text : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'all 0.15s',
                }}
              >
                {topic.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Examples */}
      <div style={{ flex: 1, overflow: 'auto', padding: '1rem' }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.12em',
          marginBottom: '0.6rem',
        }}>
          QUICK EXAMPLES
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {EXAMPLE_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => onSelectQuestion(q.question)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '0.65rem 0.75rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                textAlign: 'left',
                lineHeight: 1.4,
                transition: 'all 0.15s',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'flex-start',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--accent-cyan-dim)';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <span style={{ flexShrink: 0 }}>{q.icon}</span>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--accent-cyan)',
                  letterSpacing: '0.05em',
                  marginBottom: '0.2rem',
                }}>
                  {q.label}
                </div>
                {q.question.slice(0, 70)}…
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      {hasMessages && (
        <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={onClear}
            style={{
              width: '100%',
              background: 'transparent',
              border: '1px solid rgba(255,56,96,0.3)',
              borderRadius: '6px',
              padding: '0.5rem',
              color: 'rgba(255,56,96,0.7)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              cursor: 'pointer',
              letterSpacing: '0.1em',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(255,56,96,0.1)';
              e.target.style.color = 'var(--accent-red)';
              e.target.style.borderColor = 'var(--accent-red)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'rgba(255,56,96,0.7)';
              e.target.style.borderColor = 'rgba(255,56,96,0.3)';
            }}
          >
            ✕ CLEAR SESSION
          </button>
        </div>
      )}

      {/* Decorative bottom */}
      <div style={{
        padding: '0.75rem 1rem',
        borderTop: '1px solid var(--border-subtle)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: 'var(--text-muted)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      }}>
        <div>⚡ Powered by Groq + Llama 3.3</div>
        <div style={{ color: 'rgba(0,245,255,0.3)' }}>
          {new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })} · IST
        </div>
      </div>
    </aside>
  );
}
