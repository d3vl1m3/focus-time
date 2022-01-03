import {
  GameStateProvider,
  TimerStateProvider,
} from '@contexts';
import {
  render,
  screen,
} from '@testing-library/react';

import { Counter } from '..';

import {
  CounterPresenter,
  CounterPresenterProps,
} from './counter.presenter';

const renderTestComponent = (args?: CounterPresenterProps) => render(
  <CounterPresenter {...args}/>);

test('should render component without errors', () => {
  const spyError = jest.spyOn(console, 'error');
  render(
    <TimerStateProvider>
      <GameStateProvider>
        <Counter />
      </GameStateProvider>
    </TimerStateProvider>,
  );
  expect(spyError).not.toHaveBeenCalled();
})

describe('On initial load', () => {
  beforeEach(() => {
    renderTestComponent();
  });

  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    expect(spyError).not.toHaveBeenCalled();
  });

  test('should render blank timer', () => {
    const { getByText } = screen;
    expect(getByText('00:00')).toBeInTheDocument();
  });

  test('should not render completion text', () => {
    const { queryByText } = screen;
    expect(queryByText('Fin.')).not.toBeInTheDocument();
  });
});

describe('When a timer is active', () => {
  beforeEach(() => {
    renderTestComponent({ timeInMs: 630000 });
  });

  test('should display the new time in `mm:ss` format', () => {
    const { getByText } = screen;
    expect(getByText('10:30')).toBeInTheDocument();
  });

  test('should not display the completed text', () => {
    const { queryByText } = screen;
    expect(queryByText('Fin.')).not.toBeInTheDocument();
  });
});

describe('When in a completed state', () => {
  beforeEach(() => {
    renderTestComponent({ isCompleted: true, timeInMs: 630000 });
  });

  test('should render completed text', () => {
    const { getByText } = screen;
    expect(getByText('Completed')).toBeInTheDocument();
  });

  test('should remove the timer', () => {
    const { queryByText } = screen;
    expect(queryByText('00:00')).not.toBeInTheDocument();
  });
});
