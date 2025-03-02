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
import { useTags } from "../hooks/useTags";
 
 
 

type Props = {};

const TagModal = (props: Props) => {
  const { open, setClose, modalInputs } = useModal();
  const tag = modalInputs?.modal === "tag" ?  modalInputs.data : undefined;
 
  
  const { form, onSubmit } = useTags();
  const title = tag ? `Update ${tag.name}` : "Create Tag";
  const isOpen = open && modalInputs?.modal === "tag";
  return (
    <Dialog open={isOpen} onOpenChange={()=>{
      if(form.formState.isSubmitting) return
      setClose()
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Heading title="Tag" />
          </DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col w-full gap-4">
       
 
            <InputField
              form={form}
              label="Tag"
              name="name"
              placeholder="Enter Tag Title"
            />
            <InputField
              form={form}
              label="Tag Slug"
              name="slug"
              placeholder="Enter Tag Slug"
            />
        
             </div>
            <SuperButton
              variant="site"
              className="w-full"
              type="submit"
              buttonType="loadingButton"
              loading={form.formState.isSubmitting}
              title={tag ? "Update" : "Create"}
            />

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TagModal;
