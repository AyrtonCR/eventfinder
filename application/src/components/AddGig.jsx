import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiMusic, FiUsers, FiPlus, FiX } from 'react-icons/fi';
import './AddGig.css';

export default function AddGig({ onSave, onCancel, existingBands = [], existingVenues = [] }) {
  const [formData, setFormData] = useState({
    band: '',
    venue: '',
    date: '',
    time: '',
    description: '',
    genre: '',
    ticketPrice: '',
    ticketLink: ''
  });

  const [bands, setBands] = useState(existingBands);
  const [venues, setVenues] = useState(existingVenues);
  const [showAddBand, setShowAddBand] = useState(false);
  const [showAddVenue, setShowAddVenue] = useState(false);
  const [newBand, setNewBand] = useState('');
  const [newVenue, setNewVenue] = useState('');
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      setShowFooter(scrollY + windowHeight >= docHeight - 40);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddBand = () => {
    if (newBand.trim() && !bands.includes(newBand.trim())) {
      setBands([...bands, newBand.trim()]);
      setFormData(prev => ({ ...prev, band: newBand.trim() }));
      setNewBand('');
      setShowAddBand(false);
    }
  };

  const handleAddVenue = () => {
    if (newVenue.trim() && !venues.includes(newVenue.trim())) {
      setVenues([...venues, newVenue.trim()]);
      setFormData(prev => ({ ...prev, venue: newVenue.trim() }));
      setNewVenue('');
      setShowAddVenue(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.band && formData.venue && formData.date && formData.time) {
      const gigData = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        bands: bands,
        venues: venues
      };
      onSave(gigData);
    }
  };

  return (
    <div className="add-gig-page">
      <motion.div 
        className="add-gig-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="add-gig-header">
          <h1>Add a New Gig</h1>
          <p>Share your upcoming performance with the Christchurch music community</p>
        </div>

        <form onSubmit={handleSubmit} className="add-gig-form">
          {/* Band Section */}
          <div className="form-section">
            <h3><FiMusic /> Band/Artist</h3>
            <div className="form-group">
              <label htmlFor="band">Band/Artist Name *</label>
              <div className="select-with-add">
                <select
                  id="band"
                  name="band"
                  value={formData.band}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a band or add new</option>
                  {bands.map((band, index) => (
                    <option key={index} value={band}>{band}</option>
                  ))}
                </select>
                <motion.button
                  type="button"
                  className="add-btn"
                  onClick={() => setShowAddBand(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPlus />
                </motion.button>
              </div>
            </div>

            {showAddBand && (
              <motion.div 
                className="add-new-item"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="add-input-group">
                  <input
                    type="text"
                    placeholder="Enter band name"
                    value={newBand}
                    onChange={(e) => setNewBand(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddBand()}
                  />
                  <motion.button
                    type="button"
                    className="confirm-btn"
                    onClick={handleAddBand}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add
                  </motion.button>
                  <motion.button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowAddBand(false);
                      setNewBand('');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiX />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Venue Section */}
          <div className="form-section">
            <h3><FiMapPin /> Venue</h3>
            <div className="form-group">
              <label htmlFor="venue">Venue *</label>
              <div className="select-with-add">
                <select
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a venue or add new</option>
                  {venues.map((venue, index) => (
                    <option key={index} value={venue}>{venue}</option>
                  ))}
                </select>
                <motion.button
                  type="button"
                  className="add-btn"
                  onClick={() => setShowAddVenue(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPlus />
                </motion.button>
              </div>
            </div>

            {showAddVenue && (
              <motion.div 
                className="add-new-item"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="add-input-group">
                  <input
                    type="text"
                    placeholder="Enter venue name"
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddVenue()}
                  />
                  <motion.button
                    type="button"
                    className="confirm-btn"
                    onClick={handleAddVenue}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add
                  </motion.button>
                  <motion.button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowAddVenue(false);
                      setNewVenue('');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiX />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Date & Time Section */}
          <div className="form-section">
            <h3><FiCalendar /> Date & Time</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Time *</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="form-section">
            <h3>Gig Details</h3>
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                placeholder="e.g., Rock, Jazz, Electronic"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell people about your gig..."
                rows="4"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="ticketPrice">Ticket Price</label>
                <input
                  type="text"
                  id="ticketPrice"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleInputChange}
                  placeholder="e.g., $15, Free"
                />
              </div>
              <div className="form-group">
                <label htmlFor="ticketLink">Ticket Link</label>
                <input
                  type="url"
                  id="ticketLink"
                  name="ticketLink"
                  value={formData.ticketLink}
                  onChange={handleInputChange}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <motion.button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add Gig
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 