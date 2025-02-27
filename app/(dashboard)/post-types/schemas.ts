import { z } from "zod";

export const postTypeSchema = z.object({
    name: z.string().min(2,'Required').max(70),
    slug: z.string().min(2,'Required').max(70),
  

  })