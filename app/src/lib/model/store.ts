import { writable } from 'svelte/store';
import type Kitchen from '@smui/snackbar/kitchen';
import type { DeviceInfo } from './types/func';
import type { ExecutionStatusList } from './service/api';
import type { PathId } from './constants';

const currentPath = writable<PathId>();
const currentKitchen = writable<Kitchen>();
const currentDeviceInfo = writable<DeviceInfo | undefined>();
const currentExecutionStatus = writable<ExecutionStatusList>('NONE');

const isLoading = writable(true);
const isBusy = writable(false);
const isLandscape = writable(false);

export {
  currentPath,
  currentKitchen,
  currentDeviceInfo,
  currentExecutionStatus,
  isLoading,
  isBusy,
  isLandscape
};
