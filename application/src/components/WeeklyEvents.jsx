import React from 'react';
import './WeeklyEvents.css';

const times = ['10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am', '1am', '2am'];

export default function WeeklyEvents({ gigs = [], weekDates = [], onPreviousWeek, onNextWeek, onGoToToday }) {
  // Generate day labels from weekDates
  const days = weekDates.map(date => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = date.getDate();
    return `${dayName} ${dayNumber}`;
  });

  // Convert gigs to weekly grid format
  const events = gigs.map(gig => {
    const day = gig.dayOfWeek || 0; // 0 = Sunday, 1 = Monday, etc.
    const hour = gig.hour || 0;
    const timeIndex = hour - 10; // Convert hour to time index (10am = 0, 11am = 1, etc.)
    
    return {
      day: day === 0 ? 7 : day, // Convert Sunday (0) to 7 for our grid
      time: timeIndex + 1, // +1 because our time array is 1-indexed
      label: '1', // Show number of gigs
      color: getGenreColor(gig.genre),
      gig: gig // Store the full gig data
    };
  });

  // Helper function to get color based on genre
  function getGenreColor(genre) {
    const colors = {
      'Rock': '#e9a7a7',
      'Jazz': '#a7b7e9',
      'Folk': '#a7e9a7',
      'Electronic': '#e9a7e9',
      'Classical': '#e9e9a7',
      'Blues': '#a7e9e9',
      'Reggae': '#e9cba7',
      'Indie Rock': '#c9a58e',
      'Experimental': '#f7e7b6',
      'Roots / Reggae': '#e9cba7',
      'Drum‑and‑Bass': '#a7e9d7',
    };
    return colors[genre] || '#cccccc';
  }

  // Generate week title from weekDates
  const getWeekTitle = () => {
    if (weekDates.length === 0) return 'This Week';
    const startDate = weekDates[0];
    const endDate = weekDates[6];
    const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const year = startDate.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
  };

  return (
    <section className="weekly-view">
      <div className="weekly-header-row">
        <button className="weekly-arrow" onClick={onPreviousWeek} disabled={!onPreviousWeek}>
          &#8592; Last week
        </button>
        <span className="weekly-title">{getWeekTitle()}</span>
        <button className="weekly-arrow" onClick={onNextWeek} disabled={!onNextWeek}>
          Next week &#8594;
        </button>
        {onGoToToday && (
          <button className="weekly-today-btn" onClick={onGoToToday}>
            Today
          </button>
        )}
      </div>
      <div className="weekly-grid">
        <div className="weekly-grid-header" />
        {days.map((day, i) => (
          <div className="weekly-grid-header" key={day}>{day}</div>
        ))}
        {times.map((time, rowIdx) => (
          <React.Fragment key={time}>
            <div className="weekly-grid-time">{time}</div>
            {days.map((_, colIdx) => {
              const event = events.find(e => e.day === colIdx + 1 && e.time === rowIdx + 1);
              return (
                <div className="weekly-grid-cell" key={colIdx + '-' + rowIdx}>
                  {event && (
                    <div 
                      className="weekly-event" 
                      style={{ background: event.color }}
                      title={`${event.gig.artist} @ ${event.gig.venue}`}
                    >
                      {event.label}
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
