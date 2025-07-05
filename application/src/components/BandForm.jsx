import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMusic, FiMapPin, FiMail, FiPhone, FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';
import './BandForm.css';

const GENRES = [
  'Rock', 'Pop', 'Electronic', 'Hip Hop', 'Jazz', 'Blues', 'Country', 'Folk', 
  'R&B', 'Soul', 'Reggae', 'Punk', 'Metal', 'Indie', 'Alternative', 'Classical', 
  'Funk', 'Disco', 'Ambient'
];

const VIBES = [
  'High Energy', 'Mellow', 'Upbeat', 'Chill', 'Intense', 'Smooth', 'Energetic', 
  'Relaxed', 'Dynamic', 'Groovy', 'Atmospheric', 'Powerful', 'Laid-back', 'Vibrant'
];

export default function BandForm({ onSave, onClose, existingBand = null }) {
  const [formData, setFormData] = useState({
    name: existingBand?.name || '',
    description: existingBand?.description || '',
    genres: existingBand?.genres || [],
    vibe: existingBand?.vibe || '',
    logoUrl: existingBand?.logoUrl || '',
    contact: {
      email: existingBand?.contact?.email || '',
      phone: existingBand?.contact?.phone || '',
      location: existingBand?.contact?.location || ''
    },
    socialMedia: {
      instagram: existingBand?.socialMedia?.instagram || '',
      facebook: existingBand?.socialMedia?.facebook || '',
      twitter: existingBand?.socialMedia?.twitter || '',
      youtube: existingBand?.socialMedia?.youtube || ''
    }
  });

  const [errors, setErrors] = useState({});
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showVibeDropdown, setShowVibeDropdown] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Band name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.genres.length === 0) {
      newErrors.genres = 'At least one genre is required';
    }

    if (!formData.vibe) {
      newErrors.vibe = 'Vibe is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleGenreToggle = (genre) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleSelectAllGenres = () => {
    setFormData(prev => ({
      ...prev,
      genres: GENRES
    }));
  };

  const handleClearAllGenres = () => {
    setFormData(prev => ({
      ...prev,
      genres: []
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const handleGenreDropdownToggle = () => {
    setShowGenreDropdown(!showGenreDropdown);
    setShowVibeDropdown(false); // Close other dropdown
  };

  const handleVibeDropdownToggle = () => {
    setShowVibeDropdown(!showVibeDropdown);
    setShowGenreDropdown(false); // Close other dropdown
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowGenreDropdown(false);
        setShowVibeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="band-form-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="band-form-modal"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>

          <div className="band-form-header">
            <h2><FiMusic /> {existingBand ? 'Edit Band Profile' : 'Add New Band'}</h2>
            <p>Tell us about your band</p>
          </div>

          <form onSubmit={handleSubmit} className="band-form">
            <div className="form-section">
              <label htmlFor="bandName">Band Name *</label>
              <input
                type="text"
                id="bandName"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter band name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-section">
              <label>Band Logo</label>
              <div className="logo-upload-container">
                {formData.logoUrl ? (
                  <div className="logo-preview">
                    <img src={formData.logoUrl} alt="Band logo" />
                    <button
                      type="button"
                      className="remove-logo-btn"
                      onClick={() => handleInputChange('logoUrl', '')}
                    >
                      <FiX />
                    </button>
                  </div>
                ) : (
                  <div className="logo-upload-area">
                    <input
                      type="file"
                      id="logoUpload"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => handleInputChange('logoUrl', e.target.result);
                          reader.readAsDataURL(file);
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="logoUpload" className="upload-label">
                      <FiMusic />
                      <span>Click to upload logo</span>
                      <small>PNG, JPG up to 5MB</small>
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="form-section">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your band's music, style, and what makes you unique..."
                rows={4}
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-section">
              <label>Genres *</label>
              <div className="dropdown-container">
                <button
                  type="button"
                  className="dropdown-trigger"
                  onClick={handleGenreDropdownToggle}
                >
                  {formData.genres.length > 0 
                    ? `${formData.genres.length} selected` 
                    : 'Select genres'
                  }
                </button>
                
                <AnimatePresence>
                  {showGenreDropdown && (
                    <motion.div
                      className="dropdown-menu"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="dropdown-actions">
                        <button type="button" onClick={handleSelectAllGenres}>
                          Select All
                        </button>
                        <button type="button" onClick={handleClearAllGenres}>
                          Clear All
                        </button>
                      </div>
                      <div className="dropdown-options">
                        {GENRES.map(genre => (
                          <label key={genre} className="checkbox-option">
                            <input
                              type="checkbox"
                              checked={formData.genres.includes(genre)}
                              onChange={() => handleGenreToggle(genre)}
                            />
                            <span>{genre}</span>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {errors.genres && <span className="error-message">{errors.genres}</span>}
            </div>

            <div className="form-section">
              <label>Vibe *</label>
              <div className="dropdown-container">
                <button
                  type="button"
                  className="dropdown-trigger"
                  onClick={handleVibeDropdownToggle}
                >
                  {formData.vibe || 'Select vibe'}
                </button>
                
                <AnimatePresence>
                  {showVibeDropdown && (
                    <motion.div
                      className="dropdown-menu"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {VIBES.map(vibe => (
                        <button
                          key={vibe}
                          type="button"
                          className="dropdown-option"
                          onClick={() => {
                            handleInputChange('vibe', vibe);
                            setShowVibeDropdown(false);
                          }}
                        >
                          {vibe}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {errors.vibe && <span className="error-message">{errors.vibe}</span>}
            </div>

            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="contact-fields">
                <div className="input-group">
                  <FiMail />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <FiPhone />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.contact.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <FiMapPin />
                  <input
                    type="text"
                    placeholder="Location"
                    value={formData.contact.location}
                    onChange={(e) => handleContactChange('location', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Social Media Links</h3>
              <div className="social-fields">
                <div className="input-group">
                  <FiInstagram />
                  <input
                    type="url"
                    placeholder="Instagram URL"
                    value={formData.socialMedia.instagram}
                    onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <FiFacebook />
                  <input
                    type="url"
                    placeholder="Facebook URL"
                    value={formData.socialMedia.facebook}
                    onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <FiTwitter />
                  <input
                    type="url"
                    placeholder="Twitter URL"
                    value={formData.socialMedia.twitter}
                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <FiYoutube />
                  <input
                    type="url"
                    placeholder="YouTube URL"
                    value={formData.socialMedia.youtube}
                    onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {existingBand ? 'Update Band' : 'Save Band'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 