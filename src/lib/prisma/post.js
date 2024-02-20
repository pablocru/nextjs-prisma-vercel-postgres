'use server';

import prismaClient from './client';

const VOID_POSTS = 'There isn\'t any post';

/** Get all valid IDs from the database */
export async function getValidIDs () {
  const validIDs = await prismaClient?.post?.findMany({
    where: { published: true },
    select: { id: true }
  });

  if (!validIDs.length) throw Error(VOID_POSTS);

  return validIDs;
}

/** Fetch Post from Database filtering by it's ID
 * @param {string} id
*/
export async function getPostByID (id) {
  const post = await prismaClient?.post?.findUnique({
    where: { id: String(id) },
    include: {
      author: {
        select: { name: true }
      }
    }
  });

  if (!post) throw Error(VOID_POSTS);

  return post;
}

/** Get Feed Post from Database that include some data in order to
 * `call to action` */
export async function getFeed () {
  const feed = await prismaClient?.post?.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true }
      }
    }
  });

  if (!feed.length) throw Error(VOID_POSTS);

  return feed;
}
