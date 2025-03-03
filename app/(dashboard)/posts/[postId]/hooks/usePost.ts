import { zodResolver } from "@hookform/resolvers/zod";
import { Post, Tag } from "@prisma/client";
import { useForm } from "react-hook-form";
import { postSchema } from "../../schema";
import { z } from "zod";
import { errorToast } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPost } from "../actions/createPost";
import { updatePost } from "../actions/updatePost";

export const usePost = (
  post: (Post & { tags: string[] }) | undefined
) => {

    const router = useRouter()
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      content: post?.content ?? "",
      excerpt: post?.excerpt ?? "",
      imageUrl: post?.imageUrl ?? "",
      seoTitle: post?.seoTitle ?? "",
      seoDescription: post?.seoDescription ?? "",
      postTypeId: post?.postTypeId ?? "",
      subCategoryId: post?.subCategoryId ?? "",
      published: post?.published ?? false,
      tags: post?.tags ?? [],
    },
  });

  async function onSubmit(values: z.infer<typeof postSchema>) {
    let res;
    try {
      if (!post) {
   res = await createPost(values)
      } else {
  res = await updatePost({data:values,id:post.id})
      }

      if (!res?.success) {
        errorToast(res?.message);
      } else {
        

        router.push('/posts')
        router.refresh();
        toast.success(res.message);
      }
    } catch (error) {
      errorToast();
      console.log(error);
    }
  }


  return {form,onSubmit}
};
