import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMapPin, FiMail, FiPhone, FiInstagram, FiFacebook, FiTwitter, FiUsers, FiWifi, FiMusic } from 'react-icons/fi';
import './VenueForm.css';

const AMENITIES = [
  'Parking', 'WiFi', 'Sound System', 'Lighting', 'Stage', 'Bar', 'Kitchen', 
  'Accessibility', 'Air Conditioning', 'Outdoor Space', 'Dressing Rooms', 
  'Green Room', 'Merchandise Area', 'Security', 'First Aid'
];

const VENUE_TYPES = [
  'Bar/Pub', 'Restaurant', 'Concert Hall', 'Theater', 'Club', 'Cafe', 
  'Outdoor Venue', 'Community Center', 'Gallery', 'Warehouse', 'Studio', 
  'Hotel', 'University', 'Church', 'Park'
];

export default function VenueForm({ onSave, onClose, existingVenue = null }) {
  const [formData, setFormData] = useState({
    name: existingVenue?.name || '',
    description: existingVenue?.description || '',
    type: existingVenue?.type || '',
    address: existingVenue?.address || '',
    capacity: existingVenue?.capacity || '',
    amenities: existingVenue?.amenities || [],
    logoUrl: existingVenue?.logoUrl || '',
    contact: {
      email: existingVenue?.contact?.email || '',
      phone: existingVenue?.contact?.phone || '',
      website: existingVenue?.contact?.website || ''
    },
    socialMedia: {
      instagram: existingVenue?.socialMedia?.instagram || '',
      facebook: existingVenue?.socialMedia?.facebook || '',
      twitter: existingVenue?.socialMedia?.twitter || ''
    }
  });

  const [errors, setErrors] = useState({});
  const [showAmenitiesDropdown, setShowAmenitiesDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Venue name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.type) {
      newErrors.type = 'Venue type is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.capacity.trim()) {
      newErrors.capacity = 'Capacity is required';
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

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSelectAllAmenities = () => {
    setFormData(prev => ({
      ...prev,
      amenities: AMENITIES
    }));
  };

  const handleClearAllAmenities = () => {
    setFormData(prev => ({
      ...prev,
      amenities: []
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowAmenitiesDropdown(false);
        setShowTypeDropdown(false);
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
        className="venue-form-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="venue-form-modal"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>

          <div className="venue-form-header">
            <h2><FiMapPin /> {existingVenue ? 'Edit Venue Profile' : 'Add New Venue'}</h2>
            <p>Tell us about your venue</p>
          </div>

          <form onSubmit={handleSubmit} className="venue-form">
            <div className="form-section">
              <label htmlFor="venueName">Venue Name *</label>
              <input
                type="text"
                id="venueName"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter venue name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-section">
              <label>Venue Logo</label>
              <div className="logo-upload-container">
                {formData.logoUrl ? (
                  <div className="logo-preview">
                    <img src={formData.logoUrl} alt="Venue logo" />
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
                      id="venueLogoUpload"
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
                    <label htmlFor="venueLogoUpload" className="upload-label">
                      <FiMapPin />
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
                placeholder="Describe your venue, atmosphere, and what makes it unique..."
                rows={4}
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-section">
              <label>Venue Type *</label>
              <div className="dropdown-container">
                <button
                  type="button"
                  className="dropdown-trigger"
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                >
                  {formData.type || 'Select venue type'}
                </button>
                
                <AnimatePresence>
                  {showTypeDropdown && (
                    <motion.div
                      className="dropdown-menu"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {VENUE_TYPES.map(type => (
                        <button
                          key={type}
                          type="button"
                          className="dropdown-option"
                          onClick={() => {
                            handleInputChange('type', type);
                            setShowTypeDropdown(false);
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {errors.type && <span className="error-message">{errors.type}</span>}
            </div>

            <div className="form-section">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Full venue address"
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-section">
              <label htmlFor="capacity">Capacity *</label>
              <input
                type="text"
                id="capacity"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
                placeholder="e.g., 150 people, 200 standing"
                className={errors.capacity ? 'error' : ''}
              />
              {errors.capacity && <span className="error-message">{errors.capacity}</span>}
            </div>

            <div className="form-section">
              <label>Amenities</label>
              <div className="dropdown-container">
                <button
                  type="button"
                  className="dropdown-trigger"
                  onClick={() => setShowAmenitiesDropdown(!showAmenitiesDropdown)}
                >
                  {formData.amenities.length > 0 
                    ? `${formData.amenities.length} selected` 
                    : 'Select amenities'
                  }
                </button>
                
                <AnimatePresence>
                  {showAmenitiesDropdown && (
                    <motion.div
                      className="dropdown-menu"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="dropdown-actions">
                        <button type="button" onClick={handleSelectAllAmenities}>
                          Select All
                        </button>
                        <button type="button" onClick={handleClearAllAmenities}>
                          Clear All
                        </button>
                      </div>
                      <div className="dropdown-options">
                        {AMENITIES.map(amenity => (
                          <label key={amenity} className="checkbox-option">
                            <input
                              type="checkbox"
                              checked={formData.amenities.includes(amenity)}
                              onChange={() => handleAmenityToggle(amenity)}
                            />
                            <span>{amenity}</span>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
                    type="url"
                    placeholder="Website URL"
                    value={formData.contact.website}
                    onChange={(e) => handleContactChange('website', e.target.value)}
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
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {existingVenue ? 'Update Venue' : 'Save Venue'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 