"use server";

import { createServerSideSupabaseClient } from "@/src/lib/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { z } from "zod";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { languageCodes } from "@repo/db/schema";
interface PostRequestPayload {
	content: string;
	title: string;
	tagsIds: string[];
}
class PostCreationError extends Error {
	public readonly postId?: number;
	constructor(message: string, postId?: number) {
		super(message);
		this.postId = postId;
	}
}
export const createPost = async (payload: PostRequestPayload) => {
	const supabase = await createServerSideSupabaseClient();
	const { data: user, error: userError } = await supabase.auth.getUser();
	if (userError) {
		throw userError;
	}
	// TODO)) Make this a function
	try {
		const resp = generateObject({
			model: google("gemini-2.0-flash-lite"),
			schema: z.object({
				detectedLanguage: z
					.enum(languageCodes.enumValues)
					.describe("The languages of the avaiable for detection"),
			}),
			prompt: `
        You are a helpful assistant that can detect the language of the content.
        The content is: ${payload.content}
        The languages of the avaiable for detection are: ${languageCodes.enumValues.join(
					", ",
				)}
      `,
		});

		const { data: insertedPost, error: insertPostError } = await supabase
			.from("posts")
			.insert({
				author_id: user.user?.id,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			})
			.select()
			.single();
		if (insertPostError) {
			throw insertPostError;
		}
		if (!insertedPost) {
			throw new Error("Failed to insert post");
		}
		const { detectedLanguage } = (await resp).object;

		const { error: insertPostContentError } = await supabase
			.from("posts_content")
			.insert({
				post_id: insertedPost.id,
				content: payload.content,
				language_code: detectedLanguage,
				title: payload.title,
			});

		if (insertPostContentError) {
			throw new PostCreationError(
				insertPostContentError.message,
				insertedPost.id,
			);
		}

		const { error: insertTagsError } = await supabase.from("posts_tags").insert(
			payload.tagsIds.map((tagId) => ({
				post_id: insertedPost.id,
				tag: tagId,
			})),
		);
		if (insertTagsError) {
			throw new PostCreationError(insertTagsError.message, insertedPost.id);
		}
		return insertedPost.id;
	} catch (error) {
		if (error instanceof PostgrestError) {
			console.error(error);
		} else if (error instanceof PostCreationError) {
			if (error.postId) {
				await supabase.from("posts").delete().eq("id", error.postId);
			}
		}
	}
};

const updatePost = async (postId: string, markdown: string) => {};
