"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { errorToast } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useModal } from "@/app/hooks/zustand";
import { useEffect } from "react";
import { subCategorySchema } from "../schemas";
import { createSubCategory } from "../actions/createSubCategory";
import { updateSubCategory } from "../actions/updateSubCategory";

export const useSubCategory = () => {
  const { setClose, modalInputs } = useModal();
  const router = useRouter();
  const subCategory =
    modalInputs?.modal === "subCategory" ? modalInputs.data : null;
  const form = useForm<z.infer<typeof subCategorySchema>>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      name: subCategory?.name ?? "",
      slug: subCategory?.slug ?? "",
      description: subCategory?.description ?? "",
      categoryId: subCategory?.categoryId ?? "",
    },
  });

  //reset form
  useEffect(() => {
    form.reset({
      name: subCategory?.name ?? "",
      slug: subCategory?.slug ?? "",
      description: subCategory?.description ?? "",
      categoryId: subCategory?.categoryId ?? "",
    });
  }, [subCategory, form]);

  async function onSubmit(values: z.infer<typeof subCategorySchema>) {
    let res;
    try {
      if (!subCategory) {
        res = await createSubCategory(values);
      } else {
        res = await updateSubCategory({ data: values, id: subCategory.id });
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
