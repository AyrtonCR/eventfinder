import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import GenreDropdown from './GenreDropdown';
import './QuickActionsBar.css';

export default function QuickActionsBar({
  onGenreChange = () => {},
  onAddGig = () => {},
  onCalendar = () => {},
  onToday = () => {},
  onTomorrow = () => {},
  onWeekly = () => {},
}) {
  return (
    <div className="quick-actions">
      <GenreDropdown onGenreChange={onGenreChange} />
      <button className="pill" onClick={onAddGig}>Add Gig</button>
      <button className="pill" onClick={onCalendar}>Calendar</button>
      <button className="pill" onClick={onToday}>Today</button>
      <button className="pill" onClick={onTomorrow}>Tomorrow</button>
      <button className="pill" onClick={onWeekly}>Weekly</button>
    </div>
  );
}
