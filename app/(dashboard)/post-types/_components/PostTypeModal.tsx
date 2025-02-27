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
 
import SelectField from "@/components/SelectField";
import { usePostType } from "../hooks/usePostType";
 
 

type Props = {};

const PostTypeModal = (props: Props) => {
  const { open, setClose, modalInputs } = useModal();
  const postType = modalInputs?.modal === "postType" ?  modalInputs.data : undefined;
 
  
  const { form, onSubmit } = usePostType();
  const title = postType ? `Update ${postType.name}` : "Create Post Type";
  const isOpen = open && modalInputs?.modal === "postType";
  return (
    <Dialog open={isOpen} onOpenChange={()=>{
      if(form.formState.isSubmitting) return
      setClose()
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Heading title="Post Type" />
          </DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col w-full gap-4">
       
 
            <InputField
              form={form}
              label="Post Type"
              name="name"
              placeholder="Enter Post Type Title"
            />
            <InputField
              form={form}
              label="Post Type Slug"
              name="slug"
              placeholder="Enter Post Type Slug"
            />
        
             </div>
            <SuperButton
              variant="site"
              className="w-full"
              type="submit"
              buttonType="loadingButton"
              loading={form.formState.isSubmitting}
              title={postType ? "Update" : "Create"}
            />

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PostTypeModal;
