import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollButton({ direction = 'down', onClick, label }) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2.5rem 0' }}>
      <motion.button
        whileHover={{ scale: 1.18 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: '2.7rem',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
          padding: 0,
          lineHeight: 1,
        }}
        aria-label={label || (direction === 'down' ? 'Scroll down' : 'Scroll up')}
      >
        {direction === 'down' ? (
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <line x1="18" y1="8" x2="18" y2="24" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <polyline points="12,18 18,24 24,18" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="8" y1="28" x2="28" y2="28" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <line x1="8" y1="8" x2="28" y2="8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <line x1="18" y1="28" x2="18" y2="12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <polyline points="12,18 18,12 24,18" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </motion.button>
    </div>
  );
} 