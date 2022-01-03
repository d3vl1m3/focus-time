import { render } from '@testing-library/react';

import { Footer } from './footer.component';

describe('On initial load', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    render(<Footer/>);
    expect(spyError).not.toHaveBeenCalled();
  });
});
