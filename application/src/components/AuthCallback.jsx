import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AuthCallback.css';

export default function AuthCallback() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // Check if this is a new user (you can use various indicators)
      const isNewUser = checkIfNewUser(user);
      
      if (isNewUser) {
        // Redirect to profile completion
        navigate('/profile-completion', { 
          state: { 
            user: user,
            isNewUser: true 
          } 
        });
      } else {
        // User already has a profile, redirect to main app
        navigate('/');
      }
    } else if (!isLoading && !isAuthenticated) {
      // Not authenticated, redirect to home
      navigate('/');
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  const checkIfNewUser = (user) => {
    // You can implement various checks here:
    // 1. Check if user has completed profile in your database
    // 2. Check user metadata from Auth0
    // 3. Check if this is their first login
    
    // For now, let's check if the user has a profile in localStorage
    const userProfile = localStorage.getItem(`user_profile_${user.sub}`);
    
    // If no profile exists, consider them a new user
    return !userProfile;
  };

  if (isLoading || isCheckingProfile) {
    return (
      <div className="auth-callback">
        <motion.div 
          className="loading-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-spinner"></div>
          <h2>Setting up your account...</h2>
          <p>Please wait while we prepare your profile.</p>
        </motion.div>
      </div>
    );
  }

  return null;
} 