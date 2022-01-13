import { useSettingsStateContext } from '@contexts';
import { Menu } from '@mui/icons-material';
import {
  HTMLAttributes,
  VoidFunctionComponent,
  useState,
} from 'react';

import { HeaderActions } from './components/header-actions/header-actions.component';
import styles from './header.module.css';

export const Header: VoidFunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...props
}) => {
  const {
  } = useSettingsStateContext();

  const [isMobileDrawVisible, setIsMobileDrawVisible] = useState(false);

  return (
    <header
      className={`${styles.header} ${className}`}
      {...props}
    >
      <h1 className={styles.siteTitle}>Focus Time</h1>

      <div role="tablist">
        <button
          aria-controls="mobile-actions-panel"
          aria-selected={isMobileDrawVisible}
          className={`btn btn-secondary btn-sm ${styles.mobileDrawerButton} `}
          id="mobile-actions-panel-toggle"
          role="tab"
          type="button"
          onClick={() => setIsMobileDrawVisible(!isMobileDrawVisible)}
        >
          <Menu />
          <span className="sr-only">App config menu</span>
        </button>
      </div>

      <HeaderActions
        aria-labelledby="mobile-actions-panel-toggle"
        className={
          `${styles.actionsContainer} ${isMobileDrawVisible ? styles.buttonContainerVisible : ''}`
        }
        id="mobile-actions-panel"
        role="tabpanel"
      />
    </header>
  );
};
