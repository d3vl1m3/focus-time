import {VoidFunctionComponent} from 'react';
import styles from './footer.module.css';

interface FooterProps {
  className: string;
}

export const Footer: VoidFunctionComponent<FooterProps> = ({
  className = '',
}) => (
  <footer className={`${styles.footer} ${className}`}>
    <p>A D3VL1M3 project</p>
  </footer>
);
