import {
  FunctionComponent,
  InputHTMLAttributes,
} from 'react';

import styles from './number-input.module.css';

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: HTMLInputElement['children'] | string;
  id: HTMLInputElement['id'];
  unit?: string;
}

export const NumberInput: FunctionComponent<NumberInputProps> = ({
  children,
  className = '',
  id,
  unit = false,
  ...props
}) => (
  <div className={`${styles.container} ${className}`}>
    <label
      className={styles.label}
      htmlFor={id}
    >
      {children}
    </label>
    <div
      className={`${styles.inputContainer} ${unit ? styles.inputContainerWithUnit : ''}`}
    >
      <input
        className={`${styles.input} ${unit ? styles.inputWithUnit : styles.inputWithoutUnit}`}
        id={id}
        name={id}
        {...props}
        aria-describedby={`${id}_description`}
        type="number"
      />
      {unit && (
        <div className={styles.unitContainer}>
          <label
            className={styles.unit}
            htmlFor={id}
            id={`${id}_description`}
          >
            {unit}
          </label>
        </div>
      )}
    </div>
  </div>
);
