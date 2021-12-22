import { fireEvent, render } from '@testing-library/react';
import { Switch } from './switch.component';

describe('When the user toggles the switch', () => {
  it('should call passed in `onChange` prop', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Switch onChange={onChange}>Foo</Switch>,
    );

    fireEvent.click(getByText('Foo'));

    expect(onChange).toHaveBeenCalled();
  });

  it('should toggle the switch state', () => {
    const { getByLabelText, getByRole } = render(<Switch>Foo</Switch>);

    // default
    expect(getByRole('switch').getAttribute('aria-checked')).toBe('false');

    // toggle on
    fireEvent.click(getByLabelText('Foo'));
    expect(getByRole('switch').getAttribute('aria-checked')).toBe('true');

    // toggle off
    fireEvent.click(getByLabelText('Foo'));
    expect(getByRole('switch').getAttribute('aria-checked')).toBe('false');
  });
});
