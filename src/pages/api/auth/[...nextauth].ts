/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { gqlClient } from '../../../graphql/client';
import { GQL_MUTATION_AUTHENTICATE_USER } from '../../../graphql/mutations/auth';

type NextAuthSession = Record<string, string>;

const actualDateInSeconds = Math.floor(Date.now() / 1000);
const tokenExpirationInSeconds = Math.floor(7 * 24 * 60 * 60);

export default NextAuth({
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const { login } = await gqlClient.request(
            GQL_MUTATION_AUTHENTICATE_USER,
            {
              email: credentials.email,
              password: credentials.password,
            },
          );

          return login;
        } catch (e) {
          return null;
        }
      },
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt: async (token: NextAuthSession, user, account) => {
      const isSignIn = !!user;

      if (isSignIn) {
        if (account && account?.provider === 'google') {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback?access_token=${account?.accessToken}`,
          );
          const data = await response.json();
          token = setToken(data);
          return Promise.resolve(token);
        } else {
          token = setToken(user as StrapiLoginData);
          return Promise.resolve(token);
        }
      } else {
        if (!token?.expiration) return Promise.resolve({});
        if (actualDateInSeconds > +token.expiration) return Promise.resolve({});
      }

      return Promise.resolve(token);
    },
    session: async (session, token: NextAuthSession) => {
      if (
        !token?.jwt ||
        !token?.id ||
        !token?.expiration ||
        !token?.email ||
        !token?.name
      ) {
        return null;
      }

      session.accessToken = token.jwt;
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
      };

      return { ...session };
    },
    async redirect(url, baseUrl) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith('/')) return baseUrl + url;
      return baseUrl;
    },
  },
});

type StrapiUser = {
  id: string;
  username: string;
  email: string;
};

type StrapiLoginData = {
  jwt: string;
  user: StrapiUser;
};

const setToken = (data: StrapiLoginData): NextAuthSession => {
  if (!data || !data?.user || !data?.jwt) return {};

  return {
    jwt: data.jwt,
    id: data.user.id,
    name: data.user.username,
    email: data.user.email,
    expiration: `${actualDateInSeconds + tokenExpirationInSeconds}`,
  };
};
