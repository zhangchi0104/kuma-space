/** @format */

import { isLocaleCjk } from "@/src/lib/fns";
import type { Hitokoto } from "@repo/db/types";
import { getLocale } from "next-intl/server";
import { hitokotoTable } from "@repo/db/schema";
import { sql } from "drizzle-orm";
import { getDatabaseClient } from "@/src/lib/database";

const defaultHitokoto: Hitokoto = {
	id: 0,
	content: "心有所想，日复一日，必有精进。",
	fromCharacter: "刻晴",
	fromWork: "原神",
	fromWorkType: "anime",
};
const fetchHitokoto = async () => {
	const db = await getDatabaseClient();
	const hitokoto = await db(async (tx) => {
		const hitokoto = await tx
			.select()
			.from(hitokotoTable)
			.orderBy(sql`RANDOM()`)
			.limit(1);
		return hitokoto[0] as Hitokoto | undefined;
	});
	return hitokoto ?? defaultHitokoto;
};

const HitokotoPage = async () => {
	const hitokoto = await fetchHitokoto();
	const locale = await getLocale();
	const wrapper = isLocaleCjk(locale) ? "「」" : '""';
	const hasSource = hitokoto.fromCharacter || hitokoto.fromWork;
	return (
		<div className="flex flex-col justify-center py-12 max-w-lg mx-auto">
			<p className="italic self-start text-md lg:text-md text-foreground">
				{hitokoto.content}
			</p>
			{hasSource && (
				<p className=" self-end text-sm lg:text-md text-muted-foreground mt-3">
					<span>—— </span>
					{hitokoto.fromCharacter && <span>{hitokoto.fromCharacter}</span>}
					{hitokoto.fromWork && (
						<span className="ml-2">
							{wrapper[0]}
							{hitokoto.fromWork}
							{wrapper[1]}
						</span>
					)}
				</p>
			)}
		</div>
	);
};

export default HitokotoPage;
