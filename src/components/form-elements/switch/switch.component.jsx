import React, { useState } from 'react';
import { Switch as HuiSwitch } from '@headlessui/react';
import styles from './switch.module.css';

export const Switch = ({
  children,
  className = '',
  defaultValue = false,
  onChange,
}) => {
  const [enabled, setEnabled] = useState(defaultValue);

  /**
   * Need to update the value locally but may need to be updated elsewhere too (form submission etc.)
   * @param checked
   */
  const updateValue = (checked) => {
    setEnabled(checked);
    onChange(checked);
  };

  return (
    <HuiSwitch.Group
      as="div"
      className={className}
    >
      {children}
      <HuiSwitch
        checked={enabled}
        className={`${styles.switch} ${enabled ? styles.switchEnabled : ''}`}
        onChange={updateValue}
      >
        <span
          className={`${styles.switchToggle} ${enabled ? styles.switchToggleEnabled : ''}`}
        />
      </HuiSwitch>
    </HuiSwitch.Group>
  );
};
