/** @format */

import { isLocaleCjk } from "@/src/lib/fns";

import { getLocale } from "next-intl/server";
import { createServerSideSupabaseClient } from "@/src/lib/supabase/server";

const defaultHitokoto = {
	id: 0,
	content: "心有所想，日复一日，必有精进。",
	from_character: "刻晴",
	from_work: "原神",
	from_work_type: "anime",
};
const fetchHitokoto = async () => {
	const supabase = await createServerSideSupabaseClient();
	const { data, error } = await supabase.from("hitokoto").select().limit(1);
	if (error) {
		throw error;
	}
	if (!data) {
		throw new Error("Failed to fetch hitokoto");
	}
	const hitokoto = data[0];
	return hitokoto ?? defaultHitokoto;
};

const HitokotoPage = async () => {
	const hitokoto = await fetchHitokoto();
	const locale = await getLocale();
	const wrapper = isLocaleCjk(locale) ? "「」" : '""';
	const hasSource = hitokoto.from_character || hitokoto.from_work;
	return (
		<div className="flex flex-col justify-center py-12 max-w-lg mx-auto">
			<p className="italic self-start text-md lg:text-md text-foreground">
				{hitokoto.content}
			</p>
			{hasSource && (
				<p className=" self-end text-sm lg:text-md text-muted-foreground mt-3">
					<span>—— </span>
					{hitokoto.from_character && <span>{hitokoto.from_character}</span>}
					{hitokoto.from_work && (
						<span className="ml-2">
							{wrapper[0]}
							{hitokoto.from_work}
							{wrapper[1]}
						</span>
					)}
				</p>
			)}
		</div>
	);
};

export default HitokotoPage;
