import React from 'react';

import styles from './header.module.css';

export const Header = () => (
  <header className={styles.header}>
    <p className={styles.siteTitle}>pomodoro</p>
    <button
      className={styles.settingsButton}
      type="button"
    >
      Settings
    </button>
  </header>
);
