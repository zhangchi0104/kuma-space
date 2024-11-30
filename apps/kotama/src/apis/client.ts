/** @format */

import { createEdenTreatyClient } from '@repo/api/eden';

const v1Client = createEdenTreatyClient('/api');
export const client = v1Client;
