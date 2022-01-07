import { Index } from '@components/pages';
import { setupIntersectionObserverMock } from '@mocks/intersection-observer.mock';
import { triggerSwitchToggle } from '@test-utils/settings';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

const renderTestComponent = () => render(
  <Index />,
);

afterEach(() => {
  jest.clearAllMocks();
});

describe('On initial load', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    expect(spyError).not.toHaveBeenCalled();
  });
});

describe('When looking at the page', () => {
  beforeEach(() => {
    renderTestComponent();
  });

  test('should see the site header', () => {
    const { queryByText } = screen;
    expect(queryByText('Focus Time')).toBeInTheDocument();
  });

  test('should see the settings button', () => {
    const { getByRole } = screen;
    const settingsButton = getByRole('button', { name: 'Settings' });

    expect(within(settingsButton).getByText('Settings')).toBeInTheDocument();
  });

  test('should see the footer text', () => {
    const { queryByText } = screen;
    expect(queryByText('A D3VL1M3 project')).toBeInTheDocument();
  });
});

describe('When I click the settings button', () => {
  beforeEach(() => {
    renderTestComponent();
    let portalRoot = document.getElementById("portal");
    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.setAttribute('id', 'headlessui-portal-root');
      document.body.appendChild(portalRoot);
    }
    setupIntersectionObserverMock();
  });
  test('the modal should open', () => {
    const { getByRole, queryByRole } = screen;
    const settingsButton = getByRole('button', { name: 'Settings' });

    expect(queryByRole('dialog')).not.toBeInTheDocument();

    triggerSwitchToggle(settingsButton);

    expect(getByRole('dialog')).toBeInTheDocument();
  });
});
