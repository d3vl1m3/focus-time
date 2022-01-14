import { MainLayout } from '@components/main-layout/main-layout.component';
import { setupMatchMediaMock } from '@mocks/match-media/match-media.mock';
import { render } from '@testing-library/react';

import * as ChildComponentsModule from './components';

jest.mock('./components');
const mockHeader = jest.spyOn(ChildComponentsModule, 'Header')
  .mockImplementation(jest.fn(() => null));
const mockFooter = jest.spyOn(ChildComponentsModule, 'Footer')
  .mockImplementation(jest.fn(() => null));

const renderTestComponent = () => render(<MainLayout />);

beforeEach(() => {
  setupMatchMediaMock();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('On initial load', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    renderTestComponent();
    expect(spyError).not.toHaveBeenCalled();
  });
  test('should render header child', () => {
    renderTestComponent();
    expect(mockHeader).toHaveBeenCalled();
  });
  test('should render header child', () => {
    renderTestComponent();
    expect(mockFooter).toHaveBeenCalled();
  });
});
