import { FunctionComponent } from 'react';

import {
  Footer,
  Header,
} from './components';
import styles from './main-layout.module.css';

export const MainLayout: FunctionComponent = ({ children }) => (
  <div className={styles.pageContainer}>
    <Header className={styles.header}/>
    <main className={styles.main}>
      {children}
    </main>
    <Footer className={styles.footer}/>
  </div>
);
