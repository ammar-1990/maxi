"use server";

import { auth } from "@/auth";
import CustomError from "@/lib/CustomError";

import prisma from "@/lib/prisma";
import { throwCustomError } from "@/lib/utils";

export const deletePost = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
 
  try {
    const session = await auth();

    if (!session) return throwCustomError("Unauthorized");
    if (!id) return throwCustomError("id is required");

    const deletedItem = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!deletedItem) return throwCustomError("Items does not exist");

    await prisma.post.delete({
      where: {
        id,
      },
    });

    return { success: true, message: "Item deleted successfully" };
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
