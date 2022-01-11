import { VoidFunctionComponent } from 'react';

interface FooterProps {
  className?: string;
}

export const Footer: VoidFunctionComponent<FooterProps> = ({
  className = '',
}) => (
  <footer className={`footer ${className}`}>
    <p>A D3VL1M3 project</p>
  </footer>
);
