import styles from './pomodoro-timer.module.css';

import { VoidFunctionComponent } from 'react';

import Head from 'next/head';
import { Controls, Counter, PomodoroStateIndicator } from './components';

import { useTimerStateContext } from './contexts';
import { useGetPomodoroStateObj } from '../../utility/hooks/get-pomodoro-state-obj/get-pomodoro-state-obj.utility';

import { msToTimer } from '../../utility/functions/ms-to-timer/ms-to-timer';

export const PomodoroTimer: VoidFunctionComponent = () => {
  const { timeInMs } = useTimerStateContext();
  const { label } = useGetPomodoroStateObj();

  return (
    <>
      <Head>
        <title>{timeInMs ? `${msToTimer(timeInMs)} - ${label}` : 'FocusTime'}</title>
      </Head>
      <div className={styles.pomodoroTimer}>
        <PomodoroStateIndicator/>
        <Counter/>
        <Controls/>
      </div>
    </>
  );
};
