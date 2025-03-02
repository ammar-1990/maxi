'use client'

import CategoryModal from "@/app/(dashboard)/categories/_components/CategoryModal"
import { useEffect, useState } from "react"
import DeleteModal from "./DeleteModal"
import SubCategoryModal from "@/app/(dashboard)/sub-categories/_components/SubCategoryModal"
import PostTypeModal from "@/app/(dashboard)/post-types/_components/PostTypeModal"
import TagModal from "@/app/(dashboard)/tags/_components/tagModal"

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
    <SubCategoryModal />
    <DeleteModal/>
    <PostTypeModal />
    <TagModal/>
    </>
  )
}

export default ModalsProvider