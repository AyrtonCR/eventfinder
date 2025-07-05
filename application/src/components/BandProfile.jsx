import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMusic, FiMapPin, FiMail, FiPhone, FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';
import './BandProfile.css';

export default function BandProfile({ band, onClose }) {
  if (!band) return null;

  const getGenreEmoji = (genres) => {
    if (!genres || genres.length === 0) return '🎵';
    
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

    const firstGenre = genres[0].toLowerCase();
    return genreEmojis[firstGenre] || '🎵';
  };

  return (
    <AnimatePresence>
      <motion.div
        className="band-profile-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="band-profile-modal"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>

          <div className="band-profile-header">
            <div className="band-emoji">
              {band.logoUrl ? (
                <img src={band.logoUrl} alt={`${band.name} logo`} className="band-logo" />
              ) : (
                <span>{getGenreEmoji(band.genres)}</span>
              )}
            </div>
            <div className="band-info">
              <h2>{band.name}</h2>
              <p className="band-tagline">{band.vibe} • {band.genres.join(', ')}</p>
            </div>
          </div>

          <div className="band-profile-content">
            <div className="band-section">
              <h3><FiMusic /> About</h3>
              <p className="band-description">{band.description}</p>
            </div>

            <div className="band-section">
              <h3>Genres</h3>
              <div className="genres-list">
                {band.genres.map((genre, index) => (
                  <span key={index} className="genre-tag">{genre}</span>
                ))}
              </div>
            </div>

            <div className="band-section">
              <h3>Vibe</h3>
              <div className="vibe-indicator">
                <span className="vibe-tag">{band.vibe}</span>
              </div>
            </div>

            {band.contact && (
              <div className="band-section">
                <h3>Contact</h3>
                <div className="contact-info">
                  {band.contact.email && (
                    <div className="contact-item">
                      <FiMail />
                      <span>{band.contact.email}</span>
                    </div>
                  )}
                  {band.contact.phone && (
                    <div className="contact-item">
                      <FiPhone />
                      <span>{band.contact.phone}</span>
                    </div>
                  )}
                  {band.contact.location && (
                    <div className="contact-item">
                      <FiMapPin />
                      <span>{band.contact.location}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {band.socialMedia && Object.keys(band.socialMedia).length > 0 && (
              <div className="band-section">
                <h3>Social Media</h3>
                <div className="social-links">
                  {band.socialMedia.instagram && (
                    <a href={band.socialMedia.instagram} className="social-link instagram" target="_blank" rel="noopener noreferrer">
                      <FiInstagram />
                      <span>Instagram</span>
                    </a>
                  )}
                  {band.socialMedia.facebook && (
                    <a href={band.socialMedia.facebook} className="social-link facebook" target="_blank" rel="noopener noreferrer">
                      <FiFacebook />
                      <span>Facebook</span>
                    </a>
                  )}
                  {band.socialMedia.twitter && (
                    <a href={band.socialMedia.twitter} className="social-link twitter" target="_blank" rel="noopener noreferrer">
                      <FiTwitter />
                      <span>Twitter</span>
                    </a>
                  )}
                  {band.socialMedia.youtube && (
                    <a href={band.socialMedia.youtube} className="social-link youtube" target="_blank" rel="noopener noreferrer">
                      <FiYoutube />
                      <span>YouTube</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 