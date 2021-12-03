import React from 'react';
import styles from './stop-watch.module.css';
import { Counter } from './components/counter/counter.component';
import { Controls } from './components/controls/controls.component';

export const StopWatchPresenter = ({
  isActive,
  isPaused,
  reset,
  start,
  time,
  togglePlayPause,
}) => (
  <div className={styles.stopWatch}>
    <Counter time={time} />
    <Controls
      active={isActive}
      isPaused={isPaused}
      reset={reset}
      start={start}
      togglePlayPause={togglePlayPause}
    />
  </div>
);
