import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <div style={{ width: '2rem' }} />
        </div>
        
        <h1 className="header__title">Christchurch Live Music</h1>
        
        <div className="header__right">
          <nav className={`header__nav ${open ? 'is-open' : ''}`}>
            <a href="#events">Events</a>
            <a href="#venues">Venues</a>
            <a href="#about">About</a>
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
