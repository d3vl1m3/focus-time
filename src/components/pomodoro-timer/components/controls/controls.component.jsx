import React from 'react';
import { useGameStateContext } from '../../context/game-state/game-state.context';
import { ActiveStateControlsComponent } from './components/active-state-controls/active-state-controls.component';
import {
  CompletedStateControlsComponent,
} from './components/completed-state-controls/completed-state-controls.component';

export const ControlsComponent = () => {
  const { isCompleted } = useGameStateContext();

  return isCompleted
    ? <CompletedStateControlsComponent />
    : <ActiveStateControlsComponent />;
};
