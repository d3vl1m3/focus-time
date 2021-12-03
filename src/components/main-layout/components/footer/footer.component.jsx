import React from 'react';

import styles from './footer.module.css';

export const Footer = ({ className = '' }) => (
  <footer className={`${styles.footer} ${className}`}>
    <p>A D3VL1M3 project</p>
  </footer>
);
