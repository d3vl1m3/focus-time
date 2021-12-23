import { fireEvent, render, within } from '@testing-library/react';

import { Header } from './header.component';

const mock = jest.fn();

jest.mock('../../../settings-panel/contexts', () => ({
  useSettingsPanelContext: () => ({
    openSettingsModal: mock,
  }),
}));

describe('On initial load', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    render(<Header/>);
    expect(spyError).not.toHaveBeenCalled();
  });

  test('should see the site logo', () => {
    const { queryByText } = render(<Header/>);
    expect(queryByText('pomodoro')).toBeInTheDocument();
  });

  test('should see the settings buttons', () => {
    const { getByRole } = render(<Header/>);
    const settingsButton = getByRole('button');

    expect(within(settingsButton).getByText('Settings')).toBeInTheDocument();
  });
});

describe('When user clicks the settings button', () => {
  test('openSettingsModal should fire', () => {

    const { getByRole } = render(
      <Header/>,
    );
    const settingsButton = getByRole('button');

    fireEvent.click(settingsButton);

    expect(mock).toHaveBeenCalledTimes(1);

  });
});
