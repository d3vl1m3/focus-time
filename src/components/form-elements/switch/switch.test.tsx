import {
  fireEvent,
  render,
} from '@testing-library/react';

import { Switch } from './switch.component';

describe('When the user toggles the switch', () => {
  it('should call passed in `onChange` prop', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Switch
        id={"test"}
        onChange={onChange}
      >
        Foo
      </Switch>,
    );

    fireEvent.click(getByText('Foo'));

    expect(onChange).toHaveBeenCalled();
  });

  it('should toggle the switch state', () => {
    const { getByLabelText, getByRole } = render(<Switch id={"test"}>Foo</Switch>);

    // default
    expect(getByRole('switch')).not.toBeChecked();

    // toggle on
    fireEvent.click(getByLabelText('Foo'));
    expect(getByRole('switch')).toBeChecked();

    // toggle off
    fireEvent.click(getByLabelText('Foo'));
    expect(getByRole('switch')).not.toBeChecked();
  });
});
