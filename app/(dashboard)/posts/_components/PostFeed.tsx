import prisma from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'
import PostCard from './PostCard'

type Props = {}

const PostFeed =async (props: Props) => {

    const posts = await prisma.post.findMany()
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
        {posts.map(item=><PostCard key={item.id} post={item} />)}
    </div>
  )
}

export default PostFeed