import { DarkModeToggle, SoundToggle } from '@components/actions';
import { OpenSettingsPanelButton }
  from '@components/actions/open-settings-panel-button/open-settings-panel-button.component';
import { VoidFunctionComponent } from 'react';

import styles from './desktop-menu.module.css';

export const DesktopMenu: VoidFunctionComponent = () => {
  return (
    <ul className={styles.menu}>
      <li>
        <DarkModeToggle />
      </li>

      <li>
        <SoundToggle />
      </li>

      <li>
        <OpenSettingsPanelButton />
      </li>
    </ul>
  );
};
