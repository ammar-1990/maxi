'use server'

import { z } from "zod"
import { postSchema } from "../../schema"
import { auth } from "@/auth";
import { throwCustomError } from "@/lib/utils";
import prisma from "@/lib/prisma";
import CustomError from "@/lib/CustomError";


export const createPost = async(data:z.infer<typeof postSchema>):Promise<{success:boolean,message:string}>=>{

    try {
        const session = await auth();
        if (!session) return  throwCustomError("Unauthorized");
        if (!(postSchema instanceof z.ZodObject)) {
          throw new Error("postSchema is not a valid zod schema");
        }
        const validData = postSchema.safeParse(data);
        if (!validData.success) return throwCustomError("Invalid Inputs");
        const {tags,...rest}= validData.data 
        await prisma.post.create({
            data:{...rest,

                tags:{
                    connect: tags.map(id => ({ id }))
                }
            }
        })
    
        return {success:true,message:"Post Created Successfully"}
    
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