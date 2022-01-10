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
      <h1 className={styles.siteTitle}>Focus Time</h1>
      <button
        className="btn btn-sm"
        type="button"
        onClick={openSettingsModal}
      >
        Settings
      </button>
    </header>
  );
};
