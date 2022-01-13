import { SwitchWithIcons } from '@components/form-elements/switch-with-icons/switch-with-icons.component';
import { useSettingsPanelStateContext, useSettingsStateContext } from '@contexts';
import {
  DarkMode,
  LightMode,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import { HTMLAttributes, VoidFunctionComponent } from 'react';

import styles from './header-actions.module.css';

export const HeaderActions: VoidFunctionComponent<HTMLAttributes<HTMLUListElement>> = ({
  className = '',
  ...props
}) => {
  const { isUseDarkMode, setIsUseDarkMode, isUseSound, setIsUseSound } = useSettingsStateContext();
  const { isSettingsOpen, openSettingsModal } = useSettingsPanelStateContext();

  return (
    <ul
      className={`${styles.actionsList} ${className}`}
      {...props}
    >

      {isUseDarkMode !== null && (
        <li className={styles.actionListItem}>
          <SwitchWithIcons
            OffIcon={LightMode}
            OnIcon={DarkMode}
            defaultValue={isUseDarkMode}
            id="isUseDarkMode"
            onChange={(checked:boolean) => setIsUseDarkMode(checked)}
          >
            <span className="sr-only">Use dark mode</span>
          </SwitchWithIcons>
        </li>
      )}

      <li className={styles.actionListItem}>
        <SwitchWithIcons
          OffIcon={VolumeOff}
          OnIcon={VolumeUp}
          defaultValue={isUseSound}
          id="isUseSound"
          onChange={(checked) => setIsUseSound(checked)}
        >
          <span className="sr-only">Use sound</span>
        </SwitchWithIcons>
      </li>

      <li className={styles.actionListItem}>
        <button
          aria-pressed={isSettingsOpen}
          className="btn btn-secondary btn-sm"
          title="Settings"
          type="button"
          onClick={openSettingsModal}
        >
          Settings
        </button>
      </li>
    </ul>
  );
};
