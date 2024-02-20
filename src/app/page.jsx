import { Feed } from '@/components/feed';

export default function Page () {
  return (
    <>
      <header>
        <h1>Next.js + Prisma + Vercel Postgres</h1>
        <p>Fullstack App with Next.js, Prisma, and Vercel Postgres</p>
      </header>

      <main>
        <Feed/>
      </main>
    </>
  );
}
