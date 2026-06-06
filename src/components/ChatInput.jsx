import React, { useRef, useEffect } from 'react';

export default function ChatInput({ value, onChange, onSend, isLoading, disabled }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) onSend();
    }
  };

  return (
    <div style={{
      padding: '0.75rem 1rem',
      borderTop: '1px solid var(--border)',
      background: 'rgba(6,11,24,0.9)',
      backdropFilter: 'blur(10px)',
      flexShrink: 0,
    }}>
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'flex-end',
        background: 'var(--bg-input)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '0.6rem 0.75rem',
        transition: 'border-color 0.2s',
      }}
        onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
        onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        {/* Circuit prompt icon */}
        <div style={{
          flexShrink: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          color: 'var(--accent-cyan)',
          opacity: 0.7,
          paddingBottom: '2px',
        }}>
          〉
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your circuit problem... (e.g. 'Design a 555 timer running at 2kHz')"
          disabled={disabled || isLoading}
          rows={1}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            resize: 'none',
            minHeight: 24,
            maxHeight: 160,
            overflowY: 'auto',
          }}
        />

        {/* Send button */}
        <button
          onClick={onSend}
          disabled={isLoading || !value.trim() || disabled}
          style={{
            flexShrink: 0,
            width: 36, height: 36,
            borderRadius: '8px',
            background: isLoading || !value.trim()
              ? 'rgba(0,245,255,0.05)'
              : 'linear-gradient(135deg, rgba(0,245,255,0.25), rgba(0,245,255,0.1))',
            border: `1px solid ${isLoading || !value.trim() ? 'var(--border-subtle)' : 'var(--border)'}`,
            cursor: isLoading || !value.trim() ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
            color: isLoading || !value.trim() ? 'var(--text-muted)' : 'var(--accent-cyan)',
            fontSize: '1rem',
          }}
          onMouseEnter={e => {
            if (!isLoading && value.trim()) {
              e.currentTarget.style.boxShadow = 'var(--glow-cyan)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isLoading ? (
            <div style={{
              width: 14, height: 14,
              border: '2px solid var(--accent-cyan)',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
          ) : '↑'}
        </button>
      </div>

      {/* Hint */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        color: 'var(--text-muted)',
        textAlign: 'center',
        marginTop: '0.4rem',
        letterSpacing: '0.06em',
      }}>
        ENTER to send · SHIFT+ENTER for new line
      </div>
    </div>
  );
}
