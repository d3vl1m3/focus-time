import { Switch as HuiSwitch } from '@headlessui/react';
import {
  FunctionComponent,
  HTMLAttributes,
  useState,
} from 'react';

import styles from './switch.module.css';

export interface SwitchProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange' | 'defaultValue'> {
  as?: keyof JSX.IntrinsicElements,
  defaultValue?: boolean,
  id: string,
  onChange?: (checked: boolean) => void
}

export const Switch: FunctionComponent<SwitchProps> = ({
  as = 'div',
  children,
  className = '',
  defaultValue = false,
  id,
  onChange,
}) => {
  const [enabled, setIsEnabled] = useState( defaultValue );

  const updateValue = (checked: boolean) => {
    setIsEnabled(checked);

    if ( onChange ) {
      onChange(checked);
    }
  };

  return (
    <HuiSwitch.Group{...{ as, className, id }}>
      <HuiSwitch.Label>
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
