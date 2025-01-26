"use client";
import SuperButton from "@/components/SuperButton";
import { Category } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import React from "react";
import { deleteCategory } from "../actions/deleteCategory";

type Props = { category: Category };

const CategoryCard = ({ category }: Props) => {
  return (
    <div className="p-4 border flex  gap-3 flex-col">
      <h3 className="font-[500] text-lg capitalize">{category.name}</h3>
      <p className="text-xs text-muted-foreground first-letter:capitalize line-clamp-3">
        {category.description}
      </p>
      <div className="flex items-center gap-2">
        <SuperButton
        className="flex-1 rounded-none"
          buttonType="modalButton"
          modalInputs={{ modal: "category", data: category }}
   
          Icon={<Edit />}
        />
        <SuperButton
        className="flex-1 rounded-none"
          buttonType="modalButton"
          variant="destructive"
          modalInputs={{
            modal: "delete",
            function: async () => {
              return deleteCategory(category.id);
            },
          }}
       
          Icon={<Trash />}
        />
      </div>
    </div>
  );
};

export default CategoryCard;
