import { Switch as HuiSwitch } from '@headlessui/react';
import {
  FunctionComponent,
  HTMLAttributes,
  useState,
} from 'react';

import styles from './switch.module.css';

export interface SwitchProps {
  as?: keyof JSX.IntrinsicElements,
  className?: string,
  defaultValue?: boolean,
  id: string,
  labelProps?: HTMLAttributes<HTMLLabelElement>
  onChange?: (checked: boolean) => void
}

export const Switch: FunctionComponent<SwitchProps> = ({
  as = 'div',
  children,
  className = '',
  defaultValue = false,
  id,
  labelProps,
  onChange = null,
}) => {
  const [enabled, setEnabled] = useState(defaultValue);

  /**
     * Need to update the value locally but may need to be updated elsewhere too (form submission etc.)
     * @param checked
     */
  const updateValue = (checked: boolean) => {
    setEnabled(checked);

    if (onChange !== null) {
      onChange(checked);
    }
  };

  return (
    <HuiSwitch.Group{...{ as, className, id }}>
      <HuiSwitch.Label {...labelProps}>
        {children}
      </HuiSwitch.Label>

      <HuiSwitch
        checked={enabled}
        className={`${styles.switch} ${enabled ? styles.switchEnabled : ''}`}
        onChange={updateValue}
      >
        <span className={`${styles.switchToggle} ${enabled ? styles.switchToggleEnabled : ''}`} />
      </HuiSwitch>
    </HuiSwitch.Group>
  );
}
;
