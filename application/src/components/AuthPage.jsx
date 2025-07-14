import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import QuickActionsBar from './QuickActionsBar';
import Footer from './Footer';
import ProfileCompletion from './ProfileCompletion';
import './AuthPage.css';

export default function AuthPage() {
  const { loginWithRedirect } = useAuth0();
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [showFooter, setShowFooter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      // Show footer if user is within 40px of bottom
      setShowFooter(scrollY + windowHeight >= docHeight - 40);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Simulate account creation
    console.log('Account created successfully');
    setShowSignup(false);
    setShowProfileCompletion(true);
  };

  const handleProfileComplete = (data) => {
    console.log('Profile completed:', data);
    // Save the profile data (in a real app, this would go to backend)
    setProfileData(data);
    // Navigate to the standalone profile page
    navigate('/profile');
  };

  const handleBackToSignup = () => {
    setShowProfileCompletion(false);
    setShowSignup(true);
  };

  if (showProfileCompletion) {
    return (
      <>
        <Header userProfile={profileData} />
        <QuickActionsBar onAddGig={() => loginWithRedirect()} />
        <ProfileCompletion 
          onComplete={handleProfileComplete}
          onBack={handleBackToSignup}
        />
        {showFooter && <Footer />}
      </>
    );
  }

  return (
    <>
      <Header userProfile={profileData} />
      <QuickActionsBar onAddGig={() => loginWithRedirect()} />
      <div className="auth-page">
        <div className="auth-content">
          <h1>Welcome to Eventfinder</h1>
          <p className="auth-desc">
            Sign in to manage your gigs, discover new events, and connect with the Christchurch music community.
          </p>
          <div className="auth-buttons">
            <button className="auth-btn login" onClick={() => setShowLogin(true)}>Log In</button>
            <button className="auth-btn signup" onClick={() => setShowSignup(true)}>Sign Up</button>
          </div>
        </div>
      </div>
      {showSignup && (
        <div className="modal-backdrop" onClick={() => setShowSignup(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSignup(false)}>&times;</button>
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSignupSubmit}>
              <label>
                Name
                <input type="text" placeholder="Jane Doe" defaultValue="Jane Doe" />
              </label>
              <label>
                Email
                <input type="email" placeholder="jane@email.com" defaultValue="jane@email.com" />
              </label>
              <label>
                Password
                <input type="password" placeholder="••••••••" defaultValue="password123" />
              </label>
              <button type="submit" className="auth-btn login" style={{ marginTop: '1.2rem' }}>Create Account</button>
            </form>
          </div>
        </div>
      )}
      {showLogin && (
        <div className="modal-backdrop" onClick={() => setShowLogin(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLogin(false)}>&times;</button>
            <h2>Log In</h2>
            <form className="signup-form">
              <label>
                Username or Email
                <input type="text" placeholder="jane@email.com" defaultValue="jane@email.com" />
              </label>
              <label>
                Password
                <input type="password" placeholder="••••••••" defaultValue="password123" />
              </label>
              <button type="submit" className="auth-btn login" style={{ marginTop: '1.2rem' }}>Sign In</button>
            </form>
          </div>
        </div>
      )}
      {showFooter && <Footer />}
    </>
  );
} 