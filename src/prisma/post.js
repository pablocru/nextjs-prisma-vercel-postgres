import prismaClient from './client';

/** Get all valid IDs from the database */
export async function fetchValidIDs () {
  return await prismaClient?.post?.findMany({
    where: { published: true },
    select: { id: true }
  });
}

/** Get all valid Slugs from the database */
export async function fetchValidSlugs () {
  return await prismaClient?.post?.findMany({
    where: { published: true },
    select: { slug: true }
  });
}

/** Fetch Post from Database filtering by it's ID
 * @param {string} id
*/
export async function fetchPostByID (id) {
  return await prismaClient?.post?.findUnique({
    where: { id: String(id) },
    include: {
      author: {
        select: { name: true }
      }
    }
  });
}

/** Fetch content of a Post filtering by it's Slug
 * @param {string} slug
*/
export async function fetchContentBySlug (slug) {
  return await prismaClient?.post?.findUnique({
    where: { slug: String(slug) },
    select: {
      content: true,
      author: {
        select: {
          name: true
        }
      }
    }
  });
}

/** Get Feed Post from Database that include some data in order to
 * `call to action` */
export async function fetchFeed () {
  return await prismaClient?.post?.findMany({
    where: { published: true },
    select: {
      title: true,
      slug: true,
      summary: true,
      author: {
        select: {
          name: true
        }
      }
    }
  });
}
