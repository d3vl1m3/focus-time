import { DarkModeToggle, SoundToggle } from '@components/actions';
import { OpenSettingsPanelButton }
  from '@components/actions/open-settings-panel-button/open-settings-panel-button.component';
import { Popover } from '@headlessui/react';
import { Menu } from '@mui/icons-material';
import { VoidFunctionComponent } from 'react';

import styles from './mobile-menu.module.css';

export const MobileMenu: VoidFunctionComponent = () => {
  return (
    <div className={styles.menuContainer}>
      <Popover
        as="div"
        className={styles.popoverContainer}
      >
        <Popover.Button
          aria-label="Quick settings"
          className={`btn btn-secondary btn-sm`}
        >
          <Menu />
        </Popover.Button>
        <Popover.Panel
          className={`popover ${styles.dropdown}`}
        >
          <ul className={styles.menu}>
            <li>
              <DarkModeToggle />
            </li>

            <li>
              <SoundToggle />
            </li>
          </ul>
        </Popover.Panel>
      </Popover>
      <OpenSettingsPanelButton/>
    </div>
  );
};
