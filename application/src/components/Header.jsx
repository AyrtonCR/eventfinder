import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__inner">
        <div style={{ width: '2rem' }} />
        <h1 className="header__title">Christchurch Live Music</h1>

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
    </header>
  );
}
