import React from 'react'
import Heading from '../_components/Heading'
import prisma from '@/lib/prisma';
import SuperButton from '@/components/SuperButton';
import { PlusCircle } from 'lucide-react';
import SubCategoryCard from './_components/SubCategoryCard';
import NoResult from '@/components/NoResult';

type Props = {}

const SubCategoriesPage = async (props: Props) => {
  const categoriesRes =   prisma.category.findMany()
  const subCategoriesRes =   prisma.subCategory.findMany();

  const [categories, subCategories] =await Promise.all([categoriesRes,subCategoriesRes])
  return (
    <div>
    <div className="flex items-start justify-between">
      <Heading title="Sub-Categories" description="Add Sub-Categories" />
      <SuperButton
        buttonType="modalButton"
        modalInputs={{ modal: "subCategory", data: undefined,categories }}
        title="Create Sub-Category"
        Icon={<PlusCircle />}
      />
    </div>

    <div className="mt-12">
      {subCategories.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {subCategories.map((subCategory) => (
           <SubCategoryCard key={subCategory.id} subCategory={subCategory} categories={categories} />
          ))}
        </div>
      ) : (
        <NoResult title=" Sub-Categories" />
      )}
    </div>
  </div>
  )
}

export default SubCategoriesPage