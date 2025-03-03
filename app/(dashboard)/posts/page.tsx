import React from 'react'
import Heading from '../_components/Heading'
import SuperButton from '@/components/SuperButton'
import { PlusCircle } from 'lucide-react'
import SuspenseComponent from '@/components/SuspenseComponent'
import PostFeed from './_components/PostFeed'

type Props = {}

const PostsPage = (props: Props) => {
  return (
    <div>
      <div className='flex items-center justify-between'>
      <Heading title='Posts' description='Add Posts'  />
     <SuperButton buttonType='linkButton' title='Create Post' Icon={<PlusCircle />} href='/posts/new' />
  
      </div>
      <div className='mt-12'>
        <SuspenseComponent>
          <PostFeed/>
        </SuspenseComponent>

      </div>
           
    </div>
  )
}

export default PostsPage