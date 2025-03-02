'use server'

import { z } from "zod"

import { auth } from "@/auth";
import { throwCustomError } from "@/lib/utils";
import prisma from "@/lib/prisma";
import CustomError from "@/lib/CustomError";
import { tagsSchema } from "../schemas";

export const createTag = async (data:z.infer<typeof tagsSchema>)=>{
    try {
        const session = await auth();
        if (!session) return  throwCustomError("Unauthorized");
        if (!(tagsSchema instanceof z.ZodObject)) {
          throw new Error("tagsSchema is not a valid zod schema");
        }
        const validData = tagsSchema.safeParse(data);
        if (!validData.success) return throwCustomError("Invalid Inputs");
    
        await prisma.tag.create({
            data:{...validData.data}
        })
    
        return {success:true,message:"Tag Created Successfully"}
    
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