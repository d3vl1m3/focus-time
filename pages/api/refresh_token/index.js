import request from 'request';

const {
  CLIENT_ID,
  CLIENT_SECRET,
} = process.env;

const RefreshTokenApi = (req, res) => {
  // requesting access token from refresh token
  const { refresh_token: refreshToken } = req.query;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    // eslint-disable-next-line no-buffer-constructor
    headers: { Authorization: `Basic ${new Buffer(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}` },
    form: {
      grant_type: 'refresh_token',
      refreshToken,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const { access_token: accessToken } = body;
      res.json({
        accessToken,
      });
    }
  });
};

export default RefreshTokenApi;
