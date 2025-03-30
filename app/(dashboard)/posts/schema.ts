import { z } from "zod";



export const postSchema = z.object({
    title :z.string().min(1,"Required"),        
    slug:z.string().min(1,"Required"),      
    content:z.string().min(1,"Required"),      
    excerpt:z.string().min(1,"Required"),      
    imageUrl:z.string().min(1,"Required"),    
    seoTitle:z.string().min(1,"Required"),      
    seoDescription:z.string().min(1,"Required"),      
    published:z.boolean(),
    isFeatured:z.boolean(),
    author:z.string().optional(),
    postTypeId:z.string().min(1,"Required"),      
    subCategoryId:z.string().min(1,"Required"),      
    tags:z.array(z.string()) 
})