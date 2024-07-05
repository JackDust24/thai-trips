import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import db from '@/database/database';
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
          console.log(storedUser);

          if (storedUser) {
            //TODO: hash the password:
            /*
            const isPasswordCorrect = await bcrypt.compare(
              await hashPassword(credentials.password),
              await hashPassword(storedUser.password)
            );
            console.log(credentials.password, storedUser.password);
            console.log(isPasswordCorrect); */

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
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  theme: {
    colorScheme: 'dark',
  },
};

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}
