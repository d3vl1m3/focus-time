import {
  signIn,
  signOut,
  useSession,
} from 'next-auth/client';

export const SpotifyLogin = () => {
  const [session] = useSession();

  return (
    <button
      className="btn btn-secondary"
      type="button"
      onClick={() => session ? signOut() : signIn()}
    >
      { session ? 'Sign out of Spotify' : 'Sign in to Spotify' }
    </button>
  );
};
