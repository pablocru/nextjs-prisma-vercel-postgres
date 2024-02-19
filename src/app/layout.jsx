import { plexSans, plexSerif } from '../fonts/ibm-plex';
import '../style/main.css';

export const metadata = {
  title: 'Next.js + Prisma + Vercel Postgres',
  description: 'Fullstack App with Next.js, Prisma, and Vercel Postgres'
};

export default function RootLayout ({ children }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
