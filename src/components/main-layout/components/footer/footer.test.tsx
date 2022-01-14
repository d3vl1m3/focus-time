import { render } from '@testing-library/react';

import { Footer } from './footer.component';

describe('On initial load', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    render(<Footer/>);
    expect(spyError).not.toHaveBeenCalled();
  });

  test('should see the footer text', () => {
    const { queryByText } = render(<Footer/>);
    expect(queryByText('A D3VL1M3 project')).toBeInTheDocument();
  });
});
