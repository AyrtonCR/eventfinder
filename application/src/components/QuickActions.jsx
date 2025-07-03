import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './QuickActionsBar.css';

export default function QuickActionsBar({
  onGenre = () => {},
  onAddGig = () => {},
  onCalendar = () => {},
  onToday = () => {},
  onTomorrow = () => {},
  onNextDay = () => {},
}) {
  return (
    <div className="quick-actions">
      <button className="pill" onClick={onGenre}>Genre</button>
      <button className="pill" onClick={onAddGig}>Add Gig</button>
      <button className="pill" onClick={onCalendar}>Calendar</button>
      <button className="pill" onClick={onToday}>Today</button>
      <button className="pill" onClick={onTomorrow}>Tomorrow</button>
      <button className="pill pill--arrow" onClick={onNextDay}>
        <FiArrowRight size={18} />
      </button>
    </div>
  );
}
