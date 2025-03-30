"use client";
import SuperButton from "@/components/SuperButton";
import { Category } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import React from "react";
import { deleteCategory } from "../actions/deleteCategory";
import ImageComponent from "@/components/ImageComponent";

type Props = { category: Category };

const CategoryCard = ({ category }: Props) => {
  return (
    <div className="border flex flex-col">
         {category.image && <ImageComponent src={category.image} aspect="video" alt="category-img"  />}
         <div className="p-4  flex  gap-3 flex-col flex-1">
      <h3 className="font-[500] text-lg capitalize">{category.name}</h3>
      <p className="text-xs text-muted-foreground first-letter:capitalize line-clamp-3">
        {category.description}
      </p>
   
      <div className="flex items-center gap-2 mt-auto">
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
        <SuperButton
          className="flex-1 rounded-none"
          buttonType="modalButton"
          modalInputs={{ modal: "category", data: category }}
          Icon={<Edit />}
        />
      
      </div>
    </div>
    </div>

  );
};

export default CategoryCard;
