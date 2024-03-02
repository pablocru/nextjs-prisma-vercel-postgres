import { Feed } from '@/components/feed';
import { getFeed } from '@/server-actions/post';

export default async function Home () {
  const posts = await getFeed();

  return (
    <>
      <header>
        <h1>Next.js + Prisma + Vercel Postgres</h1>
        <p>Fullstack App with Next.js, Prisma, and Vercel Postgres</p>
      </header>

      <main>
        <Feed posts={posts}/>
      </main>
    </>
  );
}
