'use client'
import { useModal } from "@/app/hooks/zustand";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
 
import {
  Form,
} from "@/components/ui/form";
import InputField from "@/components/InputField";
import SuperButton from "@/components/SuperButton";
import { useState } from "react";
import dynamic from "next/dynamic";
import Heading from "../../_components/Heading";

import TextAreaField from "@/components/TextareaField";
import { useSubCategory } from "../hooks/useSubCategory";
import SelectField from "@/components/SelectField";
 
 

type Props = {};

const SubCategoryModal = (props: Props) => {
  const { open, setClose, modalInputs } = useModal();
  const subCategory = modalInputs?.modal === "subCategory" ?  modalInputs.data : undefined;
  const categories = modalInputs?.modal === 'subCategory' ? modalInputs.categories : []
  
  const { form, onSubmit } = useSubCategory();
  const title = subCategory ? `Update ${subCategory.name}` : "Create Sub-Category";
  const isOpen = open && modalInputs?.modal === "subCategory";
  return (
    <Dialog open={isOpen} onOpenChange={()=>{
      if(form.formState.isSubmitting) return
      setClose()
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Heading title="Sub-Category" />
          </DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col w-full gap-4">
          <SelectField
              form={form}
              label="Category"
              name="categoryId"
              placeholder="Choose Main Category"
              renderItem={(item)=>({value:item.id,label:item.name})}
              values={categories}
            />
 
            <InputField
              form={form}
              label="Sub-Category Name"
              name="name"
              placeholder="Enter Sub-Category Title"
            />
            <InputField
              form={form}
              label="Sub-Category Slug"
              name="slug"
              placeholder="Enter Sub-Category Slug"
            />
            <TextAreaField
              form={form}
              label="Sub-Category Description"
              name="description"
              placeholder="Enter Sub-Category Description"
            />
             </div>
            <SuperButton
              variant="site"
              className="w-full"
              type="submit"
              buttonType="loadingButton"
              loading={form.formState.isSubmitting}
              title={subCategory ? "Update" : "Create"}
            />

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SubCategoryModal;
