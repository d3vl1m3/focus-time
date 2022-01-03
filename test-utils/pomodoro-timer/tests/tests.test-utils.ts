import { pomodoroStateObjectsData } from "@data";
import { screen, within } from "@testing-library/react";
import { PomodoroStateType } from "@types";

type ValidControlName = 'Start' | 'Pause' | 'Resume' | 'Skip' | 'Reset';

export const testOnlySpecificTimerControlsRendered = (names: ValidControlName[]) => {
  const { getByRole } = screen;

  const controlContainer = getByRole('group');
  const renderedControls = within(controlContainer).getAllByRole('button')

  expect(controlContainer).toBeInTheDocument();
  expect(renderedControls.length).toBe(names.length);

  const validControlNames: ValidControlName[] = ['Start', 'Pause', 'Resume', 'Skip', 'Reset'];

  validControlNames.forEach((name) => {
    if (names.includes(name)) {
      expect(within(controlContainer).getByRole('button', { name })).toBeInTheDocument();
    } else {
      expect(within(controlContainer).queryByRole('button', { name })).not.toBeInTheDocument();
    }
  })
}

export const testPageTitle = (title: string) => {
  const { getByTestId } = screen;
  const mockHead = within(getByTestId('next-head-mock'));

  expect(mockHead.getByText(title)).toBeInTheDocument();
}

export const testStateIndicator = (state: PomodoroStateType) => {
  const { queryByRole, getByRole } = screen;

  switch(state) {
    case 'RESET':
      expect(queryByRole('status')).not.toBeInTheDocument()
      break;
    default:
      const statusIndicator = getByRole('status')
      const { label } = pomodoroStateObjectsData[state];

      expect(statusIndicator).toBeInTheDocument()
      expect(statusIndicator.textContent).toBe(label)
  }
}

export const testTimer = (time: string) => {
  const { getByRole } = screen;

  const timer = getByRole('timer');

  expect(timer).toBeInTheDocument();
  expect(timer.textContent).toBe(time);
}