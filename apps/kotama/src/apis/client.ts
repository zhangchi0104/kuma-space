/** @format */

import { createEdenTreatyClient } from "@repo/api/eden";

export const client = createEdenTreatyClient(
  process.env.NEXT_PUBLIC_API_URL ?? "",
);
