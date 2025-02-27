'use server'

import { z } from "zod"
import { postTypeSchema } from "../schemas"
import { auth } from "@/auth";
import { throwCustomError } from "@/lib/utils";
import prisma from "@/lib/prisma";
import CustomError from "@/lib/CustomError";

export const updatePostType = async ({data,id}:{data:z.infer<typeof postTypeSchema>,id:string})=>{
    try {
        const session = await auth();
        if (!session) return throwCustomError("Unauthorized");
    
        if(!id)return throwCustomError('ID Is Required')
    
        const validData = postTypeSchema.safeParse(data);
        if (!validData.success)return   throwCustomError("Invalid Inputs");
    
        await prisma.postType.update({
          where:{
            id
          },
            data:{...validData.data}
        })
    
        return {success:true,message:"Post Type Updated Successfully"}
    
      } catch (error) {
        if(error instanceof CustomError){
            return {
                success:false,
                message:error.message
            }
        }
        return {success:false,message:'Internal Server Error'}
      }
}
