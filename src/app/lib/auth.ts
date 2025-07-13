import { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

interface Auth0User {
  app_metadata?: {
    role?: string;
  };
}

const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
      authorization: {
        params: {
          prompt: "login",  // Burayı ekledik
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      const auth0User = user as Auth0User | undefined;
      if (auth0User?.app_metadata?.role) {
        token.role = auth0User.app_metadata.role;
      }

      if (!token.role) {
        token.role = "user";
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      if (session.user) {
        session.user.role = token.role as string | undefined;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
