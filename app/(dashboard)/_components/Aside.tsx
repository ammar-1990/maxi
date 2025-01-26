import React from 'react'
import Logo from './Logo'
import NavLinks from './NavLinks'
import SuperButton from '@/components/SuperButton'

type Props = {}

const Aside = (props: Props) => {
  return (
    <aside className='flex flex-col h-full pb-4'>
        <Logo title='MAXI' className='text-6xl text-center p-4 w-full bg-white text-black h-[100px] hover:bg-white' href='/' />
        <NavLinks />
        <SuperButton variant='secondary' iconColor='text-black' className="mt-auto mx-6  py-6  rounded-none" buttonType="signOut" title="Logout"  />
    </aside>
  )
}

export default Aside