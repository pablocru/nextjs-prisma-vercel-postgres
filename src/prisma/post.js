import prismaClient from './client';

/** Get all valid IDs from the database */
export async function fetchValidIDs () {
  return await prismaClient?.post?.findMany({
    where: { published: true },
    select: { id: true }
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

/** Get Feed Post from Database that include some data in order to
 * `call to action` */
export async function fetchFeed () {
  return await prismaClient?.post?.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true }
      }
    }
  });
}
