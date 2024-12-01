/** @format */

import { createEdenTreatyClient } from '@repo/api/eden';

const v1Client = createEdenTreatyClient(process.env.API_URL ?? '');
export const client = v1Client;
