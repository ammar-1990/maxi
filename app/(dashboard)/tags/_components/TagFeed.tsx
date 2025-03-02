import prisma from '@/lib/prisma'
import React from 'react'
import TagCard from './TagCard'
 

type Props = {}

const TagFeed = async(props: Props) => {

    const tags = await prisma.tag.findMany({
        orderBy:{
            createdAt:"desc"
        }
    })
  return (
    <div className='flex items-center gap-4 flex-wrap'>
        {tags.map(tag=>
            <TagCard key={tag.id} tag={tag} />
        )}
    </div>
  )
}

export default TagFeed