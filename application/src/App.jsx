import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// src/App.jsx
import Header from './components/Header';
import EventCalendar from "./components/EventCalendar";
import DailyEvents from './components/DailyEvents';
import QuickActions from './components/QuickActions';
import QuickActionsBar from './components/QuickActionsBar';
function App() {
  return (
    <>
      <Header />

      <QuickActionsBar
        onGenre={() => console.log('Genre')}
        onAddGig={() => console.log('Add gig')}
        onCalendar={() => console.log('Calendar')}
        onToday={() => console.log('Today')}
        onTomorrow={() => console.log('Tomorrow')}
        onNextDay={() => console.log('Next day')}
      />
            <DailyEvents />
      <EventCalendar />   

      {/* rest of your routes / pages */}
    </>
  );
}
export default App;