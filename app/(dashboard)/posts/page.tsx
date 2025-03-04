import React from 'react'
import Heading from '../_components/Heading'
import SuperButton from '@/components/SuperButton'
import { PlusCircle } from 'lucide-react'
import SuspenseComponent from '@/components/SuspenseComponent'
import PostFeed from './_components/PostFeed'
import prisma from '@/lib/prisma'
import Search from '@/components/Search'

type Props = {
  searchParams:Promise<{categorySlug:string | undefined,subCategorySlug:string | undefined,postType:string | undefined}>
}

const PostsPage =async ({searchParams}: Props) => {
   const {categorySlug,postType,subCategorySlug} = await searchParams
const categoriesRes = prisma.category.findMany({
  select:{
    slug:true,name:true
  }
})
const subCategoryRes = prisma.subCategory.findMany({
  select:{
    slug:true,name:true
  }
})
const postTypeRes = prisma.postType.findMany({
  select:{
    slug:true,name:true
  }
})


const [categories, subCategories, postTypes] = await Promise.all([categoriesRes,subCategoryRes,postTypeRes])

  return (
    <div>
      <div className='flex items-center justify-between'>
      <Heading title='Posts' description='Add Posts'  />
     <SuperButton buttonType='linkButton' title='Create Post' Icon={<PlusCircle />} href='/posts/new' />
  
      </div>

      <div className='mt-12 flex items-center gap-5'>
    <Search inputType='select' label='Categories' searchParam='categorySlug' values={categories} renderItem={async(item)=>{
      'use server'
      return { label: item.name, value: item.slug };

    }} />
    <Search inputType='select' label='Sub-Category' searchParam='subCategorySlug' values={subCategories} renderItem={async(item)=>{
      'use server'
      return { label: item.name, value: item.slug };

    }} />
    <Search inputType='select' label='Post Type' searchParam='postType' values={postTypes} renderItem={async(item)=>{
      'use server'
      return { label: item.name, value: item.slug };

    }} />
      </div>

      <div className='mt-12'>
        <SuspenseComponent>
          <PostFeed categorySlug={categorySlug} postType={postType} subCategorySlug={subCategorySlug}/>
        </SuspenseComponent>

      </div>
           
    </div>
  )
}

export default PostsPage