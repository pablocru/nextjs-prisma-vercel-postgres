import { expect, describe, afterEach, it, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Home from '@/app/page';
import { fetchFeed } from '@/prisma/post';
import posts from '../mocks/posts.json';

vi.mock('@/prisma/post', () => ({
  fetchFeed: vi.fn()
}));
fetchFeed.mockReturnValue([]);

describe('Home page', () => {
  afterEach(cleanup);

  it('should render a level 1 heading', async () => {
    render(await Home());

    expect(
      screen.getByRole(
        'heading',
        { level: 1, name: 'Next.js + Prisma + Vercel Postgres' }
      )
    ).toBeDefined();
  });

  it('should render feed posts', async () => {
    fetchFeed.mockReturnValueOnce(posts);

    render(await Home());

    for (const post of posts) {
      expect(
        screen.getByRole(
          'heading',
          { level: 3, name: post.title }
        )
      ).toBeDefined();
    }
  });

  it('should render a disclaimer if there is any post yet', async () => {
    render(await Home());

    expect(
      screen.getByRole(
        'heading',
        { level: 3, name: 'There isn\'t any post yet' }
      )
    ).toBeDefined();
  });
});
