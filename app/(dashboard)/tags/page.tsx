import React from 'react'
import Heading from '../_components/Heading'
import SuperButton from '@/components/SuperButton'
import { PlusCircle } from 'lucide-react'
import SuspenseComponent from '@/components/SuspenseComponent'
import TagFeed from './_components/TagFeed'

type Props = {}

const TagsPage = (props: Props) => {
  return (
    <div>
      <div className='flex items-center justify-between'>
      <Heading title='Tags' description='Add Tags'  />
      <SuperButton buttonType='modalButton'modalInputs={{modal:'tag',data:undefined}} title='Create Tag' Icon={<PlusCircle/>}/>
      </div>

<div className='mt-12'>
  <SuspenseComponent>
    <TagFeed/>
  </SuspenseComponent>
</div>
     
    </div>
  )
}

export default TagsPage