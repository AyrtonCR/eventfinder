import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <div style={{ width: '2rem' }} />
        </div>
        
        <motion.h1
          className="header__title"
          whileHover={{ scale: 1.07 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          Christchurch Live Music
        </motion.h1>
        
        <div className="header__right">
          <nav className={`header__nav ${open ? 'is-open' : ''}`}>
            <a href="#events" className="header__nav-link">
              <motion.span
                whileHover={{
                  scale: 1.13,
                  rotate: [0, 6, -6, 3, -3, 0],
                  transition: {
                    scale: { type: 'spring', stiffness: 300, damping: 15, duration: 0.4 },
                    rotate: { type: 'tween', duration: 0.4 }
                  }
                }}
                style={{ display: 'inline-block' }}
              >
                Events
              </motion.span>
            </a>
            <a href="#venues" className="header__nav-link">
              <motion.span
                whileHover={{
                  scale: 1.13,
                  rotate: [0, 6, -6, 3, -3, 0],
                  transition: {
                    scale: { type: 'spring', stiffness: 300, damping: 15, duration: 0.4 },
                    rotate: { type: 'tween', duration: 0.4 }
                  }
                }}
                style={{ display: 'inline-block' }}
              >
                Venues
              </motion.span>
            </a>
            <a href="#about" className="header__nav-link">
              <motion.span
                whileHover={{
                  scale: 1.13,
                  rotate: [0, 6, -6, 3, -3, 0],
                  transition: {
                    scale: { type: 'spring', stiffness: 300, damping: 15, duration: 0.4 },
                    rotate: { type: 'tween', duration: 0.4 }
                  }
                }}
                style={{ display: 'inline-block' }}
              >
                About
              </motion.span>
            </a>
          </nav>

          <button
            className="header__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
