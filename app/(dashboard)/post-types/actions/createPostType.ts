'use server'

import { z } from "zod"
import { postTypeSchema } from "../schemas"
import { auth } from "@/auth";
import { throwCustomError } from "@/lib/utils";
import prisma from "@/lib/prisma";
import CustomError from "@/lib/CustomError";

export const createPostType = async (data:z.infer<typeof postTypeSchema>)=>{
    try {
        const session = await auth();
        if (!session) return  throwCustomError("Unauthorized");
        if (!(postTypeSchema instanceof z.ZodObject)) {
          throw new Error("postTypeSchema is not a valid zod schema");
        }
        const validData = postTypeSchema.safeParse(data);
        if (!validData.success) return throwCustomError("Invalid Inputs");
    
        await prisma.postType.create({
            data:{...validData.data}
        })
    
        return {success:true,message:"Post Type Created Successfully"}
    
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
}