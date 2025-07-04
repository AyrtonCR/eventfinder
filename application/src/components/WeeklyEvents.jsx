import React from 'react';
import './WeeklyEvents.css';

const days = ['Mon 29', 'Tues 30', 'Wed 1st', 'Thur 2th', 'Fri 3rd', 'Sat 4th', 'Sun 5th'];
const times = ['10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am', '1am', '2am'];

// Example event data: { day: 1, time: 1, label: '2', color: '#c9a58e' }
const events = [
  { day: 1, time: 2, label: '2', color: '#c9a58e' },
  { day: 3, time: 4, label: '1', color: '#e9cba7' },
  { day: 2, time: 7, label: '2', color: '#f7e7b6' },
  { day: 5, time: 6, label: '3', color: '#e9a7a7' },
  { day: 1, time: 8, label: '1', color: '#e9cba7' },
  { day: 1, time: 9, label: '1', color: '#e9cba7' },
  { day: 7, time: 10, label: '7', color: '#a7b7e9' },
];

export default function WeeklyEvents() {
  return (
    <section className="weekly-view">
      <div className="weekly-header-row">
        <button className="weekly-arrow">&#8592; Last week</button>
        <span className="weekly-title">June 29th - July 5th</span>
        <button className="weekly-arrow">Next week &#8594;</button>
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
                    <div className="weekly-event" style={{ background: event.color }}>{event.label}</div>
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
