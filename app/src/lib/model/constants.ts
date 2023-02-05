import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { get } from 'svelte/store';
import { currentPath, isLoading } from './store';

type valueOf<T> = T[keyof T];
type PickType<T, K extends keyof T> = T[K];

const pathId = {
  home: '',
  user: 'user',
  quiz: 'quiz',
  result: 'result'
} as const;

type PathId = valueOf<typeof pathId>;

const wait = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

const runTransition = (path: PathId): void => {
  if (get(currentPath) === path) return;
  isLoading.set(true);
  void goto(base + path);
};

function assert(assert: boolean): void | never {
  if (!assert) throw new Error('Assertion Error!');
}

function isLandscapeDetect(): boolean {
  return navigator.userAgent.match(/iPhone|Android.+Mobile/) == null && window.innerWidth > 730;
}

export type { valueOf, PickType, PathId };
export { pathId, runTransition, wait, assert, isLandscapeDetect };
