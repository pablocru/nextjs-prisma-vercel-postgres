import prismaClient from '../../lib/prisma';
import styles from './feed.module.css';

export async function Feed () {
  const feed = await prismaClient?.post?.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true }
      }
    }
  });

  return (
    <article>
      <h2>Feed</h2>
      <div className={styles.feed}>
        {
          feed?.length
            ? feed.map(post =>
              <FeedPost key={post.id}
                title={post.title}
                content={post.content}
                authorName={post.author.name}
              />
            )
            : <VoidFeed/>
        }
      </div>
    </article>
  );
}

function FeedPost ({ title, content, authorName }) {
  return (
    <section className={styles.feedPost}>
    <h3>{title}</h3>
    <p>{content}</p>
    <p>By {authorName}</p>
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
