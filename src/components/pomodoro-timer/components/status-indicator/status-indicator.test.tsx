import { testStateIndicator } from '@test-utils/pomodoro-timer';
import { render } from '@testing-library/react';
import { IntervalStatusSlugType } from '@types';
import React from 'react';

import { StatusIndicatorPresenter } from './status-indicator.presenter';

afterEach(() => {
  jest.clearAllMocks();
});

const renderPresenterComponent = (intervalStatus?: IntervalStatusSlugType) => {
  render(<StatusIndicatorPresenter intervalStatusSlug={intervalStatus} />);
};

describe('On initial load', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    renderPresenterComponent();
    expect(spyError).not.toHaveBeenCalled();
    testStateIndicator('RESET');
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
    renderPresenterComponent('LONG_BREAK');
  });

  test('should set the status to \'Long break\' when app is in the relevant state', () => {
    testStateIndicator('LONG_BREAK');
  });
});