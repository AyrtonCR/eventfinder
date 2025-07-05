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
  
  // Dummy user profile data for demonstration
  const [userProfile] = useState({
    fullName: 'Alex Johnson',
    musicGenres: 'Rock, Jazz, Folk, Electronic',
    // Add other profile data as needed
  });

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
    console.log('Next day');
  };

  const handleGenreChange = (selectedGenres) => {
    console.log('Selected genres:', selectedGenres);
    // Here you can add logic to filter events by the selected genres
    // selectedGenres is now an array of genre strings
  };

  return (
    <>
      <Header userProfile={userProfile} />
      <QuickActionsBar
        onGenreChange={handleGenreChange}
        onAddGig={() => console.log('Add gig')}
        onCalendar={() => scrollToRef(calendarRef)}
        onToday={() => scrollToRef(dailyRef)}
        onTomorrow={() => console.log('Tomorrow')}
        onWeekly={() => scrollToRef(weeklyRef)}
      />
      <div ref={dailyRef} className="daily-section" style={{ position: 'relative' }}>
        <DailyEvents onNextDay={handleNextDay} />
        <div className="down-arrow-desktop">
          <ScrollButton direction="down" onClick={() => scrollToRef(weeklyRef)} label="Scroll to weekly" />
        </div>
      </div>
      <div ref={weeklyRef} className="weekly-section">
        {/* Fixed up arrow at top if weekly is active */}
        {activeSection === 'weekly' && (
          <ScrollButton direction="up" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} label="Scroll to top" style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 2000 }} />
        )}
        <WeeklyEvents />
        {/* Fixed down arrow at bottom if weekly is active */}
        {activeSection === 'weekly' && (
          <ScrollButton direction="down" onClick={() => scrollToRef(calendarRef)} label="Scroll to calendar" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 2000 }} />
        )}
      </div>
      <div ref={calendarRef} className="calendar-section">
        <ScrollButton direction="up" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} label="Scroll to top" />
        <EventCalendar />
      </div>
      {showFooter && <Footer />}
    </>
  );
}
export default App;