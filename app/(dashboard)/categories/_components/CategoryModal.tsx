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
import { useCategory } from "../hooks/useCategory";
import TextAreaField from "@/components/TextareaField";
import { SingleImageUploadField } from "@/components/SingleImageUploadField";
import { useImageUpload } from "@/app/hooks/imageUpload";
 
 

type Props = {};

const CategoryModal = (props: Props) => {
  const { open, setClose, modalInputs } = useModal();
  const category = modalInputs?.modal === "category" ?  modalInputs.data : undefined;
  
  const { form, onSubmit } = useCategory();
  const title = category ? `Update ${category.name}` : "Create Category";
  const isOpen = open && modalInputs?.modal === "category";

  const { ImagePlaceholder, file, isDisabled, setFile, uploadImage } =
  useImageUpload({ form, fieldName: "image" });
  return (
    <Dialog   open={isOpen} onOpenChange={()=>{
      if(form.formState.isSubmitting) return
      setClose()
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Heading title="Category" />
          </DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
       
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col w-full gap-4">
            <InputField
              form={form}
              label="Category Name"
              name="name"
              placeholder="Enter Category Title"
            />
            <InputField
              form={form}
              label="Category Slug"
              name="slug"
              placeholder="Enter Category Slug"
            />
            <TextAreaField
              form={form}
              label="Category Description"
              name="description"
              placeholder="Enter Category Description"
            />
              <SingleImageUploadField
            file={file}
            ImagePlaceholder={ImagePlaceholder()}
            form={form}
            isDisabled={isDisabled}
            name="image"
            setFile={setFile}
            uploadImage={uploadImage}
            label="Upload Post Image"
          />
                     </div>
            <SuperButton
              variant="site"
              className="w-full"
              type="submit"
              buttonType="loadingButton"
              loading={form.formState.isSubmitting}
              title={category ? "Update" : "Create"}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
