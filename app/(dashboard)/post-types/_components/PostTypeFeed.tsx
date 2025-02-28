import prisma from '@/lib/prisma'
import React from 'react'
import PostTypeCard from './PostTypeCard'

type Props = {}

const PostTypeFeed = async(props: Props) => {

    const postTypes = await prisma.postType.findMany({
        orderBy:{
            createdAt:"desc"
        }
    })
  return (
    <div className='flex items-center gap-4 flex-wrap'>
        {postTypes.map(postType=>
            <PostTypeCard key={postType.id} postType={postType} />
        )}
    </div>
  )
}

export default PostTypeFeed