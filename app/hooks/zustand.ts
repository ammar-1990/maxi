 
import { Category, PostType, SubCategory } from '@prisma/client'
import { create } from 'zustand'

type ModalStore = {
  open: boolean
  modalInputs:ModalInputs | null
  setOpen:(data:ModalInputs)=>void
  setClose:()=>void
}

export type ModalInputs = 
{
modal:'category',
data?:Category
}  |{
  modal:'subCategory',
  data?:SubCategory,
  categories:Category[]
  } |
  { modal:'postType',
    data?:PostType
  }
   |{
  modal:'delete',
  function:()=>Promise<{success:boolean,message:string}>
}

export const useModal = create<ModalStore>()((set) => ({
open:false,
modalInputs:null,
setOpen:(modalInputs:ModalInputs)=>set((state)=>({open:true,modalInputs})),
setClose:()=>set((state)=>({open:false,modalInputs:null})),
}))