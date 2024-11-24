/** @format */

import { treaty } from '@elysiajs/eden';
import type { App } from 'kuma-elysia';

export const createEdenTreaty = (url: string) => treaty<App>(url);
