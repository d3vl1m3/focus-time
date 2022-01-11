import {
  useGameStateContext,
  useTimerStateContext,
} from '@contexts';
import {
  useCurrentPomodoroStateObj,
  useCompletedStateCheck,
} from '@hooks';
import { msToTimer } from '@utils';
import Head from 'next/head';
import {
  useMemo,
  VoidFunctionComponent,
} from 'react';

import {
  Controls,
  Counter,
  IntervalStatusIndicator,
} from './components';
import styles from './pomodoro-timer.module.css';

export const PomodoroTimer: VoidFunctionComponent = () => {
  const { timeInMs } = useTimerStateContext();
  const { label } = useCurrentPomodoroStateObj();
  const { isCompleted } = useGameStateContext();

  useCompletedStateCheck();

  const title = useMemo(() => {
    let title = 'Focus Time';

    if ( timeInMs ) {
      title = `${msToTimer(timeInMs)} - ${label}`;
    }

    if ( isCompleted ) {
      title = 'Completed';
    }

    return title;
  }, [
    isCompleted,
    label,
    timeInMs,
  ]);

  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <div className={styles.pomodoroTimer}>
        <IntervalStatusIndicator/>
        <Counter/>
        <Controls/>
      </div>
    </>
  );
};
