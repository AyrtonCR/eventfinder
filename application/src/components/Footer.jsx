import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  return (
    <motion.footer
      className="app-footer"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 60, damping: 18, duration: 0.7 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="footer-content">
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: info@chcheventco.nz</p>
          <p>Phone: +64 3 123 4567</p>
        </div>
        <div className="footer-socials">
          <h3>Follow Us</h3>
          <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
      <div className="footer-bottom">&copy; 2024 Christchurch Event Co. All rights reserved.</div>
    </motion.footer>
  );
} 