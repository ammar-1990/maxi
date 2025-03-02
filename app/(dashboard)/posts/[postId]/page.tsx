import React from "react";
import PostForm from "./_components/PostForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Heading from "../../_components/Heading";

type Props = {
  params: Promise<{ postId: string }>;
};

const PostIdPage = async ({ params }: Props) => {
  const { postId } = await params;
  const postRes = prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      tags: {
        select: {
          id: true,
        },
      },
    },
  });

  const subCategoriesRes = prisma.subCategory.findMany();
  const postTypeRes = prisma.postType.findMany();
  const tagsRes = prisma.tag.findMany()

  const [post, subCategories, postTypes,tags] = await Promise.all([
    postRes,
    subCategoriesRes,
    postTypeRes,
    tagsRes
  ]);

  if (postId !== "new" && !post) return notFound();

  const title = post ? `Update ${post.title}` : "Create New Post";
  return (
    <div>
      <Heading title={title}/>
      <div className="mt-12 max-w-[600px]">
        <PostForm
          post={
            post ? { ...post, tags: post.tags.map((tag) => tag.id) } : undefined
          }
          postTypes={postTypes}
          subCategories={subCategories}
          tags={tags}
        />
      </div>
    </div>
  );
};

export default PostIdPage;
