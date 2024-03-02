import { expect, describe, afterEach, it } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Home from '@/app/page';

describe('Home page', () => {
  afterEach(cleanup);

  it('should render', async () => {
    render(await Home());
  });

  it('should render a level 1 heading', async () => {
    render(await Home());

    expect(
      screen.getByRole(
        'heading',
        { level: 1, name: 'Next.js + Prisma + Vercel Postgres' }
      )
    ).toBeDefined();
  });
});
