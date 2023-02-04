import type { valueOf } from '$lib/model/constants';

const ENV = import.meta.env;

if (ENV.VITE_FUNCTION_URL === undefined) {
  throw new Error('env is not set correctly');
}

export const ENVS = {
  FUNCTION_URL: ENV.VITE_FUNCTION_URL
} as const;
export type ENVS = valueOf<typeof ENVS>;
