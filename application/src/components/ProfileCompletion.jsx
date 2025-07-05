import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiUser, FiMapPin, FiMusic, FiUsers } from 'react-icons/fi';
import './ProfileCompletion.css';

export default function ProfileCompletion({ onComplete, onBack }) {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    address: '',
    about: '',
    bands: '',
    musicGenres: ''
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Profile data:', { ...formData, photoFile });
    onComplete && onComplete({ ...formData, photoFile });
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="profile-completion">
      <motion.div 
        className="profile-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="profile-header">
          <h1>Complete Your Profile</h1>
          <p>Tell us more about yourself and your music</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section">
            <h3><FiUser /> Personal Information</h3>
            
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Enter your age"
                min="13"
                max="120"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            </div>
          </div>

          <div className="form-section">
            <h3><FiUpload /> Profile Photo</h3>
            
            <div className="photo-upload">
              <div className="photo-preview" onClick={triggerFileUpload}>
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile preview" />
                ) : (
                  <div className="upload-placeholder">
                    <FiUpload size={24} />
                    <p>Click to upload photo</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
              <button 
                type="button" 
                className="upload-btn"
                onClick={triggerFileUpload}
              >
                Choose Photo
              </button>
            </div>
          </div>

          <div className="form-section">
            <h3><FiMusic /> Music & Bands</h3>
            
            <div className="form-group">
              <label htmlFor="musicGenres">Music Genres You Play</label>
              <textarea
                id="musicGenres"
                name="musicGenres"
                value={formData.musicGenres}
                onChange={handleInputChange}
                placeholder="e.g., Rock, Jazz, Electronic, Folk..."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bands">Bands You're In</label>
              <textarea
                id="bands"
                name="bands"
                value={formData.bands}
                onChange={handleInputChange}
                placeholder="List the bands you're currently in or have been part of..."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="about">About You & Your Music</label>
              <textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                placeholder="Tell us about your musical journey, influences, instruments you play..."
                rows="4"
              />
            </div>
          </div>

          <div className="form-actions">
            <motion.button
              type="button"
              className="btn-secondary"
              onClick={onBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back
            </motion.button>
            <motion.button
              type="submit"
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Complete Profile
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 