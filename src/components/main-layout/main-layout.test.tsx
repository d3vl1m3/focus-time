import { render } from '@testing-library/react';

import { MainLayout } from './main-layout.component';

const spyError = jest.spyOn(console, 'error');
const mockHeader = jest.fn();
const mockFooter = jest.fn();

jest.mock('./components', () => ({
  Header: () => {
    mockHeader();
    return null;
  },
  Footer: () => {
    mockFooter();
    return null;
  },
}));

describe('On initial load', () => {
  beforeEach(() => {
    render(<MainLayout/>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render without errors', () => {
    expect(spyError).not.toHaveBeenCalled();
  });

  test('should render the header', () => {
    expect(mockHeader).toHaveBeenCalledTimes(1);
  });

  test('should render the footer', () => {
    expect(mockFooter).toHaveBeenCalledTimes(1);
  });
});
