"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { errorToast } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useModal } from "@/app/hooks/zustand";
import { useEffect } from "react";
 

import { postTypeSchema } from "../schemas";
import { createPostType } from "../actions/createPostType";
import { updatePostType } from "../actions/updatePostType";

export const usePostType = () => {
  const { setClose, modalInputs } = useModal();
  const router = useRouter();
  const postType =
    modalInputs?.modal === "postType" ? modalInputs.data : null;
  const form = useForm<z.infer<typeof postTypeSchema>>({
    resolver: zodResolver(postTypeSchema),
    defaultValues: {
      name: postType?.name ?? "",
      slug: postType?.slug ?? "",
 
    },
  });

  //reset form
  useEffect(() => {
    form.reset({
      name: postType?.name ?? "",
      slug: postType?.slug ?? "",
    
    });
  }, [postType, form]);

  async function onSubmit(values: z.infer<typeof postTypeSchema>) {
    let res;
    try {
      if (!postType) {
        res = await createPostType(values);
      } else {
        res = await updatePostType({ data: values, id: postType.id });
      }

      if (!res.success) {
        errorToast(res.message);
      } else {
        setClose();
        router.refresh();
        toast.success(res.message);
      }
    } catch (error) {
      errorToast();
      console.log(error);
    }
  }

  return { form, onSubmit };
};
