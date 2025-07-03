import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';      // bundled base styles
import { format } from 'date-fns';
import './MainCalendar.css';

/* ---------- dummy gig data ---------- */
const events = [
  {
    id: 1,
    title: 'Shapeshifter @ Horncastle Arena',
    date: new Date(2025, 7, 14), // 14 Aug 2025
    time: '8 pm',
    genre: 'Drum‑and‑Bass',
  },
  {
    id: 2,
    title: 'L.A.B. with Kora – Hagley Park',
    date: new Date(2025, 7, 23),
    time: '6 pm',
    genre: 'Roots / Reggae',
  },
  {
    id: 3,
    title: 'Christchurch Symphony: Beethoven & Beyond',
    date: new Date(2025, 7, 29),
    time: '7 pm',
    genre: 'Classical',
  },
];

export default function MainCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  /* Filter events for the selected day */
  const todaysGigs = events.filter(
    (ev) =>
      ev.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <section className="calendar-section">
      <div className="calendar-wrapper">
<Calendar
  onChange={setDate}
  value={date}
  tileClassName={({ date }) => {
    const day = date.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
    if (day === 5 || day === 6) {
      return 'highlighted-day';
    }
    return null;
  }}
/>


        <div className="gig-list">
          <h2>{format(selectedDate, 'd LLLL yyyy')}</h2>

          {todaysGigs.length ? (
            todaysGigs.map((gig) => (
              <article key={gig.id} className="gig-card">
                <h3>{gig.title}</h3>
                <p>
                  <strong>{gig.time}</strong> &nbsp;•&nbsp; {gig.genre}
                </p>
              </article>
            ))
          ) : (
            <p className="no-gigs">No gigs listed for this date.</p>
          )}
        </div>
      </div>
    </section>
  );
}
