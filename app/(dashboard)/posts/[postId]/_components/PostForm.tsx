"use client";
import { Post, PostType, SubCategory, Tag } from "@prisma/client";
import React from "react";
import { usePost } from "../hooks/usePost";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SuperButton from "@/components/SuperButton";
import InputField from "@/components/InputField";
import TextAreaField from "@/components/TextareaField";
import { SingleImageUploadField } from "@/components/SingleImageUploadField";
import { useImageUpload } from "@/app/hooks/imageUpload";
import EditorField from "@/components/EditorField";
import SelectField from "@/components/SelectField";
import CheckboxField from "@/components/CheckboxField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
  postTypes: PostType[];
  subCategories: SubCategory[];
  post?: Post & { tags: string[] };
  tags: Tag[];
};

const PostForm = ({ postTypes, subCategories, post, tags }: Props) => {
  const { form, onSubmit } = usePost(post);
  const { ImagePlaceholder, file, isDisabled, setFile, uploadImage } =
    useImageUpload({ form, fieldName: "imageUrl" });
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <SelectField
            form={form}
            label="Select Sub-Category"
            name="subCategoryId"
            placeholder="Select Sub-Category"
            values={subCategories}
            renderItem={(item) => ({ label: item.name, value: item.id })}
          />
          <SelectField
            form={form}
            label="Select Post Type"
            name="postTypeId"
            placeholder="Select Post Type"
            values={postTypes}
            renderItem={(item) => ({ label: item.name, value: item.id })}
          />
          <InputField
            form={form}
            label="Title"
            name="title"
            placeholder="Post Title"
          />
          <InputField
            form={form}
            label="Slug"
            name="slug"
            placeholder="Post Slug"
          />
          <InputField
            form={form}
            label="Seo Title"
            name="seoTitle"
            placeholder="Post Seo Title"
          />
          <TextAreaField
            form={form}
            label="Seo Description"
            name="seoDescription"
            placeholder="Post Seo Description"
          />
          <TextAreaField
            form={form}
            label="Excerpt"
            name="excerpt"
            placeholder="Post Excerpt"
          />
          <SingleImageUploadField
            file={file}
            ImagePlaceholder={ImagePlaceholder()}
            form={form}
            isDisabled={isDisabled}
            name="imageUrl"
            setFile={setFile}
            uploadImage={uploadImage}
            label="Upload Post Image"
          />

          <EditorField
            editorStyles="min-h-[150px]"
            form={form}
            label="Post Content"
            name="content"
            placeholder="Write Post Content"
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 md:grid-cols-3">
                    {tags.map((tag, index) => (
                      <div className="flex items-center gap-2  " key={tag.id}>
                        <Checkbox
                          className="cursor-pointer"
                          id={`tag-${tag.name}-${index}`}
                          checked={field.value?.includes(tag.id)}
                          onCheckedChange={() => {
                            if (!field.value?.includes(tag.id)) {
                              field.onChange([...field.value, tag.id]);
                            } else {
                              field.onChange(
                                field.value.filter((el) => el !== tag.id)
                              );
                            }
                          }}
                        />
                        <FormLabel
                          htmlFor={`tag-${tag.name}-${index}`}
                          className="capitalize cursor-pointer select-none text-[#606060] w-fit"
                        >
                          {tag.name}
                        </FormLabel>
                      </div>
                    ))}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <InputField
            form={form}
            label="Author"
            name="author"
            placeholder="Author"
          />

          <div className="border p-4 w-fit ">
            <CheckboxField form={form} label="Published" name="published" />
          </div>
          <div className="border p-4 w-fit ">
            <CheckboxField form={form} label="Featured" name="isFeatured" />
          </div>

          <SuperButton
            variant="site"
            className=""
            type="submit"
            buttonType="loadingButton"
            loading={form.formState.isSubmitting}
            title={post ? "Update" : "Create"}
          />
        </form>
      </Form>
    </div>
  );
};

export default PostForm;
