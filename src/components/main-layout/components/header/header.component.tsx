import styles from './header.module.css';
import {useSettingsPanelContext} from '../../../settings-panel/contexts';
import {HTMLAttributes, VoidFunctionComponent} from 'react';

export const Header: VoidFunctionComponent<HTMLAttributes<HTMLDivElement>> = ({className = '', ...props}) => {
  const {openSettingsModal} = useSettingsPanelContext();
  return (
    <header className={`${styles.header} ${className}`} {...props}>
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
