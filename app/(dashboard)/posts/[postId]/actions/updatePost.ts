'use server'

import { z } from "zod";
import { postSchema } from "../../schema";
import CustomError from "@/lib/CustomError";
import { auth } from "@/auth";
import { throwCustomError } from "@/lib/utils";
import prisma from "@/lib/prisma";

export const updatePost = async ({
  data,
  id,
}: {
  data: z.infer<typeof postSchema>;
  id: string;
}) => {
  try {
    const session = await auth();
    if (!session) return throwCustomError("Unauthorized");

    if (!(postSchema instanceof z.ZodObject)) {
      throw new Error("postSchema is not a valid zod schema");
    }

    const validData = postSchema.safeParse(data);
    if (!validData.success) return throwCustomError("Invalid Inputs");

    const { tags, ...rest } = validData.data;

    // Fetch the existing tags for this post
    const existingPost = await prisma.post.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!existingPost) {
      return throwCustomError("Post not found");
    }

    const existingTagIds = existingPost.tags.map((tag) => tag.id);

    // Tags to disconnect (they are in DB but not in the incoming data)
    const tagsToDisconnect = existingTagIds
      .filter((existingTagId) => !tags.includes(existingTagId))
      .map((id) => ({ id }));

    // Tags to connect (incoming tags not currently linked to the post)
    const tagsToConnect = tags
      .filter((incomingTagId) => !existingTagIds.includes(incomingTagId))
      .map((id) => ({ id }));

    // Perform the update
    await prisma.post.update({
      where: { id },
      data: {
        ...rest,
        tags: {
          disconnect: tagsToDisconnect,  // Remove tags that were removed
          connect: tagsToConnect,        // Add new tags
        },
      },
    });

    return { success: true, message: "Post updated successfully" };

  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      return {
        success: false,
        message: error.message,
      };
    }
    return { success: false, message: "Internal Server Error" };
  }
};
