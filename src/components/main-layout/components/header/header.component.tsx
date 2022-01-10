import { Switch } from '@components/form-elements/switch/switch.component';
import { useSettingsPanelStateContext } from '@contexts';
import {
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import {
  HTMLAttributes,
  VoidFunctionComponent,
} from 'react';

import { useDarkMode } from '../../../../hooks/dark-mode/dark-mode.hook';

import styles from './header.module.css';

export const Header: VoidFunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...props
}) => {
  const { openSettingsModal, isSettingsOpen } = useSettingsPanelStateContext();

  const { isDarkMode, setIsDarkMode } = useDarkMode();
  return (
    <header
      className={`${styles.header} ${className}`}
      {...props}
    >
      <h1 className={styles.siteTitle}>Focus Time</h1>

      <div className={styles.buttonContainer}>
        <div className="flex gap-1.5 justify-center items-center">
          <LightMode />
          <Switch
            defaultValue={!isDarkMode}
            id="darkModeSwitch"
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
          <DarkMode />
        </div>

        <button
          aria-pressed={isSettingsOpen}
          className="btn btn-secondary btn-sm"
          title="Settings"
          type="button"
          onClick={openSettingsModal}
        >
          Settings
        </button>
      </div>
    </header>
  );
};
