import React from 'react';
import {
  useSession,
  signin as SignIn,
  signout as SignOut,
} from 'next-auth/client';

export const Index = () => {
  const [session] = useSession();

  return (
    <>
      <nav>
        {session ? (
          <button
            className="bg-blue-500 px-4 py-2 rounded"
            type="button"
            onClick={SignOut}
          >
            Sign out
          </button>
        ) : (
          <button
            className="bg-blue-500 px-4 py-2 rounded"
            type="button"
            onClick={() => SignIn('Spotify')}
          >
            Sign in
          </button>
        )}
      </nav>
      <br />
      <br />
      <button
        type="button"
        onClick={() => {
          fetch('/api/playlists?id=4')
            .then((res) => res.json())
            // eslint-disable-next-line no-console
            .then((body) => console.log(body));
        }}
      >
        Fetch Data
      </button>
    </>
  );
};
