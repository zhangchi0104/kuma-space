/** @format */

import { treaty } from '@elysiajs/eden';
import type { App } from 'kuma-elysia';
export const createEdenTreatyClient = (url: string) => treaty<App>(url);
