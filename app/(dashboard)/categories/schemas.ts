import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().min(2,'Required').max(70),
    slug: z.string().min(2,'Required').max(70),
    description: z.string().min(2,'Required').max(300),
    image:z.string().optional()

  })