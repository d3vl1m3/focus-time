import querystring from 'querystring';
import cookieCutter from 'cookie-cutter';

const {
  CLIENT_ID,
  CALLBACK_URI,
  STATE_KEY,
} = process.env;

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) text += possible.charAt(
    Math.floor(Math.random() * possible.length),
  );

  return text;
};

const LoginApi = (req, res) => {
  const state = generateRandomString(16);
  cookieCutter.set(STATE_KEY, '', { 'max-age': 0 });

  // your application requests authorization
  const scope = process.env.PERMISSION_SCOPES;
  res.redirect(`https://accounts.spotify.com/authorize?${
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope,
      redirect_uri: CALLBACK_URI,
      state,
    })}`);
};
export default LoginApi;
