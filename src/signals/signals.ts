import { signal } from '@preact/signals-react';

export const list = signal<Record<string, string>[]>([]);

export const count = signal(0);
