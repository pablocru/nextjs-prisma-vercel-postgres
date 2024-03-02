import Link from 'next/link';
import styles from './feed.module.css';
import ReactMarkdown from 'react-markdown';

export function Feed ({ posts }) {
  return (
    <article>
      <h2>Feed</h2>
      <div className={styles.feed}>
        {
          posts?.length
            ? posts.map(post =>
              <FeedPost key={post.slug}
                title={post.title}
                slug={post.slug}
                summary={post.summary}
                authorName={post.authorName}
              />
            )
            : <VoidFeed />
        }
      </div>
    </article>
  );
}

function FeedPost ({ title, slug, summary, authorName }) {
  return (
    <section className={styles.feedPost}>
      <h3>{title}</h3>
      <ReactMarkdown>
        {summary}
      </ReactMarkdown>
      <p>By {authorName}</p>
      <Link href={`/${slug}`}>Take a look</Link>
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
