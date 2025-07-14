import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import QuickActionsBar from './QuickActionsBar';
import Footer from './Footer';
import AddGig from './AddGig';
import BandProfile from './BandProfile';
import VenueProfile from './VenueProfile';
import './ProfilePage.css';

export default function StandaloneProfilePage() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [showFooter, setShowFooter] = useState(false);
  const [showAddGig, setShowAddGig] = useState(false);
  const [showBandProfile, setShowBandProfile] = useState(false);
  const [selectedBand, setSelectedBand] = useState(null);
  const [showVenueProfile, setShowVenueProfile] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userGigs, setUserGigs] = useState([]);
  const [bandProfiles, setBandProfiles] = useState({});
  const [venueProfiles, setVenueProfiles] = useState({});
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingGig, setEditingGig] = useState(null);

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

  // Fetch user profile and gigs from backend
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (isAuthenticated && user) {
          const token = await getAccessTokenSilently();
          
          // Fetch profile
          const profileResponse = await fetch('http://localhost:4000/api/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (profileResponse.status === 404) {
            // User doesn't have a profile yet, create a basic one from Auth0 data
            const basicProfile = {
              fullName: user.name || user.email,
              email: user.email,
              musicGenres: '',
              about: '',
              bands: '',
              address: ''
            };
            setProfile(basicProfile);
          } else if (!profileResponse.ok) {
            throw new Error('Failed to fetch profile');
          } else {
            const profileData = await profileResponse.json();
            setProfile(profileData);
          }
          
          // Fetch user's gigs
          const gigsResponse = await fetch('http://localhost:4000/api/gigs/my-gigs', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (gigsResponse.ok) {
            const gigsData = await gigsResponse.json();
            setUserGigs(gigsData);
          }
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load profile.');
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    if (!isLoading) fetchUserData();
  }, [isAuthenticated, user, isLoading, getAccessTokenSilently]);

  // Function to get genre-specific emoji
  const getGenreEmoji = (genres) => {
    if (!genres) return '🎵';
    const genreEmojis = {
      'rock': '🤘', 'pop': '🎤', 'electronic': '🎧', 'hip hop': '🎤', 'jazz': '🎷',
      'blues': '🎸', 'country': '🤠', 'folk': '🪕', 'r&b': '🎤', 'soul': '🎤',
      'reggae': '🌴', 'punk': '💀', 'metal': '🤘', 'indie': '🎸', 'alternative': '🎸',
      'classical': '🎻', 'funk': '🎺', 'disco': '🕺', 'ambient': '🌙'
    };
    const genreList = genres.toLowerCase().split(',').map(g => g.trim());
    for (const genre of genreList) {
      if (genreEmojis[genre]) return genreEmojis[genre];
    }
    return '🎵';
  };

  if (loading || isLoading) {
    return (
      <div className="profile-page">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Loading profile...</h2>
        </div>
      </div>
    );
  }
  if (error || !profile) {
    return (
      <div className="profile-page">
        <div className="loading-content">
          <h2 style={{ color: 'red' }}>{error || 'Profile not found.'}</h2>
          <p style={{ color: '#bfc2d0', marginTop: '1rem' }}>
            {error ? 'There was an error loading your profile.' : 'You need to complete your profile first.'}
          </p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/profile-completion')}
            style={{ marginTop: '1rem' }}
          >
            Complete Profile
          </button>
        </div>
      </div>
    );
  }

  const profileEmoji = getGenreEmoji(profile.musicGenres);

  const handleAddGig = async (gigData) => {
    try {
      if (editingGig) {
        // Update existing gig
        const updatedGig = {
          ...gigData,
          _id: editingGig._id
        };
        
        // Update in local user gigs
        setUserGigs(prev => prev.map(gig => 
          gig._id === editingGig._id ? updatedGig : gig
        ));
        
        setEditingGig(null);
        setShowAddGig(false);
        setShowSuccessMessage(true);
        
        // Refresh user's gigs from the database
        if (isAuthenticated && user) {
          const token = await getAccessTokenSilently();
          const gigsResponse = await fetch('http://localhost:4000/api/gigs/my-gigs', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (gigsResponse.ok) {
            const gigsData = await gigsResponse.json();
            setUserGigs(gigsData);
          }
        }
      } else {
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
        setUserGigs(prev => [...prev, gigData]);
    
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
        
        // Refresh user's gigs from the database
        if (isAuthenticated && user) {
          const token = await getAccessTokenSilently();
          const gigsResponse = await fetch('http://localhost:4000/api/gigs/my-gigs', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (gigsResponse.ok) {
            const gigsData = await gigsResponse.json();
            setUserGigs(gigsData);
          }
        }
    
    // Auto-redirect back to main page after 2 seconds
    setTimeout(() => {
          navigate('/');
    }, 2000);
      }
    } catch (error) {
      console.error('Error handling gig addition:', error);
    }
  };

  const handleEditGig = (gig) => {
    setEditingGig(gig);
    setShowAddGig(true);
  };

  const handleCancelAddGig = () => {
    setShowAddGig(false);
    setEditingGig(null);
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
        <Header userProfile={profile} />
        <QuickActionsBar onAddGig={() => setShowAddGig(true)} />
        <AddGig 
          onSave={handleAddGig}
          onCancel={handleCancelAddGig}
          existingGig={editingGig}
          existingBands={editingGig ? 
            [...new Set([...Object.keys(bandProfiles), editingGig.band])] : 
            Object.keys(bandProfiles)
          }
          existingVenues={editingGig ? 
            [...new Set([...Object.keys(venueProfiles), editingGig.venue])] : 
            Object.keys(venueProfiles)
          }
          bandProfiles={bandProfiles}
          venueProfiles={venueProfiles}
        />
        {showFooter && <Footer />}
      </>
    );
  }

  return (
    <>
      <Header userProfile={profile} />
      <QuickActionsBar onAddGig={() => setShowAddGig(true)} />
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
                {profile.photoUrl ? (
                  <img src={profile.photoUrl} alt={profile.fullName} />
                ) : (
                  <div className="profile-emoji">
                    <span className="emoji-face">{profileEmoji}</span>
                  </div>
                )}
                <div className="edit-overlay">
                  {/* Optionally add edit icon */}
                </div>
              </motion.div>
              {/* Optionally add stats here */}
            </div>
            <div className="profile-info">
              <h1>{profile.fullName}</h1>
              <p className="profile-tagline">Musician</p>
              <div className="profile-meta">
                <span>{profile.address}</span>
              </div>
            </div>
          </div>
          {/* Profile Actions */}
              <div className="profile-actions">
                <motion.button 
                  className="btn-primary"
                  onClick={() => setShowAddGig(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
              Add a Gig
                </motion.button>
                {(!profile.musicGenres || !profile.about) && (
                  <motion.button 
                    className="btn-secondary"
                    onClick={() => navigate('/profile-completion')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Complete Profile
                  </motion.button>
                )}
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
                <h3>About</h3>
                <p>{profile.about}</p>
              </motion.div>
              {/* Music Section */}
              <motion.div 
                className="profile-section"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3>Music</h3>
                <div className="music-details">
                  <div className="detail-item">
                    <strong>Genres:</strong> {profile.musicGenres}
                  </div>
                  <div className="detail-item">
                    <strong>Bands:</strong> {profile.bands}
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
                    <span>{profile.email}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* My Gigs Section */}
              <motion.div 
              className="profile-section gigs-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3>My Gigs</h3>
              {userGigs.length > 0 ? (
                <div className="gigs-list">
                  {userGigs.map((gig) => (
                    <div key={gig._id} className="gig-card">
                      <div className="gig-header">
                        <h4>{gig.band} @ {gig.venue}</h4>
                        <span className="gig-date">{formatDate(gig.date)}</span>
                      </div>
                      <div className="gig-details">
                        <p>
                          <span>🕒 {formatTime(gig.time)}</span>
                        </p>
                        {gig.genre && (
                          <p>
                            <span>🎵 {gig.genre}</span>
                          </p>
                        )}
                        {gig.description && (
                          <p className="gig-description">{gig.description}</p>
                        )}
                      </div>
                      <div className="gig-footer">
                        <div className="gig-actions">
                          <motion.button
                            className="btn-secondary edit-gig-btn"
                            onClick={() => handleEditGig(gig)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Edit Gig
                          </motion.button>
                </div>
                        {(gig.ticketPrice || gig.ticketLink) && (
                          <div className="ticket-info">
                            {gig.ticketPrice && (
                              <span className="ticket-price">{gig.ticketPrice}</span>
                            )}
                            {gig.ticketLink && (
                              <a 
                                href={gig.ticketLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="ticket-link"
                              >
                                Get Tickets
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-gigs">
                  <p>You haven't added any gigs yet.</p>
                  <button 
                    className="btn-primary"
                    onClick={() => setShowAddGig(true)}
                  >
                    Add Your First Gig
                  </button>
                </div>
              )}
              </motion.div>
          </div>
        </motion.div>
      </div>
      {showFooter && <Footer />}
    </>
  );
} 