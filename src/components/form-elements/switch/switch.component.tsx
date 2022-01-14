import { Switch as HuiSwitch } from '@headlessui/react';
import {
  FunctionComponent,
  HTMLAttributes,
  useEffect,
  useState,
} from 'react';

import styles from './switch.module.css';

export interface SwitchProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange' | 'defaultValue'> {
  as?: keyof JSX.IntrinsicElements,
  defaultValue?: boolean,
  id: string,
  stateValue?: boolean
  onChange?: (checked: boolean) => void,
}

export const Switch: FunctionComponent<SwitchProps> = ({
  as = 'div',
  children,
  className = '',
  defaultValue = false,
  id,
  stateValue,
  onChange,
  ...props
}) => {
  const [enabled, setIsEnabled] = useState( defaultValue );

  const updateValue = (checked: boolean) => {
    setIsEnabled(checked);

    if ( onChange ) {
      onChange(checked);
    }
  };

  useEffect(() => {
    if ( stateValue !== undefined ) {
      setIsEnabled(stateValue);
    }
  }, [stateValue]);

  return (
    <HuiSwitch.Group{...{ as, className, id }}>
      <HuiSwitch.Label>
        {children}
      </HuiSwitch.Label>

      <HuiSwitch
        {...props}
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
