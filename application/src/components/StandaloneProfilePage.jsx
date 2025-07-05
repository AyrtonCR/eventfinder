import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMapPin, FiMusic, FiUsers, FiCalendar, FiMail, FiPhone, FiEdit3, FiInstagram, FiFacebook, FiTwitter, FiPlus } from 'react-icons/fi';
import Header from './Header';
import QuickActionsBar from './QuickActionsBar';
import Footer from './Footer';
import AddGig from './AddGig';
import BandProfile from './BandProfile';
import VenueProfile from './VenueProfile';
import './ProfilePage.css';

export default function StandaloneProfilePage() {
  const [showFooter, setShowFooter] = useState(false);
  const [showAddGig, setShowAddGig] = useState(false);
  const [showBandProfile, setShowBandProfile] = useState(false);
  const [selectedBand, setSelectedBand] = useState(null);
  const [showVenueProfile, setShowVenueProfile] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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
    },
    {
      id: 3,
      band: 'The Midnight Echoes',
      venue: 'The Foundry',
      date: '2024-03-10',
      time: '21:00',
      description: 'High-energy rock fusion night with special guests',
      genre: 'Rock, Fusion',
      ticketPrice: '$25',
      ticketLink: 'https://tickets.example.com',
      createdAt: '2024-01-25T16:00:00Z'
    },
    {
      id: 4,
      band: 'Acoustic Duo',
      venue: 'The Piano',
      date: '2024-03-18',
      time: '19:00',
      description: 'Classical crossover performance featuring piano and guitar',
      genre: 'Classical, Acoustic',
      ticketPrice: '$30',
      ticketLink: 'https://tickets.example.com',
      createdAt: '2024-01-30T11:30:00Z'
    },
    {
      id: 5,
      band: 'The Midnight Echoes',
      venue: 'Riverside Market',
      date: '2024-04-05',
      time: '14:00',
      description: 'Free outdoor performance for the community',
      genre: 'Jazz, Fusion',
      ticketPrice: 'Free',
      ticketLink: '',
      createdAt: '2024-02-05T09:15:00Z'
    }
  ]);

  const [bandProfiles, setBandProfiles] = useState({
    'The Midnight Echoes': {
      name: 'The Midnight Echoes',
      description: 'A dynamic jazz fusion quartet that blends traditional jazz with contemporary influences. Known for their intricate harmonies and innovative arrangements, The Midnight Echoes have been captivating audiences across Christchurch with their unique sound.',
      genres: ['Jazz', 'Fusion', 'Contemporary'],
      vibe: 'Smooth',
      logoUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=center',
      contact: {
        email: 'midnight.echoes@email.com',
        phone: '+64 21 555 1234',
        location: 'Christchurch, NZ'
      },
      socialMedia: {
        instagram: 'https://instagram.com/midnightechoes',
        facebook: 'https://facebook.com/midnightechoes',
        twitter: 'https://twitter.com/midnightechoes',
        youtube: 'https://youtube.com/midnightechoes'
      }
    },
    'Acoustic Duo': {
      name: 'Acoustic Duo',
      description: 'An intimate acoustic duo featuring soulful vocals and masterful guitar work. Specializing in folk, blues, and original compositions, they create an atmosphere of warmth and connection with every performance.',
      genres: ['Folk', 'Blues', 'Acoustic'],
      vibe: 'Mellow',
      contact: {
        email: 'acousticduo@email.com',
        phone: '+64 21 555 5678',
        location: 'Christchurch, NZ'
      },
      socialMedia: {
        instagram: 'https://instagram.com/acousticduo',
        facebook: 'https://facebook.com/acousticduo'
      }
    }
  });

  const [venueProfiles, setVenueProfiles] = useState({
    'The Blue Room': {
      name: 'The Blue Room',
      description: 'An intimate jazz venue with a warm, sophisticated atmosphere. Known for its excellent acoustics and cozy seating, The Blue Room has been a cornerstone of Christchurch\'s jazz scene for over 20 years.',
      type: 'Bar/Pub',
      address: '456 Jazz Street, Christchurch Central',
      capacity: '80 people',
      amenities: ['Parking', 'Sound System', 'Stage', 'Bar', 'Kitchen', 'Air Conditioning'],
      logoUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&h=200&fit=crop&crop=center',
      contact: {
        email: 'info@theblueroom.co.nz',
        phone: '+64 3 555 1234',
        website: 'https://theblueroom.co.nz'
      },
      socialMedia: {
        instagram: 'https://instagram.com/theblueroom',
        facebook: 'https://facebook.com/theblueroom'
      }
    },
    'Jazz Corner': {
      name: 'Jazz Corner',
      description: 'A premier jazz venue featuring live music seven nights a week. With its vintage decor and state-of-the-art sound system, Jazz Corner offers an authentic jazz experience in the heart of Christchurch.',
      type: 'Club',
      address: '789 Music Avenue, Christchurch Central',
      capacity: '120 people',
      amenities: ['Parking', 'WiFi', 'Sound System', 'Lighting', 'Stage', 'Bar', 'Kitchen', 'Dressing Rooms', 'Green Room'],
      contact: {
        email: 'bookings@jazzcorner.co.nz',
        phone: '+64 3 555 5678',
        website: 'https://jazzcorner.co.nz'
      },
      socialMedia: {
        instagram: 'https://instagram.com/jazzcorner',
        facebook: 'https://facebook.com/jazzcorner',
        twitter: 'https://twitter.com/jazzcorner'
      }
    },
    'The Foundry': {
      name: 'The Foundry',
      description: 'A converted warehouse space that has become Christchurch\'s premier venue for rock, metal, and alternative music. The industrial aesthetic and powerful sound system create an electric atmosphere for high-energy performances.',
      type: 'Warehouse',
      address: '123 Industrial Way, Addington',
      capacity: '300 people',
      amenities: ['Parking', 'WiFi', 'Sound System', 'Lighting', 'Stage', 'Bar', 'Kitchen', 'Dressing Rooms', 'Green Room', 'Merchandise Area', 'Security', 'First Aid'],
      contact: {
        email: 'events@thefoundry.co.nz',
        phone: '+64 3 555 9012',
        website: 'https://thefoundry.co.nz'
      },
      socialMedia: {
        instagram: 'https://instagram.com/thefoundry',
        facebook: 'https://facebook.com/thefoundry',
        twitter: 'https://twitter.com/thefoundry'
      }
    },
    'Darkroom': {
      name: 'Darkroom',
      description: 'A sleek, modern venue specializing in electronic music and DJ performances. With state-of-the-art lighting and sound systems, Darkroom provides an immersive experience for electronic music enthusiasts.',
      type: 'Club',
      address: '567 Nightlife Boulevard, Christchurch Central',
      capacity: '200 people',
      amenities: ['Parking', 'WiFi', 'Sound System', 'Lighting', 'Stage', 'Bar', 'Kitchen', 'Air Conditioning', 'Security', 'First Aid'],
      contact: {
        email: 'bookings@darkroom.co.nz',
        phone: '+64 3 555 3456',
        website: 'https://darkroom.co.nz'
      },
      socialMedia: {
        instagram: 'https://instagram.com/darkroom',
        facebook: 'https://facebook.com/darkroom'
      }
    },
    'The Piano': {
      name: 'The Piano',
      description: 'A beautiful concert hall with exceptional acoustics, perfect for classical, jazz, and acoustic performances. The elegant architecture and intimate setting make every performance a memorable experience.',
      type: 'Concert Hall',
      address: '156 Gloucester Street, Christchurch Central',
      capacity: '150 people',
      amenities: ['Parking', 'WiFi', 'Sound System', 'Lighting', 'Stage', 'Air Conditioning', 'Dressing Rooms', 'Green Room', 'Accessibility'],
      contact: {
        email: 'info@thepiano.co.nz',
        phone: '+64 3 555 7890',
        website: 'https://thepiano.co.nz'
      },
      socialMedia: {
        instagram: 'https://instagram.com/thepiano',
        facebook: 'https://facebook.com/thepiano',
        twitter: 'https://twitter.com/thepiano'
      }
    },
    'Riverside Market': {
      name: 'Riverside Market',
      description: 'An outdoor venue located in the heart of the Riverside Market precinct. Perfect for acoustic performances, busking, and community events with a relaxed, family-friendly atmosphere.',
      type: 'Outdoor Venue',
      address: '96 Oxford Terrace, Christchurch Central',
      capacity: '100 people',
      amenities: ['Parking', 'WiFi', 'Sound System', 'Lighting', 'Stage', 'Kitchen', 'Outdoor Space', 'Accessibility'],
      contact: {
        email: 'events@riversidemarket.co.nz',
        phone: '+64 3 555 2345',
        website: 'https://riversidemarket.co.nz'
      },
      socialMedia: {
        instagram: 'https://instagram.com/riversidemarket',
        facebook: 'https://facebook.com/riversidemarket'
      }
    }
  });

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
    venues: ['The Blue Room', 'Jazz Corner', 'The Foundry', 'Darkroom', 'The Piano', 'Riverside Market'],
    achievements: ['Best New Artist 2022', 'Christchurch Music Award Nominee', 'Featured on Radio NZ']
  };

  const profileEmoji = getGenreEmoji(userProfile.musicGenres);

  const handleAddGig = (gigData) => {
    // Create new gig with proper format for main app
    const newGig = {
      id: Date.now(),
      time: gigData.time,
      venue: gigData.venue,
      artist: gigData.band,
      genre: gigData.genre,
      details: gigData.description,
      date: new Date(gigData.date),
      dayOfWeek: new Date(gigData.date).getDay(),
      hour: parseInt(gigData.time.split(':')[0]),
      description: gigData.description,
      ticketPrice: gigData.ticketPrice,
      ticketLink: gigData.ticketLink,
      title: `${gigData.band} @ ${gigData.venue}`,
    };
    
    // Add to local user gigs for profile display
    setUserGigs([...userGigs, gigData]);
    
    // Get existing gigs from localStorage and add new gig
    const existingGigs = JSON.parse(localStorage.getItem('eventfinder_gigs') || '[]');
    const updatedGigs = [...existingGigs, newGig];
    localStorage.setItem('eventfinder_gigs', JSON.stringify(updatedGigs));
    
    // Trigger storage event for other tabs/windows
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'eventfinder_gigs',
      newValue: JSON.stringify(updatedGigs)
    }));
    
    // Update band profiles if new band was added
    if (gigData.bandProfiles) {
      setBandProfiles(prev => ({
        ...prev,
        ...gigData.bandProfiles
      }));
    }
    
    // Update venue profiles if new venue was added
    if (gigData.venueProfiles) {
      setVenueProfiles(prev => ({
        ...prev,
        ...gigData.venueProfiles
      }));
    }
    
    setShowAddGig(false);
    setShowSuccessMessage(true);
    
    // Auto-redirect back to main page after 2 seconds
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  const handleCancelAddGig = () => {
    setShowAddGig(false);
  };

  const handleViewBandProfile = (bandName) => {
    setSelectedBand(bandProfiles[bandName]);
    setShowBandProfile(true);
  };

  const handleViewVenueProfile = (venueName) => {
    setSelectedVenue(venueProfiles[venueName]);
    setShowVenueProfile(true);
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
          existingBands={Object.keys(bandProfiles)}
          existingVenues={Object.keys(venueProfiles)}
          bandProfiles={bandProfiles}
          venueProfiles={venueProfiles}
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

              {/* My Bands Section */}
              <motion.div 
                className="profile-section bands-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h3><FiMusic /> My Bands</h3>
                {Object.keys(bandProfiles).length > 0 ? (
                  <div className="bands-list">
                    {Object.keys(bandProfiles).map((bandName, index) => (
                      <motion.button
                        key={index}
                        className="band-button"
                        onClick={() => handleViewBandProfile(bandName)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <span className="band-emoji">
                          {bandProfiles[bandName].logoUrl ? (
                            <img src={bandProfiles[bandName].logoUrl} alt={`${bandName} logo`} className="band-logo" />
                          ) : (
                            getGenreEmoji(bandProfiles[bandName].genres.join(', '))
                          )}
                        </span>
                        <span className="band-name">{bandName}</span>
                        <span className="band-genres">{bandProfiles[bandName].genres.join(', ')}</span>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="no-bands">
                    <p>No bands yet. Add bands when creating gigs!</p>
                  </div>
                )}
              </motion.div>

              {/* My Venues Section */}
              <motion.div 
                className="profile-section venues-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3><FiMapPin /> My Venues</h3>
                {Object.keys(venueProfiles).length > 0 ? (
                  <div className="venues-list">
                    {Object.keys(venueProfiles).map((venueName, index) => (
                      <motion.button
                        key={index}
                        className="venue-button"
                        onClick={() => handleViewVenueProfile(venueName)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <span className="venue-emoji">
                          {venueProfiles[venueName].logoUrl ? (
                            <img src={venueProfiles[venueName].logoUrl} alt={`${venueName} logo`} className="venue-logo" />
                          ) : (
                            '🏢'
                          )}
                        </span>
                        <span className="venue-name">{venueName}</span>
                        <span className="venue-type">{venueProfiles[venueName].type}</span>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="no-venues">
                    <p>No venues yet. Add venues when creating gigs!</p>
                  </div>
                )}
              </motion.div>

              {/* About Section */}
              <motion.div 
                className="profile-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h3><FiUser /> About</h3>
                <p>{userProfile.about}</p>
              </motion.div>

              {/* Music Section */}
              <motion.div 
                className="profile-section"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
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
                transition={{ delay: 0.45 }}
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
                transition={{ delay: 0.55 }}
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
                transition={{ delay: 0.65 }}
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
                transition={{ delay: 0.75 }}
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

      {/* Band Profile Modal */}
      {showBandProfile && (
        <BandProfile
          band={selectedBand}
          onClose={() => setShowBandProfile(false)}
        />
      )}

      {/* Venue Profile Modal */}
      {showVenueProfile && (
        <VenueProfile
          venue={selectedVenue}
          onClose={() => setShowVenueProfile(false)}
        />
      )}

      {showSuccessMessage && (
        <div className="success-message">
          <p>Gig added successfully!</p>
          <button onClick={() => setShowSuccessMessage(false)}>OK</button>
        </div>
      )}

      {showFooter && <Footer />}
    </>
  );
} 