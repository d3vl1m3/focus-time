import { PomodoroTimer } from '@components/pomodoro-timer/pomodoro-timer.component';
import {
  GameStateProvider,
  IntervalStatusProvider,
  SettingsPanelStateProvider,
  SettingsStateProvider,
  TimerStateProvider,
} from '@contexts';
import type { DefaultSettingsValue } from '@data/default-settings-values/default-settings-values.data';
import { defaultValues } from '@data/default-settings-values/default-settings-values.data';
import * as DefaultSettingValuesModule from '@data/default-settings-values/default-settings-values.data';
import { setupMatchMediaMock } from '@mocks/match-media/match-media.mock';
import { setupIntersectionObserverMock } from '@mocks/setup-intersection-observer/setup-intersection-observer.mock';
import { triggerMockTimeSkip } from '@test-utils/jest';
import {
  testOnlySpecificTimerControlsRendered,
  testPageTitle,
  testStateIndicator,
  testTimer,
  triggerControl,
} from '@test-utils/pomodoro-timer';
import {
  render,
  screen,
} from '@testing-library/react';

const spyDefaultSettingValues = jest.spyOn(DefaultSettingValuesModule, 'useDefaultSettingsValues');

const mockDefaultSettingValues = (overrideDefaultValues?: Partial<DefaultSettingsValue>) => spyDefaultSettingValues
  .mockImplementation(() => ({ ...defaultValues, ...overrideDefaultValues }));

// use to set all the durations to 1 second and minimise the required time to skip intervals
const shortDurationsDefault: Partial<DefaultSettingsValue> = {
  focusDuration: 1 / 60,
  shortBreakDuration: 1 / 60,
};

mockDefaultSettingValues();

jest.mock('next/head');
jest.useFakeTimers();

afterEach(() => {
  mockDefaultSettingValues().mockClear();
});

const renderTestComponent = () => render(
  <GameStateProvider>
    <TimerStateProvider>
      <SettingsStateProvider>
        <IntervalStatusProvider>
          <SettingsPanelStateProvider>
            <PomodoroTimer />
          </SettingsPanelStateProvider>
        </IntervalStatusProvider>
      </SettingsStateProvider>
    </TimerStateProvider>
  </GameStateProvider>,
);

beforeEach(() => {
  setupMatchMediaMock();
});

describe('On initial load', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    renderTestComponent();
    expect(spyError).not.toHaveBeenCalled();
  });
});

describe('When looking at the initial page layout', () => {
  beforeEach(() => {
    renderTestComponent();
  });

  test('should be using the default page title', () => {
    testPageTitle('Focus Time');
  });

  test('should show the default state indicator text', () => {
    testStateIndicator('INITIAL');
  });

  test('should see an empty timer', () => {
    testTimer('00:00');
  });

  test('should see the inactive controls only', () => {
    testOnlySpecificTimerControlsRendered(['Start a Pomodoro session']);
  });
});

describe('When a user stars a new timer', () => {
  beforeEach(() => {
    renderTestComponent();
    triggerControl('Start a Pomodoro session');
  });

  test('should update the time and state in the page title', () => {
    testPageTitle('25:00 - Focus');
  });

  test('should update the state indicator to `Focus`', () => {
    testStateIndicator('FOCUS');
  });

  test('should update timer', () => {
    testTimer('25:00');
  });

  test('should have the controls for an active, un-paused state only', () => {
    testOnlySpecificTimerControlsRendered(['Pause timer', 'Skip interval', 'Reset Pomodoro session']);
  });
});

describe('When a user has an active timer ', () => {
  beforeEach(() => {
    renderTestComponent();
    triggerControl('Start a Pomodoro session');
    triggerMockTimeSkip(5000);
  });

  test('should update the time and state in the page title', () => {
    testPageTitle('24:55 - Focus');
  });

  test('should update the state indicator to `Focus`', () => {
    testStateIndicator('FOCUS');
  });

  test('should update the timer accordingly', () => {
    testTimer('24:55');
  });

  test('should have the controls for an active, un-paused state only', () => {
    testOnlySpecificTimerControlsRendered(['Pause timer', 'Skip interval', 'Reset Pomodoro session']);
  });
});

describe('When the users skips an interval', () => {
  beforeEach(() => {
    renderTestComponent();
    triggerControl('Start a Pomodoro session');

    triggerControl('Skip interval');
  });

  test('should update the time and state in the page title', () => {
    testPageTitle('05:00 - Short break');
  });

  test('should update the state indicator to `Focus`', () => {
    testStateIndicator('SHORT_BREAK');
  });

  test('should start the timer', () => {
    testTimer('05:00');
  });

  test('should have the controls for an active, un-paused state only', () => {
    testOnlySpecificTimerControlsRendered(['Pause timer', 'Skip interval', 'Reset Pomodoro session']);
  });
});

describe('When the users finishes a break', () => {
  beforeEach(() => {
    setupIntersectionObserverMock();
    mockDefaultSettingValues(shortDurationsDefault);

    renderTestComponent();
    triggerControl('Start a Pomodoro session');

    triggerMockTimeSkip({ seconds: 1 });
    testStateIndicator('SHORT_BREAK');

    triggerMockTimeSkip({ seconds: 1 });
  });

  test('should update the time and state in the page title', () => {
    testPageTitle('00:01 - Focus');
  });

  test('should update the state indicator to `Focus`', () => {
    testStateIndicator('FOCUS');
  });

  test('should start the timer', () => {
    testTimer('00:01');
  });

  test('should have the controls for an active, un-paused state only', () => {
    testOnlySpecificTimerControlsRendered(['Pause timer', 'Skip interval', 'Reset Pomodoro session']);
  });
});

describe('When the users resets the timer', () => {
  beforeEach(() => {
    renderTestComponent();
    triggerControl('Start a Pomodoro session');
    triggerControl('Reset Pomodoro session');
  });

  test('should update the time and state in the page title', () => {
    testPageTitle('Focus Time');
  });

  test('should update the state indicator to `Reset`', () => {
    testStateIndicator('INITIAL');
  });

  test('should show an inactive timer that does not update as time passes', () => {
    testTimer('00:00');
    triggerMockTimeSkip(5000);
    testTimer('00:00');
  });

  test('should have inactive state controls only', () => {
    testOnlySpecificTimerControlsRendered(['Start a Pomodoro session']);
  });
});

describe('When the user pauses the timer', () => {
  beforeEach(() => {
    renderTestComponent();

    triggerControl('Start a Pomodoro session');
    triggerMockTimeSkip(5000);

    triggerControl('Pause timer');
    triggerMockTimeSkip(5000);
  });

  test('should not change the timer as time passes in the page title', () => {
    testPageTitle('24:55 - Focus');
  });

  test('should have the same state it started with', () => {
    testStateIndicator('FOCUS');
  });

  test('should not change the timer as time passes', () => {
    testTimer('24:55');
  });

  test('should have active, paused state controls only', () => {
    testOnlySpecificTimerControlsRendered(['Resume timer', 'Skip interval', 'Reset Pomodoro session']);
  });
});

describe('When the user starts a paused timer', () => {
  beforeEach(() => {
    renderTestComponent();

    triggerControl('Start a Pomodoro session');
    triggerMockTimeSkip(5000);

    triggerControl('Pause timer');
    triggerMockTimeSkip(5000);

    triggerControl('Resume timer');
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
    testOnlySpecificTimerControlsRendered(['Pause timer', 'Skip interval', 'Reset Pomodoro session']);
  });
});

describe('When the user has long breaks activated', () => {
  beforeEach(() => {
    setupIntersectionObserverMock();
    mockDefaultSettingValues({
      ...shortDurationsDefault,
      longBreakGap: 1,
      isUseLongBreaks: true,
    });

    renderTestComponent();

    triggerControl('Start a Pomodoro session');
    triggerMockTimeSkip({ seconds: 1 });
  });

  test('should contain additional indicator for long breaks', () => {
    testPageTitle('10:00 - Long break');
  });

  test('should update indicator to long break', () => {
    testStateIndicator('LONG_BREAK');
  });

  test('should update timer in the page head', () => {
    testPageTitle('10:00 - Long break');
  });

  test('should update the timer on the page', () => {
    testTimer('10:00');
  });

  test('should have active expected controls only', () => {
    testOnlySpecificTimerControlsRendered(['Pause timer', 'Skip interval', 'Reset Pomodoro session']);
  });
});

describe('When the user completes their session', () => {
  beforeEach(() => {
    setupIntersectionObserverMock();

    mockDefaultSettingValues({
      isUseFocusIntervalsTarget: true,
      focusIntervalsTarget: 1,
    });

    renderTestComponent();

    triggerControl('Start a Pomodoro session');
    triggerControl('Skip interval');
  });

  test('should update timer in the page head', () => {
    testPageTitle('Completed');
  });

  test('should have the correct status rendered', () => {
    testStateIndicator('COMPLETED');
  });

  test('should remove the timer from the page', () => {
    const { queryByRole } = screen;
    expect(queryByRole('timer')).not.toBeInTheDocument();
  });

  test('should have active expected controls only', () => {
    testOnlySpecificTimerControlsRendered(['Reset session']);
  });

  test('should reset timer when clicking control after completed', () => {
    triggerControl('Reset session');
    testPageTitle('Focus Time');
  });
});
