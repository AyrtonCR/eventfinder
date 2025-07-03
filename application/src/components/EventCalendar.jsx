import React, { useState } from 'react';
import Calendar from 'react-calendar';     // ⇠ the little month grid
import { format } from 'date-fns';         // ⇠ pretty‑print dates
import 'react-calendar/dist/Calendar.css'; // ⇠ base styles
import './EventCalendar.css';              // ⇠ your dark theme overrides

/* ----- dummy gigs (replace with your API data later) ----- */
const gigs = [
  {
    id: 1,
    title: 'Shapeshifter @ Horncastle Arena',
    date: new Date(2025, 7, 14), // 14 Aug 2025
    time: '8 pm',
    genre: 'Drum‑and‑Bass',
  },
  {
    id: 2,
    title: 'L.A.B. – Hagley Park',
    date: new Date(2025, 7, 23),
    time: '6 pm',
    genre: 'Roots / Reggae',
  },
  {
    id: 3,
    title: 'CSO: Beethoven & Beyond',
    date: new Date(2025, 7, 29),
    time: '7 pm',
    genre: 'Classical',
  },
];

export default function EventCalendar() {
  const [chosenDate, setChosenDate] = useState(new Date());

  /* only gigs on the clicked day */
  const todaysGigs = gigs.filter(
    (g) => g.date.toDateString() === chosenDate.toDateString()
  );

  return (
    <section className="cal-section">
      <div className="cal-shell">
        <Calendar
          onChange={setChosenDate}
          value={chosenDate}
          className="main-cal"
  tileClassName={({ date }) => {
    const day = date.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
    if (day === 5 || day === 6) {
      return 'highlighted-day';
    }
    return null;
  }}
/>

        <div className="gig-pane">
          <h2>{format(chosenDate, 'd LLLL yyyy')}</h2>

          {todaysGigs.length ? (
            todaysGigs.map((g) => (
              <article key={g.id} className="gig-card">
                <h3>{g.title}</h3>
                <p>
                  <strong>{g.time}</strong> &nbsp;•&nbsp; {g.genre}
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
