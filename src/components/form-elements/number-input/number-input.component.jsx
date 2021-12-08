import React from 'react';
import styles from './number-input.module.css';

export const NumberInput = ({
  children,
  className = '',
  id,
  unit,
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
