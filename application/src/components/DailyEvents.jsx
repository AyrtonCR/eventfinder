import React from 'react';
import { motion } from 'framer-motion';
import './DailyEvents.css';

/* -------- helper: HH:mm → minutes since 0:00 for sort -------- */
const mins = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export default function DailyEvents({ dateLabel = 'Friday • 3 July 2025', onNextDay, onPreviousDay, onGoToToday, gigs = [] }) {
  // Use provided gigs or fall back to empty array
  const sorted = [...gigs].sort((a, b) => mins(a.time) - mins(b.time));

  return (
    <section className="daily">
      <div className="daily__heading-row">
        <div className="daily__navigation">
          {onPreviousDay && (
            <button className="daily__arrow daily__arrow--prev" onClick={onPreviousDay} title="Previous day">
              <span style={{fontSize: '2.4rem', fontWeight: 900, fontFamily: 'Montserrat, sans-serif', lineHeight: 1}}>&#8592;</span>
            </button>
          )}
          <h2 className="daily__heading">{dateLabel}</h2>
          {onNextDay && (
            <button className="daily__arrow daily__arrow--next" onClick={onNextDay} title="Next day">
              <span style={{fontSize: '2.4rem', fontWeight: 900, fontFamily: 'Montserrat, sans-serif', lineHeight: 1}}>&#8594;</span>
            </button>
          )}
        </div>
        {onGoToToday && (
          <button className="daily__today-btn" onClick={onGoToToday} title="Go to today">
            Today
          </button>
        )}
      </div>
      {sorted.length > 0 ? (
        sorted.map((g) => (
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
        ))
      ) : (
        <div className="daily__no-gigs">
          <p>No gigs scheduled for this date.</p>
        </div>
      )}
    </section>
  );
}
