import { Tag } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { tagsSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { errorToast } from "@/lib/utils";
import { useModal } from "@/app/hooks/zustand";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createTag } from "../actions/createTag";
import { updateTag } from "../actions/updateTag";


export const useTags  =()=>{
    const { setClose, modalInputs } = useModal();
    const router = useRouter();
    const tag =
      modalInputs?.modal === "tag" ? modalInputs.data : null;

    const form = useForm<z.infer<typeof tagsSchema>>({
        resolver: zodResolver(tagsSchema),
        defaultValues: {
         name:tag?.name ?? '',
         slug:tag?.slug ?? ''
        },
      })


      useEffect(() => {
        form.reset({
          name: tag?.name ?? "",
          slug: tag?.slug ?? "",
        
        });
      }, [tag, form]);




      async function onSubmit(values: z.infer<typeof tagsSchema>) {
        let res;
        try {
          if (!tag) {
            res = await createTag(values);
          } else {
            res = await updateTag({ data: values, id: tag.id });
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

}