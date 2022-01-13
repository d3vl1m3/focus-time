import { triggerClick } from '@test-utils/jest';
import { getSwitchToggle } from "@test-utils/settings";
import {
  render,
  screen,
} from '@testing-library/react';

import { Switch, SwitchProps } from './switch.component';

const renderTestComponent = (props?: Partial<SwitchProps>) => render(
  <Switch
    id={"test"}
    {...props}
  >
    Foo
  </Switch>,
);

describe('On initial load', () => {
  describe('On initial load', () => {
    test('should render without errors', () => {
      const spyError = jest.spyOn(console, 'error');
      renderTestComponent();
      expect(spyError).not.toHaveBeenCalled();
    });
  });

  it('should allow checked by default', () => {
    const { getByRole } = renderTestComponent({ defaultValue: true });

    // default
    expect(getByRole('switch')).toBeChecked();
  });

  it('should allow not checked by default', () => {
    const { getByRole } = renderTestComponent({ defaultValue: false });

    // default
    expect(getByRole('switch')).not.toBeChecked();
  });

  it('should render the label', () => {
    const { getByLabelText } = renderTestComponent();

    // default
    expect(getByLabelText('Foo')).toBeInTheDocument();
  });
});

describe('When the user toggles the switch', () => {
  it('should call passed in `onChange` prop with checked value', () => {
    const mockOnChange = jest.fn((checked) => checked);

    renderTestComponent({
      onChange: (checked: boolean) => mockOnChange(checked),
    });
    const SwitchToggle = getSwitchToggle('Foo');

    triggerClick(SwitchToggle);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(true);

    triggerClick(SwitchToggle);

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith(false);
  });

  it('should alternate the switch accordingly', () => {
    renderTestComponent();

    const { getByRole } = screen;

    const SwitchToggle = getSwitchToggle('Foo');

    // default
    expect(getByRole('switch')).not.toBeChecked();

    // toggle on
    triggerClick(SwitchToggle);
    expect(getByRole('switch')).toBeChecked();

    // toggle off
    triggerClick(SwitchToggle);
    expect(getByRole('switch')).not.toBeChecked();

    // toggle on
    triggerClick(SwitchToggle);
    expect(getByRole('switch')).toBeChecked();

    // toggle off
    triggerClick(SwitchToggle);
    expect(getByRole('switch')).not.toBeChecked();
  });
});
