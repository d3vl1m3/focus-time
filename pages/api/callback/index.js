import cookieCutter from 'cookie-cutter';
import request from 'request';

const {
  CLIENT_ID,
  CLIENT_SECRET,
  STATE_KEY,
} = process.env;

const CallbackApi = (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;

  if (state === null || state !== storedState) {
    res.send({
      error: 'state_mismatch',
    });
  } else {
    cookieCutter.set(STATE_KEY);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri: '/',
        grant_type: 'authorization_code',
      },
      headers: {
        // eslint-disable-next-line no-buffer-constructor
        Authorization: `Basic ${new Buffer(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const { access_token: accessToken, refresh_toke: refreshToken } = body;

        cookieCutter.set('spotify_access_token', accessToken, { httpOnly: true });
        cookieCutter.set('spotify_refresh_token', refreshToken, { httpOnly: true });

        // we can also pass the token to the browser to make requests from there
        res.redirect(process.env.REDIRECT_URI);
      } else {
        res.json({
          error: 'invalid_token',
        });
      }
    });
  }
};

export default CallbackApi;
