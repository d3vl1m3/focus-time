import React from 'react';
import { Header } from './components/header/header.component';
import { Footer } from './components/footer/footer.component';

import styles from './main-layout.module.css';

export const MainLayout = ({ children }) => (
  <div className={styles.pageContainer}>
    <Header className={styles.header} />
    <main className={styles.main}>
      {children}
    </main>
    <Footer className={styles.footer} />
  </div>
);
