import { z } from "zod";

export const subCategorySchema = z.object({
    name: z.string().min(2,'Required').max(70),
    slug: z.string().min(2,'Required').max(70),
    description: z.string().min(2,'Required').max(300),
    categoryId:z.string().min(1,'Required')

  })