/**
 * EXAMPLE FILE. COPY AND PASTE IN TO OTHER FILES THEN MODIFY AS REQUIRED.
 * DO NOT REMOVE FROM PROJECT OR INCLUDE IN PRODUCTION BUILD
 */
import { testStateIndicator } from '@test-utils/pomodoro-timer';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import { PomodoroStateType } from '@types';
import React from 'react';

import { PomodoroStateIndicatorPresenter } from './pomodoro-state-indicator.presenter';

afterEach(() => {
  jest.clearAllMocks();
});

const renderPresenterComponent = (pomodoroState?: PomodoroStateType, isUseLongBreaks?: boolean) => {
  render(<PomodoroStateIndicatorPresenter { ...{ isUseLongBreaks, pomodoroState } } />);
};

describe('On initial load', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    renderPresenterComponent();
    expect(spyError).not.toHaveBeenCalled();
    testStateIndicator();
  });
});

describe('When app is in a focus state', () => {
  beforeEach(() => {
    renderPresenterComponent('FOCUS');
  });

  test('should set the status to \'Focus\'', () => {
    testStateIndicator('FOCUS');
  });
});

describe('When app is in a short break state', () => {
  beforeEach(() => {
    renderPresenterComponent('SHORT_BREAK');
  });

  test('should set the status to \'Short break\'', () => {
    testStateIndicator('SHORT_BREAK');
  });
});

describe('When app is using long breaks state', () => {
  beforeEach(() => {
    renderPresenterComponent('LONG_BREAK', true);
  });

  test('should render the \'Long break\' status indicator', () => {
    const { getByRole } = screen;

    const statusIndicatorList = getByRole('list');

    expect(within(statusIndicatorList).getByText('Long break')).toBeInTheDocument();
  });

  test('should set the status to \'Long break\' when app is in the relevant state', () => {
    testStateIndicator('LONG_BREAK');
  });
});