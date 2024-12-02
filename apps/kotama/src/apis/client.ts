/** @format */

import { createEdenTreatyClient } from '@repo/api/eden';

const v1Client = createEdenTreatyClient(process.env.NEXT_PUBLIC_API_URL ?? '');
export const client = v1Client;
