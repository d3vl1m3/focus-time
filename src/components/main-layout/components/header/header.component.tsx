import { MobileMenu } from '@components/main-layout/components/header/components/mobile-menu/mobile-menu.component';
import {
  HTMLAttributes,
  VoidFunctionComponent,
} from 'react';

import { DesktopMenu } from './components/desktop-menu/desktop-menu.component';
import styles from './header.module.css';

export const Header: VoidFunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...props
}) => {

  return (
    <header
      className={`${styles.header} ${className}`}
      {...props}
    >
      <h1 className={styles.siteTitle}>Focus Time</h1>

      <DesktopMenu />
      <MobileMenu />
    </header>
  );
};
