'use server'

import { z } from "zod"
 
import { auth } from "@/auth";
import { throwCustomError } from "@/lib/utils";
import prisma from "@/lib/prisma";
import CustomError from "@/lib/CustomError";
import { tagsSchema } from "../schemas";

export const updateTag = async ({data,id}:{data:z.infer<typeof tagsSchema>,id:string})=>{
    try {
        const session = await auth();
        if (!session) return throwCustomError("Unauthorized");
    
        if(!id)return throwCustomError('ID Is Required')
    
        const validData = tagsSchema.safeParse(data);
        if (!validData.success)return   throwCustomError("Invalid Inputs");
    
        await prisma.tag.update({
          where:{
            id
          },
            data:{...validData.data}
        })
    
        return {success:true,message:"Tag Updated Successfully"}
    
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
