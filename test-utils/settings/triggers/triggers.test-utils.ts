import {
  act,
  fireEvent,
  screen,
} from '@testing-library/react';

export const triggerCloseSettingsPanel = () => {
  const { getByRole } = screen;

  const closeModalButton = getByRole('button', { name: 'Cancel' });

  act(() => {
    fireEvent.click(closeModalButton);
  });
};

export const triggerOpenSettingsPanel = () => {
  const { getByRole } = screen;

  const settingsButton = getByRole('button', { name: 'Settings' });

  act(() => {
    fireEvent.click(settingsButton);
  });
};

export const triggerSaveSettingsPanel = () => {
  const { getByRole } = screen;

  const saveSettingsButton = getByRole('button', { name: 'Save' });

  act(() => {
    fireEvent.click(saveSettingsButton);
  });
};

export const triggerSwitchToggle = (element: HTMLElement) => {
  act(() => {
    fireEvent.click(element);
  });
};
