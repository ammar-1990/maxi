'use client'

import ImageComponent from '@/components/ImageComponent'
import SuperButton from '@/components/SuperButton'
import { Post } from '@prisma/client'
import React from 'react'
import { deletePost } from '../[postId]/actions/deletePost'
import { Edit, Trash } from 'lucide-react'

type Props = {
    post:Post
}

const PostCard = ({post}: Props) => {
  return (
<div key={post.id} className='p-4 border flex flex-col gap-2'>
{post.imageUrl && <ImageComponent alt='img' aspect='video' src={post.imageUrl} />}
<div>
    <p className='font-[500] capitalize'>
    {post.title}
    </p>
    <p className='text-muted-foreground text-sm'>{post.excerpt}</p>
</div>
<div className='flex items-center gap-2 mt-auto w-full'>
    <SuperButton className='flex-1' buttonType='modalButton' variant='destructive' modalInputs={{modal:'delete',function:()=>deletePost(post.id)}} Icon={<Trash/>} title='delete' />
    <SuperButton className='flex-1' buttonType='linkButton' href={`/posts/${post.id}`} title='Update' Icon={<Edit />} />
</div>

 
</div>
  )
}

export default PostCard