import React from 'react';
import { motion } from 'framer-motion';
import './DailyEvents.css';

/* -------- dummy data (sorted below) -------- */
const gigs = [
  {
    id: 1,
    time: '10:00',
    venue: 'Fat Eddies',
    artist: 'Away with the Crazies',
    genre: 'Indie Rock',
    details: 'Free entry • Garden Bar',
  },
  { id: 2, time: '13:30', venue: 'Dux Central', artist: 'Jazz Quartet', genre: 'Jazz', details: '$10 on the door' },
  { id: 3, time: '20:00', venue: 'Hagley Park', artist: 'L.A.B. + Kora', genre: 'Roots / Reggae', details: 'All ages' },
  { id: 4, time: '18:00', venue: 'The Darkroom', artist: 'Noise Act', genre: 'Experimental', details: 'R18' },
];

/* -------- helper: HH:mm → minutes since 0:00 for sort -------- */
const mins = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export default function DailyEvents({ dateLabel = 'Friday • 3 July 2025', onNextDay }) {
  const sorted = [...gigs].sort((a, b) => mins(a.time) - mins(b.time));

  return (
    <section className="daily">
      <div className="daily__heading-row">
        <h2 className="daily__heading">{dateLabel}</h2>
        <button className="daily__arrow" onClick={onNextDay} title="Next day">
          <span style={{fontSize: '2.4rem', fontWeight: 900, fontFamily: 'Montserrat, sans-serif', lineHeight: 1}}>&#8594;</span>
        </button>
      </div>
      {sorted.map((g) => (
        <motion.article
          key={g.id}
          className="daily__gig"
          whileHover={{
            scale: 1.035,
            transition: {
              type: 'spring', stiffness: 200, damping: 18, duration: 0.25
            }
          }}
        >
          <div className="daily__gig-inner">
            <div className="daily__time">{g.time}</div>
            <div className="daily__info">
              <h3>{g.venue}</h3>
              <p>{g.artist}</p>
              <p className="daily__meta">
                {g.genre} &nbsp;•&nbsp; {g.details}
              </p>
            </div>
          </div>
        </motion.article>
      ))}
    </section>
  );
}
