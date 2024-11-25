import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import db from '@/database/database';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { Account, User as AuthUser } from 'next-auth';

export const authOptions: NextAuthOptions = {
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
          id: profile.sub,
          picture: profile.avatar_url,
          name: profile.name,
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
          id: profile.sub,
          picture: profile.avatar_url,
          name: profile.name,
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
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
    async signIn({
      user,
      account,
    }: {
      user: AuthUser;
      account: Account | null;
    }) {
      if (account?.provider == 'credentials') {
        return true;
      }
      if (account?.provider == 'github' || account?.provider == 'google') {
        try {
          if (!user.email) {
            throw new Error('User email is null or undefined');
          }
          const existingUser = await db.user.findUnique({
            where: { email: user.email },
          });
          if (!existingUser) {
            await db.user.create({
              data: {
                email: user.email,
                role: 'user',
                password: 'password',
                id: user.id,
                name: user.name ?? user.email,
                adminAccess: false,
              },
            });

            return true;
          }
          return true;
        } catch (err) {
          console.log('Error saving user', err);
          return false;
        }
      }
      return false;
    },
  },

  theme: {
    colorScheme: 'dark',
  },
};
