import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url: { pathname } }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  pathname;
};

export const prerender = true;
