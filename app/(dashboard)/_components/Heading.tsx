import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    title:string,
    description?:string
    titleStiling?:string
    descriptionStyling?:string
}

const Heading = ({titleStiling,title,description,descriptionStyling}: Props) => {
  return (
    <div>
    <p className={cn('font-[500] text-[22px] tracking-[0.5px] text-site-primary capitalize',titleStiling)}>{title}</p>
    {description && <p className={cn('text-xs text-muted-foreground capitalize tracking-[0.5px]',descriptionStyling)}>{description}</p>}
    </div>

  )
}

export default Heading