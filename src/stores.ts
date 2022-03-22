import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type ScilockaDate from './interfaces/scilochka_data';

export const isSideMenuActive: Writable<boolean> = writable(false);

export const alertMessage: Writable<string> = writable('Test test test');
export const isGoodMessage: Writable<boolean | undefined> = writable(undefined);
export const isAlertActive: Writable<boolean> = writable(false);

export const archiveCash: Writable<ScilockaDate[]> = writable([]);
export const scilochkaCash: Writable<ScilockaDate> = writable();

export const newScilochkaNumber: Writable<number> = writable(0);