import ReactMarkdown from 'react-markdown';
import { getValidSlugs, getContentBySlug } from '@/server-actions/post';

export async function generateStaticParams () {
  const postsIDs = await getValidSlugs();

  return postsIDs.map(slug => ({ slug }));
}

export default async function Post ({ params }) {
  const post = await getContentBySlug(params.slug);

  return (
    <main>
      <ReactMarkdown>
        {post.content}
      </ReactMarkdown>
      <p>By {post.authorName}</p>
    </main>
  );
}
