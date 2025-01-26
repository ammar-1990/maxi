import SuperButton from '@/components/SuperButton'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    title:string,
    className?:string
    href:string
}

const Logo = ({title,className,href}: Props) => {
  return (
    <SuperButton title={title} buttonType='linkButton' className={className} href={href} />
  )
}

export default Logo