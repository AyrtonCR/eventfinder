import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './QuickActionsBar.css';

export default function QuickActionsBar({
  onGenre = () => {},
  onAddGig = () => {},
  onCalendar = () => {},
  onToday = () => {},
  onTomorrow = () => {},
  onWeekly = () => {},
}) {
  return (
    <div className="quick-actions">
      <button className="pill" onClick={onGenre}>Genre</button>
      <button className="pill" onClick={onAddGig}>Add Gig</button>
      <button className="pill" onClick={onCalendar}>Calendar</button>
      <button className="pill" onClick={onToday}>Today</button>
      <button className="pill" onClick={onTomorrow}>Tomorrow</button>
      <button className="pill" onClick={onWeekly}>Weekly</button>
    </div>
  );
}
