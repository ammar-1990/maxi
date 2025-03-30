import React from "react";
import Heading from "../_components/Heading";
import prisma from "@/lib/prisma";
import NoResult from "@/components/NoResult";
import SuperButton from "@/components/SuperButton";
import { PlusCircle } from "lucide-react";
import CategoryCard from "./_components/CategoryCard";

type Props = {};

const CategoriesPage = async (props: Props) => {
  const categories = await prisma.category.findMany();

  return (
    <div>
      <div className="flex items-start justify-between">
        <Heading title="Categories" description="Add Main Categories" />
        <SuperButton
          buttonType="modalButton"
          modalInputs={{ modal: "category", data: undefined }}
          title="Create Category"
          Icon={<PlusCircle />}
        />
      </div>

      <div className="mt-12">
        {categories.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 ">
            {categories.map((category) => (
             <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <NoResult title="No Categories" />
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
