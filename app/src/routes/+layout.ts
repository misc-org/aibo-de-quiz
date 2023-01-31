import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url: { pathname } }) => {
	{
		pathname;
	}
};

export const prerender = true;
