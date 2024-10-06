import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const options = {
  callbacks: {
    async jwt({ account, profile, token, trigger, user }) {
      console.log('jwt', { account, profile, token, trigger, user });

      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ newSession, session, token, trigger, user }) {
      console.log('session', {
        newSession,
        session,
        token,
        trigger,
        user,
      });

      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // implement your own logic here
        console.log('authorize', credentials);

        return null;
      },
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      name: 'Shopify',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthOptions;

export default NextAuth(options);
