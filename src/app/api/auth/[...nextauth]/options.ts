import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import db from '@/database/database';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  // First set up Providers
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        try {
          const storedUser = await db.user.findUnique({
            where: { email: credentials.email },
          });

          if (storedUser) {
            //TODO: hash the password:
            /*
            const isPasswordCorrect = await bcrypt.compare(
              await hashPassword(credentials.password),
              await hashPassword(storedUser.password)
            );
            */

            if (credentials.password === storedUser.password) {
              return storedUser;
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      profile(profile: GithubProfile) {
        return {
          ...profile,
          role: profile.role ?? 'user',
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          ...profile,
          role: profile.role ?? 'user',
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  theme: {
    colorScheme: 'dark',
  },
};

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}
