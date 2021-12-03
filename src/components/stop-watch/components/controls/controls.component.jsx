import React from 'react';
import styles from './controls.module.css';

export const Controls = ({
  isActive,
  isPaused,
  reset,
  start,
  togglePlayPause,
}) => (
  <div>
    {isActive ? (
      <>
        <button
          className={`${styles.timerControl} ${styles.timerControlSecondary}`}
          type="button"
          onClick={reset}
        >
          Reset
        </button>
        <button
          className={`${styles.timerControl} ${styles.timerControlPrimary}`}
          type="button"
          onClick={togglePlayPause}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </>
    ) : (
      <button
        className={`${styles.timerControl} ${styles.timerControlPrimary}`}
        type="button"
        onClick={start}
      >
        Start
      </button>
    )}
  </div>
);
