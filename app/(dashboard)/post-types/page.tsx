import React from 'react'
import Heading from '../_components/Heading'
import SuperButton from '@/components/SuperButton'
import { PlusCircle } from 'lucide-react'
 

type Props = {}

const PostsTypePage = (props: Props) => {
  return (
    <div>
      <div className='flex items-center justify-between'>
      <Heading title='Post Types' description='Add Post Types'  />
      <SuperButton title='Create Post Type' buttonType='modalButton' modalInputs={{modal:'postType',data:undefined,}}   Icon={<PlusCircle />}  />
      </div>

      

    </div>
  )
}

export default PostsTypePage