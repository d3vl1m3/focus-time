import { useSettingsPanelStateContext } from '@contexts';
import {
  HTMLAttributes,
  VoidFunctionComponent,
} from 'react';

import styles from './header.module.css';

export const Header: VoidFunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...props
}) => {
  const { openSettingsModal } = useSettingsPanelStateContext();
  return (
    <header
      className={`${styles.header} ${className}`}
      {...props}
    >
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
