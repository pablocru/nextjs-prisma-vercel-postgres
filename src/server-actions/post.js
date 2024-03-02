'use server';

import {
  fetchValidIDs,
  fetchValidSlugs,
  fetchPostByID,
  fetchFeed,
  fetchContentBySlug
} from '@/prisma/post';
import { notFound } from 'next/navigation';

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
 * Get zero or more valid Post Slugs
 * @returns {Promise<string[]>}
 */
export async function getValidSlugs () {
  const res = await fetchValidSlugs();

  const validSlugs = [];
  if (res.length) for (const post of res) validSlugs.push(post.slugs);

  return validSlugs;
}

/**
 * @typedef {Object} Post
 * @property {string} title
 * @property {string} content Post body
 * @property {boolean} published If the post should be public or not
 * @property {string} authorId Identifier of the author
 * @property {string} authorName The name of the author
 */
/**
 * Get a Post by it's ID. Will call `notFound()` if there isn't any one.
 * @param {string} id
 * @returns {Promise<Post>}
 */
export async function getPostByID (id) {
  const post = await fetchPostByID(id);

  if (!post) notFound();

  setAuthorName(post);

  return post;
}

/**
 * @typedef {Object} PostContent
 * @property {string} content Post body
 * @property {string} authorName The name of the author
 */
/**
 * Get a Post by it's ID. Will call `notFound()` if there isn't any one.
 * @param {string} slug
 * @returns {Promise<PostContent>}
 */
export async function getContentBySlug (slug) {
  const post = await fetchContentBySlug(slug);

  if (!post) notFound();

  setAuthorName(post);

  return post;
}

/**
 * @typedef {Object} FeedPost
 * @property {string} title
 * @property {string} slug
 * @property {string} summary
 * @property {string} authorName
 */
/**
 * Get zero or more Posts
 * @returns {Promise<FeedPost[]>}
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
