"use client";

import SuperButton from "@/components/SuperButton";
import { PostType } from "@prisma/client";
import { PlusCircle, Trash } from "lucide-react";
import React from "react";
import { deletePostType } from "../actions/deletePostType";

type Props = {
  postType: PostType;
};

const PostTypeCard = ({ postType }: Props) => {
  return (
    <div className="p-4 border flex flex-col gap-4">
      <p className="font-[500] text-md capitalize">{postType.name}</p>
      <div className="flex items-center  gap-1">
        <SuperButton
          className="rounded-none"
          variant="destructive"
          buttonType="modalButton"
          modalInputs={{
            modal: "delete",
            function: () => deletePostType(postType.id),
          }}
          title="Delete"
          Icon={<Trash />}
        />
        <SuperButton
          className="rounded-none"
          buttonType="modalButton"
          modalInputs={{ modal: "postType", data: postType }}
          Icon={<PlusCircle />}
          title="Update"
        />
      </div>
    </div>
  );
};

export default PostTypeCard;
