import { expect, describe, afterEach, it } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Page from '@/app/page';

describe('Home page', () => {
  afterEach(cleanup);

  it('should render', async () => {
    render(await Page());
  });

  it('should render a level 1 heading', async () => {
    render(await Page());

    expect(
      screen.getByRole(
        'heading',
        { level: 1, name: 'Next.js + Prisma + Vercel Postgres' }
      )
    ).toBeDefined();
  });
});
