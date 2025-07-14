import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiMusic, FiUsers, FiPlus, FiX, FiEye } from 'react-icons/fi';
import { useAuth0 } from '@auth0/auth0-react';
import BandForm from './BandForm';
import BandProfile from './BandProfile';
import VenueForm from './VenueForm';
import VenueProfile from './VenueProfile';
import './AddGig.css';

export default function AddGig({ onSave, onCancel, existingGig = null, existingBands = [], existingVenues = [], bandProfiles = {}, venueProfiles = {} }) {
  const { getAccessTokenSilently } = useAuth0();
  const [formData, setFormData] = useState({
    band: existingGig?.band || '',
    venue: existingGig?.venue || '',
    date: existingGig?.date ? new Date(existingGig.date).toISOString().split('T')[0] : '',
    time: existingGig?.time || '',
    description: existingGig?.description || '',
    genre: existingGig?.genre || '',
    ticketPrice: existingGig?.ticketPrice || '',
    ticketLink: existingGig?.ticketLink || ''
  });

  const [bands, setBands] = useState(() => {
    if (existingGig) {
      return [...new Set([...existingBands, existingGig.band])];
    }
    return existingBands;
  });
  const [localBandProfiles, setLocalBandProfiles] = useState(bandProfiles);
  const [venues, setVenues] = useState(() => {
    if (existingGig) {
      return [...new Set([...existingVenues, existingGig.venue])];
    }
    return existingVenues;
  });
  const [localVenueProfiles, setLocalVenueProfiles] = useState(venueProfiles);
  const [showBandForm, setShowBandForm] = useState(false);
  const [showBandProfile, setShowBandProfile] = useState(false);
  const [selectedBand, setSelectedBand] = useState(null);
  const [showVenueForm, setShowVenueForm] = useState(false);
  const [showVenueProfile, setShowVenueProfile] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showFooter, setShowFooter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when existingGig changes
  useEffect(() => {
    if (existingGig) {
      setFormData({
        band: existingGig.band || '',
        venue: existingGig.venue || '',
        date: existingGig.date ? new Date(existingGig.date).toISOString().split('T')[0] : '',
        time: existingGig.time || '',
        description: existingGig.description || '',
        genre: existingGig.genre || '',
        ticketPrice: existingGig.ticketPrice || '',
        ticketLink: existingGig.ticketLink || ''
      });
    }
  }, [existingGig]);

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

  const handleSaveBand = (bandData) => {
    const bandName = bandData.name;
    setBands(prev => prev.includes(bandName) ? prev : [...prev, bandName]);
    setLocalBandProfiles(prev => ({
      ...prev,
      [bandName]: bandData
    }));
    setFormData(prev => ({ ...prev, band: bandName }));
    setShowBandForm(false);
  };

  const handleViewBandProfile = (bandName) => {
    setSelectedBand(localBandProfiles[bandName]);
    setShowBandProfile(true);
  };

  const handleSaveVenue = (venueData) => {
    const venueName = venueData.name;
    setVenues(prev => prev.includes(venueName) ? prev : [...prev, venueName]);
    setLocalVenueProfiles(prev => ({
      ...prev,
      [venueName]: venueData
    }));
    setFormData(prev => ({ ...prev, venue: venueName }));
    setShowVenueForm(false);
  };

  const handleViewVenueProfile = (venueName) => {
    setSelectedVenue(localVenueProfiles[venueName]);
    setShowVenueProfile(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.band && formData.venue && formData.date && formData.time) {
      try {
        setIsSubmitting(true);
        const token = await getAccessTokenSilently();
        
        // Prepare gig data for the API
        const gigData = {
          band: formData.band,
          venue: formData.venue,
          date: formData.date,
          time: formData.time,
          description: formData.description,
          genre: formData.genre,
          ticketPrice: formData.ticketPrice,
          ticketLink: formData.ticketLink
        };

        let response;
        if (existingGig) {
          // Update existing gig
          response = await fetch(`http://localhost:4000/api/gigs/${existingGig._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(gigData)
          });
        } else {
          // Create new gig
          response = await fetch('http://localhost:4000/api/gigs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(gigData)
          });
        }

        if (!response.ok) {
          throw new Error(existingGig ? 'Failed to update gig' : 'Failed to save gig');
        }

        const savedGig = await response.json();
        
        // Also save to localStorage for immediate display
        const gigDataForLocal = {
          ...savedGig,
          id: savedGig._id,
          artist: formData.band,
          bands: bands,
          venues: venues,
          bandProfiles: localBandProfiles,
          venueProfiles: localVenueProfiles
        };
        
        onSave(gigDataForLocal);
      } catch (error) {
        console.error('Error saving gig:', error);
        alert(existingGig ? 'Failed to update gig. Please try again.' : 'Failed to save gig. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
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
          <h1>{existingGig ? 'Edit Gig' : 'Add a New Gig'}</h1>
          <p>{existingGig ? 'Update your gig information' : 'Share your upcoming performance with the Christchurch music community'}</p>
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
                  onClick={() => setShowBandForm(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPlus />
                </motion.button>
                {formData.band && localBandProfiles[formData.band] && (
                  <motion.button
                    type="button"
                    className="view-btn"
                    onClick={() => handleViewBandProfile(formData.band)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="View band profile"
                  >
                    <FiEye />
                  </motion.button>
                )}
              </div>
            </div>
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
                  onClick={() => setShowVenueForm(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPlus />
                </motion.button>
                {formData.venue && localVenueProfiles[formData.venue] && (
                  <motion.button
                    type="button"
                    className="view-btn"
                    onClick={() => handleViewVenueProfile(formData.venue)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="View venue profile"
                  >
                    <FiEye />
                  </motion.button>
                )}
              </div>
            </div>
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
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? 'Saving...' : (existingGig ? 'Update Gig' : 'Add Gig')}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Band Form Modal */}
      {showBandForm && (
        <BandForm
          onSave={handleSaveBand}
          onClose={() => setShowBandForm(false)}
        />
      )}

      {/* Band Profile Modal */}
      {showBandProfile && (
        <BandProfile
          band={selectedBand}
          onClose={() => setShowBandProfile(false)}
        />
      )}

      {/* Venue Form Modal */}
      {showVenueForm && (
        <VenueForm
          onSave={handleSaveVenue}
          onClose={() => setShowVenueForm(false)}
        />
      )}

      {/* Venue Profile Modal */}
      {showVenueProfile && (
        <VenueProfile
          venue={selectedVenue}
          onClose={() => setShowVenueProfile(false)}
        />
      )}
    </div>
  );
} 