'use server';

import { fetchValidIDs, fetchPostByID, fetchFeed } from '@/prisma/post';
import { notFound } from 'next/navigation';

/**
 * @typedef {Object} Post
 * @property {string} id Identifier of the post
 * @property {string} title Post title
 * @property {string} content Post body
 * @property {boolean} published If the post should be public or not
 * @property {string} authorId Identifier of the author
 * @property {string} authorName The name of the author
 */

/**
 * Get zero or more valid Post IDs
 * @returns {Promise<string[]>}
 */
export async function getValidIDs () {
  const res = await fetchValidIDs();

  const validIDs = [];
  if (res.length) for (const post of res) validIDs.push(post.id);

  return validIDs;
}

/**
 * Get a Post by it's ID. Will call `notFound()` if there isn't any one.
 * @param {string} _id
 * @returns {Promise<Post>}
 */
export async function getPostByID (_id) {
  const post = await fetchPostByID(_id);

  if (!post) notFound();

  setAuthorName(post);

  return post;
}

/**
 * Get zero or more Posts
 * @returns {Promise<Post[]>}
 */
export async function getFeed () {
  const posts = await fetchFeed();

  if (posts.length) for (const post of posts) setAuthorName(post);

  return posts;
}

/**
 * Sets the `authorName` property of a post object to the value of the `name`
 * property inside `author`, and then deletes the `author` property.
 */
function setAuthorName (post) {
  post.authorName = post.author.name;
  delete post.author;
}
