import { SwitchWithIcons } from "@components/form-elements/switch-with-icons/switch-with-icons.component";
import { useSettingsPanelStateContext, useSettingsStateContext } from '@contexts';
import {
  DarkMode,
  LightMode,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import {
  HTMLAttributes,
  VoidFunctionComponent,
} from 'react';

import styles from './header.module.css';

export const Header: VoidFunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...props
}) => {
  const { openSettingsModal, isSettingsOpen } = useSettingsPanelStateContext();
  const {
    isUseDarkMode,
    isUseSound,
    setIsUseDarkMode,
    setIsUseSound,
  } = useSettingsStateContext();

  return (
    <header
      className={`${styles.header} ${className}`}
      {...props}
    >
      <h1 className={styles.siteTitle}>Focus Time</h1>

      <div className={styles.buttonContainer}>

        {isUseDarkMode !== null && (
          <SwitchWithIcons
            OffIcon={LightMode}
            OnIcon={DarkMode}
            defaultValue={isUseDarkMode}
            id="isUseDarkMode"
            onChange={(checked:boolean) => setIsUseDarkMode(checked)}
          >
            <span className="sr-only">Use dark mode</span>
          </SwitchWithIcons>
        )}

        <SwitchWithIcons
          OffIcon={VolumeOff}
          OnIcon={VolumeUp}
          defaultValue={isUseSound}
          id="isUseSound"
          onChange={(checked) => setIsUseSound(checked)}
        >
          <span className="sr-only">Use sound</span>
        </SwitchWithIcons>

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
