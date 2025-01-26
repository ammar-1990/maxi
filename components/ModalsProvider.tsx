'use client'

import CategoryModal from "@/app/(dashboard)/categories/_components/CategoryModal"
import { useEffect, useState } from "react"
import DeleteModal from "./DeleteModal"

type Props = {}

const ModalsProvider = (props: Props) => {
    const [mounted, setMounted] = useState(false)

    useEffect(()=>{
        setMounted(true)
    },[])

    if(!mounted) return null
  return (
    <>
    <CategoryModal />
    <DeleteModal/>
    </>
  )
}

export default ModalsProvider