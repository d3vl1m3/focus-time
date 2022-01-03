import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import jwt from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_JWT_SECRET;

async function PlaylistApi(req: NextApiRequest, res: NextApiResponse) {
  const {
    playlistId = '37i9dQZF1DX7EF8wVxBVhG',
  } = req.query;

  const token = await jwt.getToken({
    req,
    secret,
  });

  if (token === null) {
    await res.json({ error: 'token was null' });
  } else {
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((body) => res.json(body));
  }

}

export default PlaylistApi;
