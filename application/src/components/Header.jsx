import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Header.css';

import { useAuth0 } from '@auth0/auth0-react';


export default function Header({ userProfile = null }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

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
        {/* Remove the unstyled login/logout buttons from here */}
        <div className="header__right">
          <nav className={`header__nav ${open ? 'is-open' : ''}`}>
            {isAuthenticated && (
              <button
                className="header__nav-link"
                style={{ background: 'none', border: 'none', color: '#eee', font: 'inherit', cursor: 'pointer', padding: 0 }}
                onClick={() => navigate('/profile')}
              >
                <motion.span
                  whileHover={{
                    scale: 1.07,
                    transition: {
                      type: 'spring', stiffness: 300, damping: 18, duration: 0.3
                    }
                  }}
                  style={{ display: 'inline-block' }}
                >
                  My Profile
                </motion.span>
              </button>
            )}
            <button
              className="header__nav-link"
              style={{ background: 'none', border: 'none', color: '#eee', font: 'inherit', cursor: 'pointer', padding: 0 }}
              onClick={() => navigate('/about')}
            >
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
            </button>
            {/* Add Auth0 login/logout buttons styled as nav links */}
            {!isAuthenticated ? (
              <button
                className="header__nav-link"
                style={{ background: 'none', border: 'none', color: '#eee', font: 'inherit', cursor: 'pointer', padding: 0, marginLeft: '1.2rem' }}
                onClick={() => loginWithRedirect()}
              >
                <motion.span
                  whileHover={{ scale: 1.07 }}
                  style={{ display: 'inline-block' }}
                >
                  Log In / Sign Up
                </motion.span>
              </button>
            ) : (
              <button
                className="header__nav-link"
                style={{ background: 'none', border: 'none', color: '#eee', font: 'inherit', cursor: 'pointer', padding: 0, marginLeft: '1.2rem' }}
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              >
                <motion.span
                  whileHover={{ scale: 1.07 }}
                  style={{ display: 'inline-block' }}
                >
                  Log Out
                </motion.span>
              </button>
            )}
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
