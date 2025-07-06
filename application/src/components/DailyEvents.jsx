import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMapPin, FiCalendar, FiClock, FiMusic, FiExternalLink, FiUsers, FiMail, FiPhone, FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';
import './DailyEvents.css';

/* -------- helper: HH:mm → minutes since 0:00 for sort -------- */
const mins = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

// Gig Detail Popup Component
const GigDetailPopup = ({ gig, isOpen, onClose, onBandClick, onVenueClick }) => {
  if (!gig) return null;

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Dummy band data - in a real app this would come from the band profiles
  const bandData = {
    name: gig.artist,
    description: 'A dynamic band that brings energy and passion to every performance. Known for their unique sound and engaging live shows.',
    genres: gig.genre ? gig.genre.split(', ') : ['Rock'],
    vibe: 'Energetic',
    logoUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=center',
    contact: {
      email: `${gig.artist.toLowerCase().replace(/\s+/g, '')}@email.com`,
      phone: '+64 21 555 1234',
      location: 'Christchurch, NZ'
    },
    socialMedia: {
      instagram: `https://instagram.com/${gig.artist.toLowerCase().replace(/\s+/g, '')}`,
      facebook: `https://facebook.com/${gig.artist.toLowerCase().replace(/\s+/g, '')}`,
      twitter: `https://twitter.com/${gig.artist.toLowerCase().replace(/\s+/g, '')}`,
      youtube: `https://youtube.com/${gig.artist.toLowerCase().replace(/\s+/g, '')}`
    }
  };

  // Dummy venue data - in a real app this would come from the venue profiles
  const venueData = {
    name: gig.venue,
    description: 'A fantastic venue with great acoustics and atmosphere. Perfect for live music performances.',
    type: 'Bar/Pub',
    address: '123 Music Street, Christchurch Central',
    capacity: '150 people',
    amenities: ['Parking', 'Sound System', 'Stage', 'Bar', 'Kitchen', 'Air Conditioning'],
    logoUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&h=200&fit=crop&crop=center',
    contact: {
      email: `info@${gig.venue.toLowerCase().replace(/\s+/g, '')}.co.nz`,
      phone: '+64 3 555 1234',
      website: `https://${gig.venue.toLowerCase().replace(/\s+/g, '')}.co.nz`
    },
    socialMedia: {
      instagram: `https://instagram.com/${gig.venue.toLowerCase().replace(/\s+/g, '')}`,
      facebook: `https://facebook.com/${gig.venue.toLowerCase().replace(/\s+/g, '')}`
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="gig-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="gig-popup"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="gig-popup-header">
              <h2>{gig.artist}</h2>
              <button className="gig-popup-close" onClick={onClose}>
                <FiX />
              </button>
            </div>

            {/* Main Content */}
            <div className="gig-popup-content">
              {/* Gig Details */}
              <div className="gig-popup-section">
                <h3>Event Details</h3>
                <div className="gig-popup-details">
                  <div className="detail-item">
                    <FiCalendar />
                    <span>{formatDate(gig.date)}</span>
                  </div>
                  <div className="detail-item">
                    <FiClock />
                    <span>{formatTime(gig.time)}</span>
                  </div>
                  <div className="detail-item clickable" onClick={() => onVenueClick(venueData)}>
                    <FiMapPin />
                    <span className="clickable-text">{gig.venue}</span>
                  </div>
                  <div className="detail-item">
                    <FiMusic />
                    <span>{gig.genre}</span>
                  </div>
                </div>
                {gig.description && (
                  <p className="gig-description">{gig.description}</p>
                )}
              </div>

              {/* Band Section */}
              <div className="gig-popup-section">
                <h3>Band</h3>
                <div className="band-preview" onClick={() => onBandClick(bandData)}>
                  <div className="band-logo">
                    {bandData.logoUrl ? (
                      <img src={bandData.logoUrl} alt={bandData.name} />
                    ) : (
                      <div className="band-emoji">🎸</div>
                    )}
                  </div>
                  <div className="band-info">
                    <h4 className="clickable-text">{bandData.name}</h4>
                    <p>{bandData.description}</p>
                    <div className="band-genres">
                      {bandData.genres.map((genre, index) => (
                        <span key={index} className="genre-tag">{genre}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Venue Section */}
              <div className="gig-popup-section">
                <h3>Venue</h3>
                <div className="venue-preview" onClick={() => onVenueClick(venueData)}>
                  <div className="venue-logo">
                    {venueData.logoUrl ? (
                      <img src={venueData.logoUrl} alt={venueData.name} />
                    ) : (
                      <div className="venue-emoji">🏢</div>
                    )}
                  </div>
                  <div className="venue-info">
                    <h4 className="clickable-text">{venueData.name}</h4>
                    <p>{venueData.description}</p>
                    <div className="venue-details">
                      <span>{venueData.type}</span>
                      <span>•</span>
                      <span>{venueData.capacity}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tickets Section */}
              {gig.ticketPrice && (
                <div className="gig-popup-section">
                  <h3>Tickets</h3>
                  <div className="ticket-info">
                    <div className="ticket-price">
                      <strong>{gig.ticketPrice}</strong>
                    </div>
                    {gig.ticketLink && (
                      <a 
                        href={gig.ticketLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ticket-link"
                      >
                        <FiExternalLink />
                        Get Tickets
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function DailyEvents({ dateLabel = 'Friday • 3 July 2025', onNextDay, onPreviousDay, onGoToToday, gigs = [] }) {
  const [selectedGig, setSelectedGig] = useState(null);
  const [showBandProfile, setShowBandProfile] = useState(false);
  const [selectedBand, setSelectedBand] = useState(null);
  const [showVenueProfile, setShowVenueProfile] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);

  // Use provided gigs or fall back to empty array
  const sorted = [...gigs].sort((a, b) => mins(a.time) - mins(b.time));

  const handleGigClick = (gig) => {
    setSelectedGig(gig);
  };

  const handleBandClick = (bandData) => {
    setSelectedBand(bandData);
    setShowBandProfile(true);
    setSelectedGig(null); // Close gig popup
  };

  const handleVenueClick = (venueData) => {
    setSelectedVenue(venueData);
    setShowVenueProfile(true);
    setSelectedGig(null); // Close gig popup
  };

  return (
    <>
      <section className="daily">
        <div className="daily__heading-row">
          <div className="daily__navigation">
            {onPreviousDay && (
              <button className="daily__arrow daily__arrow--prev" onClick={onPreviousDay} title="Previous day">
                <span style={{fontSize: '2.4rem', fontWeight: 900, fontFamily: 'Montserrat, sans-serif', lineHeight: 1}}>&#8592;</span>
              </button>
            )}
            <h2 className="daily__heading">{dateLabel}</h2>
            {onNextDay && (
              <button className="daily__arrow daily__arrow--next" onClick={onNextDay} title="Next day">
                <span style={{fontSize: '2.4rem', fontWeight: 900, fontFamily: 'Montserrat, sans-serif', lineHeight: 1}}>&#8594;</span>
              </button>
            )}
          </div>
          {onGoToToday && (
            <button className="daily__today-btn" onClick={onGoToToday} title="Go to today">
              Today
            </button>
          )}
        </div>
        {sorted.length > 0 ? (
          sorted.map((g) => (
            <motion.article
              key={g.id}
              className="daily__gig"
              whileHover={{
                scale: 1.035,
                transition: {
                  type: 'spring', stiffness: 200, damping: 18, duration: 0.25
                }
              }}
              onClick={() => handleGigClick(g)}
            >
              <div className="daily__gig-inner">
                <div className="daily__time">{g.time}</div>
                <div className="daily__info">
                  <h3>{g.venue}</h3>
                  <p>{g.artist}</p>
                  <p className="daily__meta">
                    {g.genre} &nbsp;•&nbsp; {g.details}
                  </p>
                </div>
              </div>
            </motion.article>
          ))
        ) : (
          <div className="daily__no-gigs">
            <p>No gigs scheduled for this date.</p>
          </div>
        )}
      </section>

      {/* Gig Detail Popup */}
      <GigDetailPopup
        gig={selectedGig}
        isOpen={!!selectedGig}
        onClose={() => setSelectedGig(null)}
        onBandClick={handleBandClick}
        onVenueClick={handleVenueClick}
      />

      {/* Band Profile Popup */}
      {showBandProfile && selectedBand && (
        <BandProfilePopup
          band={selectedBand}
          isOpen={showBandProfile}
          onClose={() => setShowBandProfile(false)}
        />
      )}

      {/* Venue Profile Popup */}
      {showVenueProfile && selectedVenue && (
        <VenueProfilePopup
          venue={selectedVenue}
          isOpen={showVenueProfile}
          onClose={() => setShowVenueProfile(false)}
        />
      )}
    </>
  );
}

// Band Profile Popup Component
const BandProfilePopup = ({ band, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="profile-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="profile-popup"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-popup-header">
              <h2>{band.name}</h2>
              <button className="profile-popup-close" onClick={onClose}>
                <FiX />
              </button>
            </div>
            <div className="profile-popup-content">
              <div className="profile-hero">
                <div className="profile-logo">
                  {band.logoUrl ? (
                    <img src={band.logoUrl} alt={band.name} />
                  ) : (
                    <div className="profile-emoji">🎸</div>
                  )}
                </div>
                <div className="profile-info">
                  <p className="profile-description">{band.description}</p>
                  <div className="profile-genres">
                    {band.genres.map((genre, index) => (
                      <span key={index} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="profile-section">
                <h3>Contact</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <FiMail />
                    <span>{band.contact.email}</span>
                  </div>
                  <div className="contact-item">
                    <FiPhone />
                    <span>{band.contact.phone}</span>
                  </div>
                  <div className="contact-item">
                    <FiMapPin />
                    <span>{band.contact.location}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Social Media</h3>
                <div className="social-links">
                  {band.socialMedia.instagram && (
                    <a href={band.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                      <FiInstagram />
                    </a>
                  )}
                  {band.socialMedia.facebook && (
                    <a href={band.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                      <FiFacebook />
                    </a>
                  )}
                  {band.socialMedia.twitter && (
                    <a href={band.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                      <FiTwitter />
                    </a>
                  )}
                  {band.socialMedia.youtube && (
                    <a href={band.socialMedia.youtube} target="_blank" rel="noopener noreferrer">
                      <FiYoutube />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Venue Profile Popup Component
const VenueProfilePopup = ({ venue, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="profile-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="profile-popup"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-popup-header">
              <h2>{venue.name}</h2>
              <button className="profile-popup-close" onClick={onClose}>
                <FiX />
              </button>
            </div>
            <div className="profile-popup-content">
              <div className="profile-hero">
                <div className="profile-logo">
                  {venue.logoUrl ? (
                    <img src={venue.logoUrl} alt={venue.name} />
                  ) : (
                    <div className="profile-emoji">🏢</div>
                  )}
                </div>
                <div className="profile-info">
                  <p className="profile-description">{venue.description}</p>
                  <div className="venue-details">
                    <span className="venue-type">{venue.type}</span>
                    <span>•</span>
                    <span>{venue.capacity}</span>
                  </div>
                </div>
              </div>
              
              <div className="profile-section">
                <h3>Location</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <FiMapPin />
                    <span>{venue.address}</span>
                  </div>
                  <div className="contact-item">
                    <FiMail />
                    <span>{venue.contact.email}</span>
                  </div>
                  <div className="contact-item">
                    <FiPhone />
                    <span>{venue.contact.phone}</span>
                  </div>
                  {venue.contact.website && (
                    <div className="contact-item">
                      <FiExternalLink />
                      <a href={venue.contact.website} target="_blank" rel="noopener noreferrer">
                        {venue.contact.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="profile-section">
                <h3>Amenities</h3>
                <div className="amenities-list">
                  {venue.amenities.map((amenity, index) => (
                    <span key={index} className="amenity-tag">{amenity}</span>
                  ))}
                </div>
              </div>

              <div className="profile-section">
                <h3>Social Media</h3>
                <div className="social-links">
                  {venue.socialMedia.instagram && (
                    <a href={venue.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                      <FiInstagram />
                    </a>
                  )}
                  {venue.socialMedia.facebook && (
                    <a href={venue.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                      <FiFacebook />
                    </a>
                  )}
                  {venue.socialMedia.twitter && (
                    <a href={venue.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                      <FiTwitter />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
