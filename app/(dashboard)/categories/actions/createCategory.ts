"use server";

import { auth } from "@/auth";
 
import { z } from "zod";
 
import prisma from "@/lib/prisma";
import { categorySchema } from "../schemas";
import { throwCustomError } from "@/lib/utils";
import CustomError from "@/lib/CustomError";

export const createCategory = async (data: z.infer<typeof categorySchema>):Promise<{success:boolean,message:string}> => {
  try {
    const session = await auth();
    if (!session) return  throwCustomError("Unauthorized");
    if (!(categorySchema instanceof z.ZodObject)) {
      throw new Error("categorySchema is not a valid zod schema");
    }
    const validData = categorySchema.safeParse(data);
    if (!validData.success) return throwCustomError("Invalid Inputs");

    await prisma.category.create({
        data:{...validData.data}
    })

    return {success:true,message:"Category Created Successfully"}

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
