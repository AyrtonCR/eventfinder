import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMapPin, FiMusic, FiUsers, FiCalendar, FiMail, FiPhone, FiEdit3, FiInstagram, FiFacebook, FiTwitter, FiPlus } from 'react-icons/fi';
import Header from './Header';
import QuickActionsBar from './QuickActionsBar';
import Footer from './Footer';
import AddGig from './AddGig';
import './ProfilePage.css';

export default function StandaloneProfilePage() {
  const [showFooter, setShowFooter] = useState(false);
  const [showAddGig, setShowAddGig] = useState(false);
  const [userGigs, setUserGigs] = useState([
    {
      id: 1,
      band: 'The Midnight Echoes',
      venue: 'The Blue Room',
      date: '2024-02-15',
      time: '20:00',
      description: 'An evening of jazz fusion and original compositions',
      genre: 'Jazz, Fusion',
      ticketPrice: '$20',
      ticketLink: 'https://tickets.example.com',
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      band: 'Acoustic Duo',
      venue: 'Jazz Corner',
      date: '2024-02-22',
      time: '19:30',
      description: 'Intimate acoustic performance featuring folk and blues',
      genre: 'Folk, Blues',
      ticketPrice: '$15',
      ticketLink: 'https://tickets.example.com',
      createdAt: '2024-01-20T14:30:00Z'
    }
  ]);

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

  // Dummy user profile data
  const userProfile = {
    fullName: 'Alex Johnson',
    age: '28',
    address: '123 Music Street, Christchurch, NZ',
    about: 'Passionate musician with 10+ years of experience playing guitar and piano. Love creating original music and collaborating with other artists in the Christchurch music scene. Specialize in rock, jazz, and folk fusion.',
    bands: 'The Midnight Echoes, Acoustic Duo, Jazz Collective',
    musicGenres: 'Rock, Jazz, Folk, Electronic',
    photoUrl: null, // No photo uploaded, will show emoji
    email: 'alex.johnson@email.com',
    phone: '+64 21 123 4567',
    joinDate: 'March 2023',
    totalGigs: userGigs.length,
    upcomingGigs: userGigs.filter(gig => new Date(gig.date) > new Date()).length,
    followers: 234,
    following: 156,
    socialLinks: {
      instagram: '@alexjohnsonmusic',
      facebook: 'Alex Johnson Music',
      twitter: '@alexjmusic'
    },
    instruments: ['Guitar', 'Piano', 'Vocals', 'Bass'],
    venues: ['The Blue Room', 'Jazz Corner', 'The Foundry', 'Darkroom'],
    achievements: ['Best New Artist 2022', 'Christchurch Music Award Nominee', 'Featured on Radio NZ']
  };

  const profileEmoji = getGenreEmoji(userProfile.musicGenres);

  const handleAddGig = (gigData) => {
    setUserGigs([...userGigs, gigData]);
    setShowAddGig(false);
  };

  const handleCancelAddGig = () => {
    setShowAddGig(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (showAddGig) {
    return (
      <>
        <Header userProfile={userProfile} />
        <QuickActionsBar />
        <AddGig 
          onSave={handleAddGig}
          onCancel={handleCancelAddGig}
          existingBands={userProfile.bands.split(', ')}
          existingVenues={userProfile.venues}
        />
        {showFooter && <Footer />}
      </>
    );
  }

  return (
    <>
      <Header userProfile={userProfile} />
      <QuickActionsBar />
      <div className="profile-page">
        <motion.div 
          className="profile-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero Section */}
          <div className="profile-hero">
            <div className="profile-photo-section">
              <motion.div 
                className="profile-photo"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {userProfile.photoUrl ? (
                  <img src={userProfile.photoUrl} alt={userProfile.fullName} />
                ) : (
                  <div className="profile-emoji">
                    <span className="emoji-face">{profileEmoji}</span>
                  </div>
                )}
                <div className="edit-overlay">
                  <FiEdit3 />
                </div>
              </motion.div>
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-number">{userProfile.totalGigs}</span>
                  <span className="stat-label">Gigs Played</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{userProfile.upcomingGigs}</span>
                  <span className="stat-label">Upcoming</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{userProfile.followers}</span>
                  <span className="stat-label">Followers</span>
                </div>
              </div>
            </div>
            
            <div className="profile-info">
              <h1>{userProfile.fullName}</h1>
              <p className="profile-tagline">Musician • Guitarist • Songwriter</p>
              <div className="profile-meta">
                <span><FiMapPin /> {userProfile.address}</span>
                <span><FiCalendar /> Joined {userProfile.joinDate}</span>
              </div>
              <div className="profile-actions">
                <motion.button 
                  className="btn-primary"
                  onClick={() => setShowAddGig(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiPlus /> Add a Gig
                </motion.button>
                <motion.button 
                  className="btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Message
                </motion.button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="profile-content">
            <div className="profile-grid">
              {/* Gigs Section */}
              <motion.div 
                className="profile-section gigs-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3><FiMusic /> My Gigs</h3>
                {userGigs.length > 0 ? (
                  <div className="gigs-list">
                    {userGigs.map((gig) => (
                      <motion.div 
                        key={gig.id} 
                        className="gig-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="gig-header">
                          <h4>{gig.band}</h4>
                          <span className="gig-date">{formatDate(gig.date)}</span>
                        </div>
                        <div className="gig-details">
                          <p><FiMapPin /> {gig.venue}</p>
                          <p><FiCalendar /> {formatTime(gig.time)}</p>
                          {gig.genre && <p><FiMusic /> {gig.genre}</p>}
                        </div>
                        {gig.description && (
                          <p className="gig-description">{gig.description}</p>
                        )}
                        <div className="gig-footer">
                          {gig.ticketPrice && (
                            <span className="ticket-price">{gig.ticketPrice}</span>
                          )}
                          {gig.ticketLink && (
                            <a href={gig.ticketLink} className="ticket-link" target="_blank" rel="noopener noreferrer">
                              Get Tickets
                            </a>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="no-gigs">
                    <p>No gigs yet. Add your first gig to get started!</p>
                    <motion.button 
                      className="btn-primary"
                      onClick={() => setShowAddGig(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiPlus /> Add Your First Gig
                    </motion.button>
                  </div>
                )}
              </motion.div>

              {/* About Section */}
              <motion.div 
                className="profile-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3><FiUser /> About</h3>
                <p>{userProfile.about}</p>
              </motion.div>

              {/* Music Section */}
              <motion.div 
                className="profile-section"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3><FiMusic /> Music</h3>
                <div className="music-details">
                  <div className="detail-item">
                    <strong>Genres:</strong> {userProfile.musicGenres}
                  </div>
                  <div className="detail-item">
                    <strong>Bands:</strong> {userProfile.bands}
                  </div>
                  <div className="detail-item">
                    <strong>Instruments:</strong> {userProfile.instruments.join(', ')}
                  </div>
                </div>
              </motion.div>

              {/* Contact Section */}
              <motion.div 
                className="profile-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3>Contact</h3>
                <div className="contact-details">
                  <div className="contact-item">
                    <FiMail />
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="contact-item">
                    <FiPhone />
                    <span>{userProfile.phone}</span>
                  </div>
                </div>
              </motion.div>

              {/* Venues Section */}
              <motion.div 
                className="profile-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3>Favorite Venues</h3>
                <div className="venues-list">
                  {userProfile.venues.map((venue, index) => (
                    <span key={index} className="venue-tag">{venue}</span>
                  ))}
                </div>
              </motion.div>

              {/* Achievements Section */}
              <motion.div 
                className="profile-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3>Achievements</h3>
                <div className="achievements-list">
                  {userProfile.achievements.map((achievement, index) => (
                    <div key={index} className="achievement-item">
                      <span className="achievement-icon">🏆</span>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="profile-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3>Social Media</h3>
                <div className="social-links">
                  <a href="#" className="social-link instagram">
                    <FiInstagram />
                    <span>{userProfile.socialLinks.instagram}</span>
                  </a>
                  <a href="#" className="social-link facebook">
                    <FiFacebook />
                    <span>{userProfile.socialLinks.facebook}</span>
                  </a>
                  <a href="#" className="social-link twitter">
                    <FiTwitter />
                    <span>{userProfile.socialLinks.twitter}</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      {showFooter && <Footer />}
    </>
  );
} 