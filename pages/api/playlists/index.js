import jwt from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_JWT_SECRET;

async function PlaylistApi(req, res) {
  const token = await jwt.getToken({ req, secret });

  await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: { Authorization: `Bearer ${token.accessToken}`, 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((body) => res.json(body));
}
export default PlaylistApi;
