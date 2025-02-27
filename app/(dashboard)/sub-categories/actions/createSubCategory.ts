"use server";

import { auth } from "@/auth";
 
import { z } from "zod";
 
import prisma from "@/lib/prisma";
 
import { throwCustomError } from "@/lib/utils";
import CustomError from "@/lib/CustomError";
import { subCategorySchema } from "../schemas";

export const createSubCategory = async (data: z.infer<typeof subCategorySchema>):Promise<{success:boolean,message:string}> => {
  try {
    const session = await auth();
    if (!session) return  throwCustomError("Unauthorized");
    if (!(subCategorySchema instanceof z.ZodObject)) {
      throw new Error("categorySchema is not a valid zod schema");
    }
    const validData = subCategorySchema.safeParse(data);
    if (!validData.success) return throwCustomError("Invalid Inputs");

    await prisma.subCategory.create({
        data:{...validData.data}
    })

    return {success:true,message:"Sub-category Created Successfully"}

  } catch (error) {
    console.error(error)
    if(error instanceof CustomError){
        return {
            success:false,
            message:error.message
        }
    }
    return {success:false,message:'Internal Server Error'}
  }
};
