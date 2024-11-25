import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import './globals.css';
import AuthProvider from './context/AuthProvider';

const inter = Inter({ subsets: ['latin'] });
const robtoto = Roboto({
  subsets: ['latin'],
  weight: '300',
});

export const metadata: Metadata = {
  title: 'Thai Trips App',
  description: 'Thai hiking trips around Thailand - demo',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={robtoto.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
