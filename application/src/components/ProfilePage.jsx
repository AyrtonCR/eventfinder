import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMapPin, FiMusic, FiUsers, FiCalendar, FiMail, FiPhone, FiEdit3, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import './ProfilePage.css';

export default function ProfilePage({ profileData }) {
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

  // Merge profile data with dummy data for a complete profile
  const userProfile = {
    fullName: profileData?.fullName || 'Alex Johnson',
    age: profileData?.age || '28',
    address: profileData?.address || '123 Music Street, Christchurch, NZ',
    about: profileData?.about || 'Passionate musician with 10+ years of experience playing guitar and piano. Love creating original music and collaborating with other artists in the Christchurch music scene.',
    bands: profileData?.bands || 'The Midnight Echoes, Acoustic Duo, Jazz Collective',
    musicGenres: profileData?.musicGenres || 'Rock, Jazz, Folk, Electronic',
    photoUrl: profileData?.photoPreview || null,
    email: 'alex.johnson@email.com',
    phone: '+64 21 123 4567',
    joinDate: 'March 2023',
    totalGigs: 47,
    upcomingGigs: 3,
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

  return (
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Follow
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
  );
} 