import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMapPin, FiMail, FiPhone, FiInstagram, FiFacebook, FiTwitter, FiUsers, FiWifi, FiMusic, FiGlobe } from 'react-icons/fi';
import './VenueProfile.css';

export default function VenueProfile({ venue, onClose }) {
  if (!venue) return null;

  const getVenueEmoji = (type) => {
    const emojiMap = {
      'Bar/Pub': '🍺',
      'Restaurant': '🍽️',
      'Concert Hall': '🎭',
      'Theater': '🎪',
      'Club': '💃',
      'Cafe': '☕',
      'Outdoor Venue': '🌳',
      'Community Center': '🏛️',
      'Gallery': '🖼️',
      'Warehouse': '🏭',
      'Studio': '🎙️',
      'Hotel': '🏨',
      'University': '🎓',
      'Church': '⛪',
      'Park': '🌿'
    };
    return emojiMap[type] || '🏢';
  };

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      'Parking': '🚗',
      'WiFi': <FiWifi />,
      'Sound System': <FiMusic />,
      'Lighting': '💡',
      'Stage': '🎭',
      'Bar': '🍺',
      'Kitchen': '🍳',
      'Accessibility': '♿',
      'Air Conditioning': '❄️',
      'Outdoor Space': '🌳',
      'Dressing Rooms': '👗',
      'Green Room': '🛋️',
      'Merchandise Area': '🛍️',
      'Security': '🛡️',
      'First Aid': '🏥'
    };
    return iconMap[amenity] || '✓';
  };

  return (
    <AnimatePresence>
      <motion.div
        className="venue-profile-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="venue-profile-modal"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>

          <div className="venue-profile-header">
            <div className="venue-avatar">
              {venue.logoUrl ? (
                <img src={venue.logoUrl} alt={`${venue.name} logo`} className="venue-logo" />
              ) : (
                getVenueEmoji(venue.type)
              )}
            </div>
            <div className="venue-info">
              <h2>{venue.name}</h2>
              <p className="venue-type">{venue.type}</p>
              <p className="venue-location">
                <FiMapPin /> {venue.address}
              </p>
            </div>
          </div>

          <div className="venue-profile-content">
            <div className="venue-section">
              <h3>About</h3>
              <p>{venue.description}</p>
            </div>

            <div className="venue-section">
              <h3>Capacity</h3>
              <p className="capacity-info">
                <FiUsers /> {venue.capacity}
              </p>
            </div>

            {venue.amenities && venue.amenities.length > 0 && (
              <div className="venue-section">
                <h3>Amenities</h3>
                <div className="amenities-grid">
                  {venue.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <span className="amenity-icon">{getAmenityIcon(amenity)}</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(venue.contact?.email || venue.contact?.phone || venue.contact?.website) && (
              <div className="venue-section">
                <h3>Contact Information</h3>
                <div className="contact-info">
                  {venue.contact?.email && (
                    <a href={`mailto:${venue.contact.email}`} className="contact-item">
                      <FiMail />
                      <span>{venue.contact.email}</span>
                    </a>
                  )}
                  {venue.contact?.phone && (
                    <a href={`tel:${venue.contact.phone}`} className="contact-item">
                      <FiPhone />
                      <span>{venue.contact.phone}</span>
                    </a>
                  )}
                  {venue.contact?.website && (
                    <a href={venue.contact.website} target="_blank" rel="noopener noreferrer" className="contact-item">
                      <FiGlobe />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {(venue.socialMedia?.instagram || venue.socialMedia?.facebook || venue.socialMedia?.twitter) && (
              <div className="venue-section">
                <h3>Social Media</h3>
                <div className="social-links">
                  {venue.socialMedia?.instagram && (
                    <a href={venue.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                      <FiInstagram />
                      <span>Instagram</span>
                    </a>
                  )}
                  {venue.socialMedia?.facebook && (
                    <a href={venue.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-link facebook">
                      <FiFacebook />
                      <span>Facebook</span>
                    </a>
                  )}
                  {venue.socialMedia?.twitter && (
                    <a href={venue.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                      <FiTwitter />
                      <span>Twitter</span>
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