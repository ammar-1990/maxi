"use client";
import SuperButton from "@/components/SuperButton";
import { Category, SubCategory } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import React from "react";
import { deleteSubCategory } from "../actions/deleteSubCategory";

type Props = { subCategory: SubCategory; categories: Category[] };

const SubCategoryCard = ({ subCategory, categories }: Props) => {
  return (
    <div className="p-4 border flex  gap-3 flex-col">
      <h3 className="font-[500] text-lg capitalize">{subCategory.name}</h3>
      <p className="text-xs text-muted-foreground first-letter:capitalize line-clamp-3">
        {subCategory.description}
      </p>
      <div className="flex items-center gap-2 mt-auto">
        <SuperButton
          className="flex-1 rounded-none"
          buttonType="modalButton"
          variant="destructive"
          modalInputs={{
            modal: "delete",
            function: async () => {
              return deleteSubCategory(subCategory.id);
            },
          }}
          Icon={<Trash />}
        />
        <SuperButton
          className="flex-1 rounded-none"
          buttonType="modalButton"
          modalInputs={{ modal: "subCategory", data: subCategory, categories }}
          Icon={<Edit />}
        />
      </div>
    </div>
  );
};

export default SubCategoryCard;
