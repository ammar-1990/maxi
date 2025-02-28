import React from "react";
import Heading from "../_components/Heading";
import SuperButton from "@/components/SuperButton";
import { PlusCircle } from "lucide-react";
import SuspenseComponent from "@/components/SuspenseComponent";
import PostTypeFeed from "./_components/PostTypeFeed";

type Props = {};

const PostsTypePage = (props: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title="Post Types" description="Add Post Types" />
        <SuperButton
          title="Create Post Type"
          buttonType="modalButton"
          modalInputs={{ modal: "postType", data: undefined }}
          Icon={<PlusCircle />}
        />
      </div>

      <div className="mt-12">
        <SuspenseComponent>
          <PostTypeFeed />
        </SuspenseComponent>
      </div>
    </div>
  );
};

export default PostsTypePage;
