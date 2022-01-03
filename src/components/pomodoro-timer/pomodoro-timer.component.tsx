import {
  useGameStateContext,
  useTimerStateContext,
} from '@contexts';
import {
  useGetCurrentPomodoroStateObj,
  useCompletedStateCheckHook,
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
  PomodoroStateIndicator,
} from './components';
import styles from './pomodoro-timer.module.css';

export const PomodoroTimer: VoidFunctionComponent = () => {

  const { timeInMs } = useTimerStateContext();
  const { label } = useGetCurrentPomodoroStateObj();
  const { isCompleted } = useGameStateContext();

  useCompletedStateCheckHook();

  const title = useMemo(() => {
    let title = 'FocusTime';

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
  ])

  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <div className={styles.pomodoroTimer}>
        <PomodoroStateIndicator/>
        <Counter/>
        <Controls/>
      </div>
    </>
  );
};
