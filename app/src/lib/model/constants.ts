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

function assert(assert: boolean): void | never {
  if (!assert) throw new Error('Assertion Error!');
}

function isLandscapeDetect(): boolean {
  return navigator.userAgent.match(/iPhone|Android.+Mobile/) == null && window.innerWidth > 730;
}

function runTransition(path: PathId): void {
  if (get(currentPath) === path) return;
  currentPath.set(path);
  isLoading.set(true);

  const pathTo = `${base}/${path}`;
  void goto(pathTo);
}

export type { PathId, valueOf, PickType };
export { pathId, wait, assert, isLandscapeDetect, runTransition };
