import ReactMarkdown from 'react-markdown';
import { getValidIDs, getPostByID } from '@/server-actions/post';

export async function generateStaticParams () {
  const postsIDs = await getValidIDs();

  return postsIDs.map(id => ({ id }));
}

export default async function Post ({ params }) {
  const post = await getPostByID(params.id);

  return (
    <main>
      <h1>{post.title}</h1>
      <ReactMarkdown>
        {post.content}
      </ReactMarkdown>
      <p>By {post.authorName}</p>
    </main>
  );
}
