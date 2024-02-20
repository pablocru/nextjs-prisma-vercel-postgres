import ReactMarkdown from 'react-markdown';
import { getPostByID, getValidIDs } from '@/prisma/post';

export const dynamicParams = false;

export async function generateStaticParams () {
  const posts = await getValidIDs();

  return posts.map(post => ({
    id: post.id
  }));
}

export default async function Post ({ params }) {
  const post = await getPostByID(params.id);

  return (
    <main>
      <h1>{post.title}</h1>
      <ReactMarkdown>
        {post.content}
      </ReactMarkdown>
      <p>By {post.author.name}</p>
    </main>
  );
}
