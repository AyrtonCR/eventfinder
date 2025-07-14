import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import Header from './Header';
import QuickActionsBar from './QuickActionsBar';
import Footer from './Footer';
import ProfileCompletion from './ProfileCompletion';
import './ProfileCompletionPage.css';

export default function ProfileCompletionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [showFooter, setShowFooter] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleProfileComplete = async (data) => {
    setLoading(true);
    setError(null);
    try {
      if (user) {
        const token = await getAccessTokenSilently();
        // Prepare profile data
        const userProfile = {
          ...data,
          email: user.email,
          name: user.name,
        };
        // Send to backend
        const response = await fetch('http://localhost:4000/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(userProfile)
        });
        if (!response.ok) throw new Error('Failed to save profile');
        const savedProfile = await response.json();
        // Save to localStorage for quick access
        localStorage.setItem(`user_profile_${user.sub}`, JSON.stringify(savedProfile));
        localStorage.setItem('eventfinder_user_profile', JSON.stringify(savedProfile));
        setProfileData(savedProfile);
        navigate('/profile');
      }
    } catch (err) {
      setError('Failed to save profile. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Show loading while Auth0 is initializing or saving
  if (isLoading || loading) {
    return (
      <div className="profile-completion-page">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  // Show error if not authenticated
  if (!isAuthenticated) {
    return null; // Will redirect to home
  }

  return (
    <div className="profile-completion-page">
      <Header userProfile={profileData} />
      <QuickActionsBar onAddGig={() => navigate('/profile')} />
      <motion.div 
        className="completion-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="welcome-header">
          <h1>Welcome to Eventfinder!</h1>
          <p>Let's set up your profile to get you started with the Christchurch music community.</p>
        </div>
        {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
        <ProfileCompletion 
          onComplete={handleProfileComplete}
          onBack={handleBackToHome}
          user={user}
        />
      </motion.div>
      {showFooter && <Footer />}
    </div>
  );
} 