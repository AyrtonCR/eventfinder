import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

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
  const dailyRef = useRef(null);
  const weeklyRef = useRef(null);
  const calendarRef = useRef(null);

  const [activeSection, setActiveSection] = useState('daily');
  const [showFooter, setShowFooter] = useState(false);
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  
  // Centralized gig management
  const [gigs, setGigs] = useState(() => {
    // Load gigs from localStorage on mount
    const savedGigs = localStorage.getItem('eventfinder_gigs');
    if (savedGigs) {
      try {
        const parsedGigs = JSON.parse(savedGigs);
        // Convert date strings back to Date objects
        return parsedGigs.map(gig => ({
          ...gig,
          date: new Date(gig.date)
        }));
      } catch (error) {
        console.error('Error loading gigs from localStorage:', error);
      }
    }
    
    // Default gigs if no saved data - use current dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return [
      {
        id: 1,
        time: '10:00',
        venue: 'Fat Eddies',
        artist: 'Away with the Crazies',
        genre: 'Indie Rock',
        details: 'Free entry • Garden Bar',
        date: today,
        dayOfWeek: today.getDay(),
        hour: 10,
        description: 'Free entry • Garden Bar',
        ticketPrice: 'Free',
        ticketLink: '',
      },
      { 
        id: 2, 
        time: '13:30', 
        venue: 'Dux Central', 
        artist: 'Jazz Quartet', 
        genre: 'Jazz', 
        details: '$10 on the door',
        date: today,
        dayOfWeek: today.getDay(),
        hour: 13,
        description: '$10 on the door',
        ticketPrice: '$10',
        ticketLink: '',
      },
      { 
        id: 3, 
        time: '20:00', 
        venue: 'Hagley Park', 
        artist: 'L.A.B. + Kora', 
        genre: 'Roots / Reggae', 
        details: 'All ages',
        date: tomorrow,
        dayOfWeek: tomorrow.getDay(),
        hour: 20,
        description: 'All ages',
        ticketPrice: '$25',
        ticketLink: 'https://tickets.example.com',
      },
      { 
        id: 4, 
        time: '18:00', 
        venue: 'The Darkroom', 
        artist: 'Noise Act', 
        genre: 'Experimental', 
        details: 'R18',
        date: nextWeek,
        dayOfWeek: nextWeek.getDay(),
        hour: 18,
        description: 'R18',
        ticketPrice: '$15',
        ticketLink: '',
      },
      // Calendar gigs - spread across next few weeks
      {
        id: 5,
        title: 'Shapeshifter @ Horncastle Arena',
        date: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from today
        time: '8 pm',
        genre: 'Drum‑and‑Bass',
        venue: 'Horncastle Arena',
        artist: 'Shapeshifter',
        details: 'Drum and Bass night',
        dayOfWeek: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).getDay(),
        hour: 20,
        ticketPrice: '$45',
        ticketLink: 'https://tickets.example.com',
      },
      {
        id: 6,
        title: 'L.A.B. – Hagley Park',
        date: new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from today
        time: '6 pm',
        genre: 'Roots / Reggae',
        venue: 'Hagley Park',
        artist: 'L.A.B.',
        details: 'Outdoor concert',
        dayOfWeek: new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000).getDay(),
        hour: 18,
        ticketPrice: '$35',
        ticketLink: 'https://tickets.example.com',
      },
      {
        id: 7,
        title: 'CSO: Beethoven & Beyond',
        date: new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000), // 4 weeks from today
        time: '7 pm',
        genre: 'Classical',
        venue: 'Christchurch Town Hall',
        artist: 'Christchurch Symphony Orchestra',
        details: 'Classical performance',
        dayOfWeek: new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000).getDay(),
        hour: 19,
        ticketPrice: '$60',
        ticketLink: 'https://tickets.example.com',
      },
    ];
  });
  
  // Save gigs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('eventfinder_gigs', JSON.stringify(gigs));
  }, [gigs]);

  // Listen for storage changes (when gigs are added from profile page)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'eventfinder_gigs') {
        try {
          const newGigs = JSON.parse(e.newValue || '[]');
          const updatedGigs = newGigs.map(gig => ({
            ...gig,
            date: new Date(gig.date)
          }));
          setGigs(updatedGigs);
        } catch (error) {
          console.error('Error updating gigs from storage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Function to refresh gigs from localStorage
  const refreshGigs = () => {
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
        console.error('Error refreshing gigs:', error);
      }
    }
  };

  // Refresh gigs when component mounts and when window gains focus
  useEffect(() => {
    refreshGigs();
    
    const handleFocus = () => {
      refreshGigs();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Dummy user profile data for demonstration
  const [userProfile] = useState({
    fullName: 'Alex Johnson',
    musicGenres: 'Rock, Jazz, Folk, Electronic',
    // Add other profile data as needed
  });

  // Function to add new gig
  const addGig = (gigData) => {
    const newGig = {
      id: Date.now(), // Simple ID generation
      ...gigData,
      date: new Date(gigData.date),
      dayOfWeek: new Date(gigData.date).getDay(),
      hour: parseInt(gigData.time.split(':')[0]),
      title: `${gigData.artist} @ ${gigData.venue}`,
    };
    setGigs([...gigs, newGig]);
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
    // Navigate to profile page to add gig
    window.location.href = '/profile';
  };

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