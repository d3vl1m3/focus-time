import React from 'react';
import { useGameStateContext } from '../../contexts';
import {
  ActiveStateControls,
  CompletedStateControls,
} from './components';

export const Controls = () => {
  const { isCompleted } = useGameStateContext();

  return isCompleted
    ? <CompletedStateControls />
    : <ActiveStateControls />;
};
