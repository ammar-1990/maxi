import React, { PropsWithChildren } from "react";
import Aside from "./_components/Aside";

type Props = {} & PropsWithChildren;

const layout = ({ children }: Props) => {
  return (
    <div className="h-full flex ">
      <div className="w-[300px] border-r">
        <Aside />
      </div>
      <main className="flex-1 p-12 overflow-y-auto">{children}</main>
    </div>
  );
};

export default layout;
