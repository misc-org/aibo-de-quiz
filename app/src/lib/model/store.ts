import { writable } from 'svelte/store';

const currentPath = writable('');

const isLoading = writable(true);
const isBusy = writable(false);
const isLandscape = writable(false);

export { currentPath, isLoading, isBusy, isLandscape };
