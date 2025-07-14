import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

// src/App.jsx
import Header from './components/Header';
import EventCalendar from "./components/EventCalendar";
import DailyEvents from './components/DailyEvents';
import QuickActions from './components/QuickActions';
import QuickActionsBar from './components/QuickActionsBar';
import WeeklyEvents from './components/WeeklyEvents';
import ScrollButton from './components/ScrollButton';
import Footer from './components/Footer';

function App() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const dailyRef = useRef(null);
  const weeklyRef = useRef(null);
  const calendarRef = useRef(null);

  const [activeSection, setActiveSection] = useState('daily');
  const [showFooter, setShowFooter] = useState(false);
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  
  // Centralized gig management
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch gigs from database on component mount
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:4000/api/gigs');
        if (!response.ok) {
          throw new Error('Failed to fetch gigs');
        }
        const data = await response.json();
        
        // Transform the data to match the expected format
        const transformedGigs = data.map(gig => ({
          ...gig,
          id: gig._id,
          artist: gig.band,
          date: new Date(gig.date),
          dayOfWeek: new Date(gig.date).getDay(),
          hour: parseInt(gig.time.split(':')[0]),
          details: gig.description || '',
          title: `${gig.band} @ ${gig.venue}`
        }));
        
        setGigs(transformedGigs);
      } catch (error) {
        console.error('Error fetching gigs:', error);
        // Fallback to localStorage if API fails
        const savedGigs = localStorage.getItem('eventfinder_gigs');
        if (savedGigs) {
          try {
            const parsedGigs = JSON.parse(savedGigs);
            const updatedGigs = parsedGigs.map(gig => ({
              ...gig,
              date: new Date(gig.date)
            }));
            setGigs(updatedGigs);
          } catch (error) {
            console.error('Error loading gigs from localStorage:', error);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  // Save gigs to localStorage as backup
  useEffect(() => {
    if (gigs.length > 0) {
      localStorage.setItem('eventfinder_gigs', JSON.stringify(gigs));
    }
  }, [gigs]);

  // Dummy user profile data for demonstration
  const [userProfile] = useState({
    fullName: 'Alex Johnson',
    musicGenres: 'Rock, Jazz, Folk, Electronic',
    // Add other profile data as needed
  });

  // Function to add new gig
  const addGig = (gigData) => {
    // Transform the gig data to match the expected format
    const newGig = {
      ...gigData,
      id: gigData.id || gigData._id,
      artist: gigData.artist || gigData.band,
      date: new Date(gigData.date),
      dayOfWeek: new Date(gigData.date).getDay(),
      hour: parseInt(gigData.time.split(':')[0]),
      title: `${gigData.artist || gigData.band} @ ${gigData.venue}`,
    };
    setGigs(prevGigs => [...prevGigs, newGig]);
  };

  // Get gigs for the current viewing date (daily view)
  const getTodayGigs = () => {
    return gigs.filter(gig => 
      gig.date.toDateString() === currentViewDate.toDateString()
    );
  };

  // Get gigs for the current viewing week (weekly view)
  const getWeekGigs = () => {
    const startOfWeek = new Date(currentViewDate);
    startOfWeek.setDate(currentViewDate.getDate() - currentViewDate.getDay() + 1); // Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
    
    return gigs.filter(gig => 
      gig.date >= startOfWeek && gig.date <= endOfWeek
    );
  };

  // Get current week dates for display
  const getCurrentWeekDates = () => {
    const startOfWeek = new Date(currentViewDate);
    startOfWeek.setDate(currentViewDate.getDate() - currentViewDate.getDay() + 1); // Monday
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    
    return weekDates;
  };

  // Get current viewing date for display
  const getTodayDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return currentViewDate.toLocaleDateString('en-US', options);
  };

  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Intersection Observer to track which section is in view
  useEffect(() => {
    const sections = [
      { ref: dailyRef, name: 'daily' },
      { ref: weeklyRef, name: 'weekly' },
      { ref: calendarRef, name: 'calendar' },
    ];
    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const mostVisible = sections.find(s => s.ref.current === visible[0].target);
          if (mostVisible) setActiveSection(mostVisible.name);
        }
      },
      { threshold: 0.5 }
    );
    sections.forEach(s => {
      if (s.ref.current) observer.observe(s.ref.current);
    });
    return () => observer.disconnect();
  }, []);

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

  const handleNextDay = () => {
    const nextDay = new Date(currentViewDate);
    nextDay.setDate(currentViewDate.getDate() + 1);
    setCurrentViewDate(nextDay);
  };

  const handlePreviousDay = () => {
    const prevDay = new Date(currentViewDate);
    prevDay.setDate(currentViewDate.getDate() - 1);
    setCurrentViewDate(prevDay);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentViewDate);
    nextWeek.setDate(currentViewDate.getDate() + 7);
    setCurrentViewDate(nextWeek);
  };

  const handlePreviousWeek = () => {
    const prevWeek = new Date(currentViewDate);
    prevWeek.setDate(currentViewDate.getDate() - 7);
    setCurrentViewDate(prevWeek);
  };

  const handleGoToToday = () => {
    setCurrentViewDate(new Date());
  };

  const handleGenreChange = (selectedGenres) => {
    console.log('Selected genres:', selectedGenres);
    // Here you can add logic to filter events by the selected genres
    // selectedGenres is now an array of genre strings
  };

  const handleAddGig = () => {
    if (isAuthenticated) {
      // User is authenticated, navigate to profile page to add gig
      navigate('/profile');
    } else {
      // User is not authenticated, redirect to login
      loginWithRedirect();
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}>
        <div style={{ textAlign: 'center', color: '#f3f3f7' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(255, 179, 71, 0.2)',
            borderTop: '3px solid #ffb347',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header userProfile={userProfile} />
      <QuickActionsBar
        onGenreChange={handleGenreChange}
        onAddGig={handleAddGig}
        onCalendar={() => scrollToRef(calendarRef)}
        onToday={() => scrollToRef(dailyRef)}
        onTomorrow={() => console.log('Tomorrow')}
        onWeekly={() => scrollToRef(weeklyRef)}
      />
      <div className="main-content-container">
        <div ref={dailyRef} className="daily-section" style={{ position: 'relative' }}>
          <DailyEvents 
            onNextDay={handleNextDay} 
            onPreviousDay={handlePreviousDay}
            onGoToToday={handleGoToToday}
            gigs={getTodayGigs()} 
            dateLabel={getTodayDate()} 
          />
          <div className="down-arrow-desktop">
            <ScrollButton direction="down" onClick={() => scrollToRef(weeklyRef)} label="Scroll to weekly" />
          </div>
        </div>
        <div ref={weeklyRef} className="weekly-section">
          {/* Fixed up arrow at top if weekly is active */}
          {activeSection === 'weekly' && (
            <ScrollButton direction="up" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} label="Scroll to top" style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 2000 }} />
          )}
          <WeeklyEvents 
            gigs={getWeekGigs()} 
            weekDates={getCurrentWeekDates()} 
            onPreviousWeek={handlePreviousWeek}
            onNextWeek={handleNextWeek}
            onGoToToday={handleGoToToday}
          />
          {/* Fixed down arrow at bottom if weekly is active */}
          {activeSection === 'weekly' && (
            <ScrollButton direction="down" onClick={() => scrollToRef(calendarRef)} label="Scroll to calendar" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 2000 }} />
          )}
        </div>
        <div ref={calendarRef} className="calendar-section">
          <ScrollButton direction="up" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} label="Scroll to top" />
          <EventCalendar gigs={gigs} />
        </div>
      </div>
      {showFooter && <Footer />}
    </>
  );
}
export default App;