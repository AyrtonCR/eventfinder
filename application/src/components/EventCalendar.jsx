import React, { useState } from 'react';
import Calendar from 'react-calendar';     // ⇠ the little month grid
import { format } from 'date-fns';         // ⇠ pretty‑print dates
import 'react-calendar/dist/Calendar.css'; // ⇠ base styles
import './EventCalendar.css';              // ⇠ your dark theme overrides

export default function EventCalendar({ gigs = [] }) {
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
                <h3>{g.title || `${g.artist} @ ${g.venue}`}</h3>
                <p>
                  <strong>{g.time}</strong> &nbsp;•&nbsp; {g.genre}
                </p>
                {g.venue && <p><strong>Venue:</strong> {g.venue}</p>}
                {g.details && <p>{g.details}</p>}
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
