import styles from './switch.module.css';
import {Switch as HuiSwitch} from '@headlessui/react';
import {ElementType, FunctionComponent, useState} from 'react';

interface SwitchProps {
  as?: ElementType<any>,
  className?: string,
  defaultValue?: boolean,
  onChange?: (checked: boolean) => void
}

export const Switch: FunctionComponent<SwitchProps> = ({
    as = 'div',
    children,
    className = '',
    defaultValue = false,
    onChange = () => null,
  }) => {
    const [enabled, setEnabled] = useState(defaultValue);

    /**
     * Need to update the value locally but may need to be updated elsewhere too (form submission etc.)
     * @param checked
     */
    const updateValue = (checked: boolean) => {
      setEnabled(checked);
      onChange(checked);
    };

    return (
      <HuiSwitch.Group
        as={as}
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
  }
;
