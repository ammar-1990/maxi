import { z } from "zod";

export const tagsSchema = z.object({
    name:z.string().min(1,"Required"),
    slug:z.string().min(1,"Required")
})