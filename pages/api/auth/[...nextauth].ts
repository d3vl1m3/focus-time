import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  callbacks: {
    async jwt(token, _user, account) {
      // eslint-disable-next-line no-param-reassign
      if (account?.accessToken) token.accessToken = account.accessToken;

      return token;
    },
  },
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope: ['playlist-read-private', 'playlist-read-collaborative'],
    }),
  ],
  secret: process.env.NEXTAUTH_JWT_SECRET,
});
