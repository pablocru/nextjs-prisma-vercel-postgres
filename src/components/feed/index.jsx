import Link from 'next/link';
import styles from './feed.module.css';
import ReactMarkdown from 'react-markdown';
import { getFeed } from '../../prisma/post';

export async function Feed () {
  const feed = await getFeed();

  return (
    <article>
      <h2>Feed</h2>
      <div className={styles.feed}>
        {
          feed?.length
            ? feed.map(post =>
              <FeedPost key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                authorName={post.author.name}
              />
            )
            : <VoidFeed />
        }
      </div>
    </article>
  );
}

function FeedPost ({ id, title, content, authorName }) {
  return (
    <section className={styles.feedPost}>
      <h3>{title}</h3>
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
      <p>By {authorName}</p>
      <Link href={`/${id}`}>Take a look</Link>
    </section>
  );
}

function VoidFeed () {
  return (
    <section className={styles.feedPost}>
      <h3>There isn&apos;t any post yet</h3>
    </section>
  );
}
