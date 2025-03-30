"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { errorToast } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCategory } from "../actions/createCategory";
import { updateCategory } from "../actions/updateCategory";
import { categorySchema } from "../schemas";
import { useModal } from "@/app/hooks/zustand";
import { useEffect } from "react";

export const useCategory = () => {
  const { setClose, modalInputs } = useModal();
  const router = useRouter();
  const category = modalInputs?.modal === "category" ? modalInputs.data : null;
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
      slug: category?.slug ?? "",
      description: category?.description ?? "",
      image: category?.image ?? "",
    },
  });

  //reset form
  useEffect(() => {
    form.reset({
      name: category?.name ?? "",
      slug: category?.slug ?? "",
      description: category?.description ?? "",
      image: category?.image ?? "",
    });
  }, [category, form]);

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    let res;
    try {
      if (!category) {
        res = await createCategory(values);
      } else {
        res = await updateCategory({ data: values, id: category.id });
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
