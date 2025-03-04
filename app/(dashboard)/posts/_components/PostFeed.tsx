import prisma from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'
import PostCard from './PostCard'

type Props = {categorySlug:string | undefined,subCategorySlug:string | undefined,postType:string | undefined}

const PostFeed =async ({categorySlug,postType,subCategorySlug}: Props) => {

    const posts = await prisma.post.findMany({
      where:{
        ...(categorySlug && {subCategory:{category:{slug:categorySlug}}}),
        ...(postType && {postType:{slug:postType}}),
        ...(subCategorySlug && {subCategory:{ slug:subCategorySlug}}),
      }
    })
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
        {posts.map(item=><PostCard key={item.id} post={item} />)}
    </div>
  )
}

export default PostFeed