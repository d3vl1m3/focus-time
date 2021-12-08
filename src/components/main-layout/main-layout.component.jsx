import React from 'react';
import styles from './main-layout.module.css';
import {
  Header,
  Footer,
} from './components';
import { SettingsPanelProvider } from '../settings-panel/contexts';

export const MainLayout = ({ children }) => (
  <SettingsPanelProvider>
    <div className={styles.pageContainer}>
      <Header className={styles.header} />
      <main className={styles.main}>
        {children}
      </main>
      <Footer className={styles.footer} />
    </div>
  </SettingsPanelProvider>
);
