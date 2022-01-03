import {
  getNumberField,
  setInputFieldValue,
  triggerCloseSettingsPanel,
  triggerOpenSettingsPanel,
  triggerSaveSettingsPanel,
} from '@test-utils/settings';
import {
  act, fireEvent, screen,
} from '@testing-library/react';

export const testSettingsPanelIsClosed = () => {
  const { queryByTestId } = screen;
  const settingsModal = queryByTestId('settings-panel');
  expect(settingsModal).not.toBeInTheDocument();
}

export const testValidInputValueSaves = (
  field: HTMLElement,
  initial: string,
  updateValue: string|number,
  expected: string,
) => {
  expect(field).toHaveDisplayValue(initial);

  setInputFieldValue(field, updateValue);

  triggerSaveSettingsPanel();
  triggerOpenSettingsPanel();

  expect(field).toHaveDisplayValue(expected);
}

export const testInvalidInputValueDoesNotSave = (
  name: string,
  initial: string,
  updateValue: number,
  expected: string,
) => {
  const initialField = getNumberField(name);

  expect(initialField).toHaveDisplayValue(initial);

  setInputFieldValue(initialField, updateValue);

  expect(initialField).toHaveDisplayValue(`${updateValue}`);

  triggerSaveSettingsPanel();
  triggerCloseSettingsPanel();
  triggerOpenSettingsPanel();

  const reRenderedField = getNumberField(name);

  expect(reRenderedField).toHaveDisplayValue(expected);
}

export const testSwitchSettingSaves = (
  field: HTMLElement,
) => {
  expect(field).not.toBeChecked();

  act(() => {
    fireEvent.click(field);
  })

  expect(field).toBeChecked();

  triggerSaveSettingsPanel();
  triggerOpenSettingsPanel();

  expect(field).toBeChecked();
}