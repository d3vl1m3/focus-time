/**
 * EXAMPLE FILE. COPY AND PASTE IN TO OTHER FILES THEN MODIFY AS REQUIRED.
 * DO NOT REMOVE FROM PROJECT OR INCLUDE IN PRODUCTION BUILD
 */
import { render } from '@testing-library/react';

afterEach(() => {
  jest.clearAllMocks();
});

describe('On initial load', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    render(<>Foo</>);
    expect(spyError).not.toHaveBeenCalled();
  });
});
