import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import QuickActionsBar from './QuickActionsBar';
import Footer from './Footer';
import './AuthPage.css';

export default function AboutPage() {
  const { loginWithRedirect } = useAuth0();
  const [showFooter, setShowFooter] = useState(false);

  // Dummy user profile data for demonstration
  const userProfile = {
    fullName: 'Alex Johnson',
    musicGenres: 'Rock, Jazz, Folk, Electronic',
  };

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

  return (
    <>
      <Header userProfile={userProfile} />
      <QuickActionsBar onAddGig={() => loginWithRedirect()} />
      <div className="auth-page">
        <div className="auth-content">
          <h1>About Christchurch Event Co.</h1>
          <p className="auth-desc">
            Christchurch Event Co. is a leading event management company based in Christchurch, New Zealand. We specialize in organizing live music gigs, festivals, and community events that bring people together and celebrate the vibrant culture of our city.<br /><br />
            With over a decade of experience, our passionate team works with local artists, venues, and sponsors to create unforgettable experiences for audiences of all ages. Whether you're a performer, a venue owner, or an event-goer, we're here to help you connect, discover, and enjoy the best of Christchurch's live scene.
          </p>
        </div>
      </div>
      {showFooter && <Footer />}
    </>
  );
} 