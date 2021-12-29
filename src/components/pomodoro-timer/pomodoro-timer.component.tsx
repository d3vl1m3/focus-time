import Head from 'next/head';
import { VoidFunctionComponent } from 'react';

import { msToTimer } from '../../utility/functions';
import { useGetPomodoroStateObj } from '../../utility/hooks/get-pomodoro-state-obj/get-pomodoro-state-obj.utility';

import { Controls, Counter, PomodoroStateIndicator } from './components';
import { useTimerStateContext } from './contexts';
import styles from './pomodoro-timer.module.css';

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
