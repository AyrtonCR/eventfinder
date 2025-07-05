import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import './GenreDropdown.css';

const genres = [
  'All',
  'Rock',
  'Pop',
  'Electronic',
  'Hip Hop',
  'Jazz',
  'Blues',
  'Country',
  'Folk',
  'R&B',
  'Soul',
  'Reggae',
  'Punk',
  'Metal',
  'Indie',
  'Alternative',
  'Classical',
  'Funk',
  'Disco',
  'Ambient'
];

export default function GenreDropdown({ onGenreChange = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState(new Set(['All']));
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGenreToggle = (genre) => {
    const newSelectedGenres = new Set(selectedGenres);
    
    if (genre === 'All') {
      if (newSelectedGenres.has('All')) {
        // If "All" is selected, deselect everything
        newSelectedGenres.clear();
      } else {
        // If "All" is not selected, select everything
        genres.forEach(g => newSelectedGenres.add(g));
      }
    } else {
      // Handle individual genre selection
      if (newSelectedGenres.has(genre)) {
        newSelectedGenres.delete(genre);
        // If we're deselecting a genre, also deselect "All"
        newSelectedGenres.delete('All');
      } else {
        newSelectedGenres.add(genre);
        // If all individual genres are selected, also select "All"
        const individualGenres = genres.filter(g => g !== 'All');
        const allIndividualSelected = individualGenres.every(g => newSelectedGenres.has(g));
        if (allIndividualSelected) {
          newSelectedGenres.add('All');
        }
      }
    }
    
    setSelectedGenres(newSelectedGenres);
    onGenreChange(Array.from(newSelectedGenres));
  };

  const getDisplayText = () => {
    if (selectedGenres.has('All') || selectedGenres.size === 0) {
      return 'All Genres';
    } else if (selectedGenres.size === 1) {
      return Array.from(selectedGenres)[0];
    } else {
      return `${selectedGenres.size} Genres`;
    }
  };

  return (
    <div className="genre-dropdown" ref={dropdownRef}>
      <motion.button
        className="genre-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{getDisplayText()}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dropdown-menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {genres.map((genre) => (
              <motion.button
                key={genre}
                className={`dropdown-item ${selectedGenres.has(genre) ? 'selected' : ''}`}
                onClick={() => handleGenreToggle(genre)}
                whileHover={{ backgroundColor: 'rgba(255, 179, 71, 0.1)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="checkbox">
                  {selectedGenres.has(genre) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiCheck />
                    </motion.div>
                  )}
                </div>
                <span>{genre}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 