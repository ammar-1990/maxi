import React from 'react'
import Heading from '../_components/Heading'
import SuperButton from '@/components/SuperButton'
import { PlusCircle } from 'lucide-react'

type Props = {}

const PostsPage = (props: Props) => {
  return (
    <div>
      <div className='flex items-center justify-between'>
      <Heading title='Posts' description='Add Posts'  />
     <SuperButton buttonType='linkButton' title='Create Post' Icon={<PlusCircle />} href='/posts/new' />
  
      </div>
           
    </div>
  )
}

export default PostsPage