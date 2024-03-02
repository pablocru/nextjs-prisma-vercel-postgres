import { expect, describe, afterEach, it, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Post from '@/app/[slug]/page';
import posts from '../mocks/posts.json';
import { fetchContentBySlug } from '@/prisma/post';

vi.mock('@/prisma/post', () => ({
  fetchContentBySlug: vi.fn()
}));
const defaultPost = posts[0];
fetchContentBySlug.mockReturnValue(defaultPost);
const params = { slug: defaultPost.slug };

describe('Post page', () => {
  afterEach(cleanup);

  it('should render content of a Post', async () => {
    render(await Post({ params }));

    expect(
      screen.getByRole(
        'heading',
        { level: 1, name: defaultPost.title }
      )
    ).toBeDefined();
  });
});
