import { render } from '@testing-library/react';

import { NumberInput } from './number-input.component';

describe('When the prop', () => {
  it('`label` is passed in a label should be visible', () => {
    const { queryByLabelText } = render(<NumberInput id="test">Foo</NumberInput>);
    expect(queryByLabelText('Foo')).toBeInTheDocument();
  });
  it('`unit` is passed in the unit label should be visible', () => {
    const { queryByLabelText } = render(
      <NumberInput
        id="test"
        unit="cm"
      >
        Foo
      </NumberInput>);
    expect(queryByLabelText('cm')).toBeInTheDocument();
  });
});
