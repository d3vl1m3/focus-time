import { Index } from '@components/pages';
import { pomodoroStateObjectsData } from '@data';
import { setupIntersectionObserverMock } from '@mocks/intersection-observer.mock';
import { triggerMockTimeSkip } from '@test-utils/jest/triggers.test-utils';
import {
  triggerPauseTimerControl,
  triggerResetTimerControl,
  triggerSkipIntervalControl,
  triggerStartTimerControl,
  testOnlySpecificTimerControlsRendered,
  testPageTitle,
  testStateIndicator,
  testTimer,
} from '@test-utils/pomodoro-timer';
import { triggerResumeTimerControl } from "@test-utils/pomodoro-timer/triggers/triggers.test-utils";
import { triggerCompletedState } from '@test-utils/settings/trigger/trigger.test-utils';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

jest.mock('next/head');
jest.useFakeTimers();

const renderTestComponent = () => render(<Index/>);

describe('On initial load', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    renderTestComponent();
    expect(spyError).not.toHaveBeenCalled();
  });
});

describe('When looking at the initial page layout', () => {
  beforeEach(() => {
    renderTestComponent()
  });

  test('should be using the default page title', () => {
    testPageTitle('FocusTime');
  });

  test('should show the state indicators with none selected', () => {
    const { getByRole } = screen;

    const stateIndicators = within(getByRole('list')).queryAllByRole('listitem');

    expect(stateIndicators.length).toBe(2);

    const { FOCUS, SHORT_BREAK } = pomodoroStateObjectsData;

    expect(stateIndicators.find((item) => item.textContent === FOCUS.label))
      .toBeInTheDocument();

    expect(stateIndicators.find((item) => item.textContent === SHORT_BREAK.label))
      .toBeInTheDocument();

    testStateIndicator('RESET');
  });

  test('should see an empty timer', () => {
    testTimer('00:00');
  });

  test('should see the inactive controls only', () => {
    testOnlySpecificTimerControlsRendered(['Start']);
  });
});

describe('When a user stars a new timer', () => {
  beforeEach(() => {
    renderTestComponent();
    triggerStartTimerControl();
  })

  test('should update the time and state in the page title', () => {
    testPageTitle('25:00 - Focus');
  });

  test('should update the state indicator to `Focus`', () => {
    testStateIndicator('FOCUS')
  });

  test('should update timer', () => {
    testTimer('25:00');
  });

  test('should have the controls for an active, un-paused state only', () => {
    testOnlySpecificTimerControlsRendered(['Pause', 'Skip', 'Reset']);
  });
});

describe('When a user has an active timer ', () => {
  beforeEach(() => {
    renderTestComponent();
    triggerStartTimerControl();
    triggerMockTimeSkip(5000);
  })

  test('should update the time and state in the page title', () => {
    testPageTitle('24:55 - Focus');
  });

  test('should update the state indicator to `Focus`', () => {
    testStateIndicator('FOCUS')
  });

  test('should update the timer accordingly', () => {
    testTimer('24:55');
  });

  test('should have the controls for an active, un-paused state only', () => {
    testOnlySpecificTimerControlsRendered(['Pause', 'Skip', 'Reset']);
  });
});

describe('When the users skips an interval', () => {
  beforeEach(() => {
    renderTestComponent();
    triggerStartTimerControl();

    triggerSkipIntervalControl();
  });

  test('should update the time and state in the page title', () => {
    testPageTitle('05:00 - Short break');
  });

  test('should update the state indicator to `Focus`', () => {
    testStateIndicator('SHORT_BREAK')
  });

  test('should start the timer', () => {
    testTimer('05:00');
  });

  test('should have the controls for an active, un-paused state only', () => {
    testOnlySpecificTimerControlsRendered(['Pause', 'Skip', 'Reset']);
  });
});

describe('When the users resets the timer', () => {
  beforeEach(() => {
    renderTestComponent();
    triggerStartTimerControl();
    triggerResetTimerControl();
  });

  test('should update the time and state in the page title', () => {
    testPageTitle('FocusTime');
  });

  test('should update the state indicator to `Reset`', () => {
    testStateIndicator('RESET')
  });

  test('should show an inactive timer that does not update as time passes', () => {
    testTimer('00:00');
    triggerMockTimeSkip(5000);
    testTimer('00:00');
  });

  test('should have inactive state controls only', () => {
    testOnlySpecificTimerControlsRendered(['Start']);
  });
});

describe('When the user pauses the timer', () => {
  beforeEach(() => {
    renderTestComponent();

    triggerStartTimerControl();
    triggerMockTimeSkip(5000);

    triggerPauseTimerControl();
    triggerMockTimeSkip(5000);
  });

  test('should not change the timer as time passes in the page title', () => {
    testPageTitle('24:55 - Focus');
  });

  test('should have the same state it started with', () => {
    testStateIndicator('FOCUS')
  });

  test('should not change the timer as time passes', () => {
    testTimer('24:55');
  });

  test('should have active, paused state controls only', () => {
    testOnlySpecificTimerControlsRendered(['Resume', 'Skip', 'Reset']);
  });
});

describe('When the user starts a paused timer', () => {
  beforeEach(() => {
    renderTestComponent();

    triggerStartTimerControl();
    triggerMockTimeSkip(5000);

    triggerPauseTimerControl();
    triggerMockTimeSkip(5000);

    triggerResumeTimerControl();
  });

  test('should update timer in the page head', () => {
    triggerMockTimeSkip(8000);
    testPageTitle('24:47 - Focus');
  });

  test('should update the main page timer', () => {
    triggerMockTimeSkip(2000);
    testTimer('24:53');
  });

  test('should have active, un-paused state controls only', () => {
    testOnlySpecificTimerControlsRendered(['Pause', 'Skip', 'Reset']);
  });
});

describe('When the user completes their session', () => {
  beforeEach(() => {
    setupIntersectionObserverMock();
    renderTestComponent();
    triggerCompletedState();
  });

  test('should update timer in the page head', () => {
    testPageTitle('Completed');
  });

  test('should remove the timer from the page', () => {
    const { getByText, queryByRole } = screen;

    expect(queryByRole('timer')).not.toBeInTheDocument();
    expect(getByText('Fin.')).toBeInTheDocument();
  });

  test('should have active, un-paused state controls only', () => {
    testOnlySpecificTimerControlsRendered(['Reset']);
  });

  test('should reset timer when clicking control after completed', () => {
    triggerResetTimerControl();
    testPageTitle('FocusTime');
  });
});