import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const isSideMenuActive: Writable<boolean> = writable(false);