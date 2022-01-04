import * as ContextModules from '@contexts';
import type { TimerStateContextValues, GameStateContextValues } from '@contexts';
import { render } from '@testing-library/react';
import React from 'react';

import { Controls } from './controls.component';

const mockInactiveStateControls = jest.fn(() => null);
const mockActiveStateControls = jest.fn(() => null);
const mockCompletedStateControls = jest.fn(() => null);

const spyGameStateContext = jest.spyOn(ContextModules, 'useGameStateContext');
const spyTimerStateContext = jest.spyOn(ContextModules, 'useTimerStateContext');

jest.mock('@contexts');
jest.mock('./components', () => ({
  ActiveStateControls: () => mockActiveStateControls(),
  CompletedStateControls: () => mockCompletedStateControls(),
  InactiveStateControls: () => mockInactiveStateControls(),
}));

const setState = (isCompleted = false, isActive = false) => {
  spyGameStateContext.mockImplementationOnce(() => ({
    isCompleted,
  }) as GameStateContextValues);

  spyTimerStateContext.mockImplementationOnce(() => ({
    isActive,
  }) as TimerStateContextValues);
};

const renderTestComponent = () => render(<Controls />);

afterEach(() => {
  jest.clearAllMocks();
});

describe('On initial load', () => {
  beforeEach(() => {
    setState();
  });

  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    renderTestComponent();
    expect(spyError).not.toHaveBeenCalled();
  });

  test('should render with inactive controls only', () => {
    renderTestComponent();
    expect(mockInactiveStateControls).toHaveBeenCalled();
  });
});

describe('When in the active state', () => {
  beforeEach(() => {
    setState(false, true);
  });
  test('should render with active state controls', () => {
    renderTestComponent();

    expect(mockActiveStateControls).toHaveBeenCalled();
  });
});

describe('When in the completed state', () => {
  beforeEach(() => {
    setState(true, false);
  });
  test('should render with active state controls', () => {
    renderTestComponent();

    expect(mockCompletedStateControls).toHaveBeenCalled();
  });
});
