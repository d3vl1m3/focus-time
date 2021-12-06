import React from 'react';

import styles from './header.module.css';

export const Header = ({ className }) => (
  <header className={`${styles.header} ${className}`}>
    <p className={styles.siteTitle}>pomodoro</p>
    <button
      className={styles.settingsButton}
      type="button"
    >
      Settings
    </button>
  </header>
);
