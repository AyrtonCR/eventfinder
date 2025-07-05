import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header({ userProfile = null }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Function to get genre-specific emoji
  const getGenreEmoji = (genres) => {
    if (!genres) return '🎵';
    
    const genreEmojis = {
      'rock': '🤘',
      'pop': '🎤',
      'electronic': '🎧',
      'hip hop': '🎤',
      'jazz': '🎷',
      'blues': '🎸',
      'country': '🤠',
      'folk': '🪕',
      'r&b': '🎤',
      'soul': '🎤',
      'reggae': '🌴',
      'punk': '💀',
      'metal': '🤘',
      'indie': '🎸',
      'alternative': '🎸',
      'classical': '🎻',
      'funk': '🎺',
      'disco': '🕺',
      'ambient': '🌙'
    };

    const genreList = genres.toLowerCase().split(',').map(g => g.trim());
    
    for (const genre of genreList) {
      if (genreEmojis[genre]) {
        return genreEmojis[genre];
      }
    }
    
    return '🎵'; // Default music note
  };

  const profileEmoji = userProfile ? getGenreEmoji(userProfile.musicGenres) : '🎵';

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          {userProfile && (
            <motion.button
              className="header__profile-emoji"
              onClick={handleProfileClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              <span className="emoji">{profileEmoji}</span>
            </motion.button>
          )}
        </div>
        
        <motion.h1
          className="header__title"
          onClick={handleTitleClick}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          style={{ cursor: 'pointer' }}
        >
          Christchurch Live Music
        </motion.h1>
        
        <div className="header__right">
          <nav className={`header__nav ${open ? 'is-open' : ''}`}>
            <a href="/auth" className="header__nav-link" target="_blank" rel="noopener noreferrer">
              <motion.span
                whileHover={{
                  scale: 1.07,
                  transition: {
                    type: 'spring', stiffness: 300, damping: 18, duration: 0.3
                  }
                }}
                style={{ display: 'inline-block' }}
              >
                Log In
              </motion.span>
            </a>
            <a href="/about" className="header__nav-link" target="_blank" rel="noopener noreferrer">
              <motion.span
                whileHover={{
                  scale: 1.07,
                  transition: {
                    type: 'spring', stiffness: 300, damping: 18, duration: 0.3
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
