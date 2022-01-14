import { SpotifyLogin } from '@components/actions';
import { triggerClick } from '@test-utils/jest';
import { render, screen } from '@testing-library/react';
import * as nextAuthClient from 'next-auth/client';

jest.mock('next-auth/client');

const mockSession = (loggedIn = false) => jest
  .spyOn(nextAuthClient, 'useSession')
  .mockReturnValue([(loggedIn ? { user: { name: 'Foo' } } : null), false]);

const mockSignIn = jest
  .spyOn(nextAuthClient, 'signIn')
  .mockReturnValue(() => null);

const mockSignOut = jest
  .spyOn(nextAuthClient, 'signOut')
  .mockReturnValue(new Promise(() => jest.fn()));

afterEach(() => {
  jest.clearAllMocks();
});

describe('On initial load', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    mockSession();
    render(<SpotifyLogin/>);
    expect(spyError).not.toHaveBeenCalled();
  });
  test('should show the log in button', () => {
    mockSession();
    const { getByRole } = render(<SpotifyLogin/>);
    const signInButton = getByRole('button', { name: 'Sign in to Spotify' });

    expect(signInButton).toBeInTheDocument();
  });
});

describe('When the user is logged out', () => {
  beforeEach(() => {
    mockSession();
    render(<SpotifyLogin/>);
  });
  test('should show the correct label', () => {
    const { getByRole } = screen;
    const signInButton = getByRole('button', { name: 'Sign in to Spotify' });

    expect(signInButton).toBeInTheDocument();
  });
  test('should trigger a sign out when clicked', () => {
    const { getByRole } = screen;
    const signInButton = getByRole('button', { name: 'Sign in to Spotify' });

    triggerClick(signInButton);

    expect(mockSignIn).toHaveBeenCalledTimes(1);
  });
});

describe('When the user is logged in', () => {
  beforeEach(() => {
    mockSession(true);
    render(<SpotifyLogin/>);
  });
  test('should show the correct label', () => {
    const { getByRole } = screen;
    const signInButton = getByRole('button', { name: 'Sign out of Spotify' });

    expect(signInButton).toBeInTheDocument();
  });
  test('should trigger a sign out when clicked', () => {
    const { getByRole } = screen;
    const signInButton = getByRole('button', { name: 'Sign out of Spotify' });

    triggerClick(signInButton);
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});
