import React, { useState } from 'react';
import { Switch as HuiSwitch } from '@headlessui/react';
import styles from './switch.module.css';

export const Switch = ({
  children,
  className = '',
}) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <HuiSwitch.Group
      as="div"
      className={className}
    >
      {children}
      <HuiSwitch
        checked={enabled}
        className={`${styles.switch} ${enabled ? styles.switchEnabled : ''}`}
        onChange={setEnabled}
      >
        <span
          className={`${styles.switchToggle} ${enabled ? styles.switchToggleEnabled : ''}`}
        />
      </HuiSwitch>
    </HuiSwitch.Group>
  );
};
