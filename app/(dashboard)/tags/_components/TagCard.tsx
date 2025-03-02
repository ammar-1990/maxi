"use client";

import SuperButton from "@/components/SuperButton";
import { PostType, Tag } from "@prisma/client";
import { PlusCircle, Trash } from "lucide-react";
import React from "react";
import { deleteTag } from "../actions/deleteTag";
 

type Props = {
  tag: Tag;
};

const TagCard = ({ tag }: Props) => {
  return (
    <div className="p-4 border flex flex-col gap-4">
      <p className="font-[500] text-md capitalize">{tag.name}</p>
      <div className="flex items-center  gap-1">
        <SuperButton
          className="rounded-none"
          variant="destructive"
          buttonType="modalButton"
          modalInputs={{
            modal: "delete",
            function: () => deleteTag(tag.id),
          }}
          title="Delete"
          Icon={<Trash />}
        />
        <SuperButton
          className="rounded-none"
          buttonType="modalButton"
          modalInputs={{ modal: "tag", data: tag }}
          Icon={<PlusCircle />}
          title="Update"
        />
      </div>
    </div>
  );
};

export default TagCard;
