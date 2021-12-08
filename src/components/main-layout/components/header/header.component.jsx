import React from 'react';

import styles from './header.module.css';
import { useSettingsPanelContext } from '../../../settings-panel/contexts';

export const Header = ({ className }) => {
  const { openSettingsModal } = useSettingsPanelContext();
  return (
    <header className={`${styles.header} ${className}`}>
      <p className={styles.siteTitle}>pomodoro</p>
      <button
        className={styles.settingsButton}
        type="button"
        onClick={openSettingsModal}
      >
        Settings
      </button>
    </header>
  );
};
