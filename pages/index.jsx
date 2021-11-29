import React from 'react';
import {
  signin as SignIn,
  signout as SignOut,
} from 'next-auth/client';

export const Home = () => (
  <>
    <button type="button" onClick={() => SignIn('Spotify')}>Sign in</button>
    <button type="button" onClick={SignOut}>Sign out</button>
    <br />
    <br />
    <button
      type="button"
      onClick={() => {
        fetch('/api/playlists').then((res) => res.json()).then((body) => console.log(body));
      }}
    >
      Fetch Data
    </button>
  </>
);

export default Home;
