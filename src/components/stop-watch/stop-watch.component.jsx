import React from 'react';
import { Timer } from './hooks/timer.hook';
import { StopWatchPresenter } from './stop-watch.presenter';

export const StopWatch = () => <StopWatchPresenter {...Timer()} />;
