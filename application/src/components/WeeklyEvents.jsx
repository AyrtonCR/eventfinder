import React, { useState } from 'react';
import './WeeklyEvents.css';

/* ---------- dummy data ---------- */
const gigs = [
  /* date (YYYY-MM-DD), 24‑h time */
  { id: 1, date: '2025-06-30', time: '20:00' },
  { id: 2, date: '2025-07-01', time: '11:00' },
  { id: 3, date: '2025-07-03', time: '13:00' },
  { id: 4, date: '2025-07-03', time: '15:00' },
  { id: 5, date: '2025-07-03', time: '15:30' },
  { id: 6, date: '2025-07-04', time: '16:00' },
  { id: 7, date: '2025-07-05', time: '19:00' },
  { id: 8, date: '2025-07-02', time: '18:00' },
];

/* ---------- helpers ---------- */
const hours = Array.from({ length: 11 }, (_, i) => i + 10); // 10 → 20 (10 am–8 pm)
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const fmt = (d) => d.toISOString().slice(0, 10); // yyyy-mm-dd
const monthLabel = (start) =>
  `${start.toLocaleString('default', { month: 'long' })} ${start.getDate()} – ${
    addDays(start, 6).toLocaleString('default', { month: 'long', day: 'numeric' })
  }`;

export default function WeeklyEvents({ weekStart = new Date('2025-06-29') /* Sunday */ }) {
  const [start, setStart] = useState(weekStart); // can be changed with arrows

  const days = [...Array(7)].map((_, i) => addDays(start, i));
  const counts = {};
  gigs.forEach((g) => {
    const key = `${g.date}-${g.time.slice(0, 2)}`;
    counts[key] = (counts[key] || 0) + 1;
  });

  return (
    <section className="week">
      <header className="week__header">
        <button onClick={() => setStart(addDays(start, -7))}>&larr; Last&nbsp;week</button>
        <h2>{monthLabel(start)}</h2>
        <button onClick={() => setStart(addDays(start, 7))}>Next&nbsp;week &rarr;</button>
      </header>

      <div className="week__grid">
        {/* column headers */}
        <div className="week__grid--sticky" />
        {days.map((d) => (
          <div key={d} className="week__dow">
            {d.toLocaleDateString('en-NZ', { weekday: 'short' })}{' '}
            <span className="week__date">{d.getDate()}</span>
          </div>
        ))}

        {/* rows */}
        {hours.map((h) => (
          <React.Fragment key={h}>
            <div className="week__hour">{h <= 12 ? `${h}am` : `${h - 12}pm`}</div>
            {days.map((d) => {
              const key = `${fmt(d)}-${String(h).padStart(2, '0')}`;
              const c = counts[key] || 0;
              return (
                <div
                  key={key}
                  className={`week__cell${c ? ' has' : ''}`}
                  data-count={c || ''}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
