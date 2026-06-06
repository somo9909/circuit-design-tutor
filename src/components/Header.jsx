import React from 'react';

export default function Header({ sessionCount }) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      height: '56px',
      borderBottom: '1px solid var(--border)',
      background: 'rgba(6, 11, 24, 0.95)',
      backdropFilter: 'blur(10px)',
      flexShrink: 0,
      position: 'relative',
      zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ position: 'relative', width: 36, height: 36 }}>
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="6" fill="rgba(0,245,255,0.08)" stroke="rgba(0,245,255,0.3)" strokeWidth="1"/>
            <path d="M4 18 H10 L13 10 L18 26 L23 10 L26 18 H32"
              stroke="#00f5ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="4" cy="18" r="2" fill="#00f5ff" opacity="0.7"/>
            <circle cx="32" cy="18" r="2" fill="#00f5ff" opacity="0.7"/>
          </svg>
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: 'var(--accent-cyan)',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}>
            Circuit<span style={{ color: 'var(--text-primary)' }}>Tutor</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.12em',
            lineHeight: 1,
            marginTop: '2px',
          }}>
            AI-POWERED ELECTRONICS TUTOR
          </div>
        </div>
      </div>

      {/* Center — waveform decoration */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', opacity: 0.4 }}>
        {[3, 6, 4, 8, 5, 10, 4, 7, 3, 9, 5, 6, 4].map((h, i) => (
          <div key={i} style={{
            width: 2,
            height: h * 2,
            background: 'var(--accent-cyan)',
            borderRadius: 1,
            animation: `pulse-glow ${0.8 + i * 0.1}s ease-in-out infinite alternate`,
          }} />
        ))}
      </div>

      {/* Right — stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--accent-green)',
            boxShadow: '0 0 6px var(--accent-green)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }} />
          <span>ONLINE</span>
        </div>
        {sessionCount > 0 && (
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--accent-cyan)',
            background: 'var(--accent-cyan-dim)',
            border: '1px solid var(--border)',
            padding: '2px 10px',
            borderRadius: '3px',
          }}>
            {sessionCount} MSG{sessionCount !== 1 ? 'S' : ''}
          </div>
        )}
      </div>
    </header>
  );
}
