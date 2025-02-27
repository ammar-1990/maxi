
'use client'
import { cn } from "@/lib/utils";
import { AlignCenter, AlignJustify, Blocks, Bolt, NotebookText, TableOfContents, Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const LINKS = [
  {
    title: "main",
    href: "/",
    Icon: <Bolt className="icon" />,
  },
  {
    title: "categories",
    href: "/categories",
    Icon: <AlignJustify className="icon" />,
  },
  {
    title: "Sub-categories",
    href: "/sub-categories",
    Icon: <TableOfContents className="icon" />,
  },
  {
    title: "Post types",
    href: "/post-types",
    Icon: <Blocks className="icon" />,
  },
  {
    title: "posts",
    href: "/posts",
    Icon: <NotebookText className="icon" />,
  },
  {
    title: "tags",
    href: "/tags",
    Icon: <Tag className="icon" />,
  },
];
const NavLinks = (props: Props) => {
    const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-2 p-6 border-t">
      {LINKS.map(({ Icon, href, title }) => (
        <Link key={title} href={href}>
          <div className={cn("flex items-center text-site-primary gap-5 px-6 py-3 hover:bg-neutral-100 transition",pathname===href && 'bg-site-primary text-white hover:bg-site-primary')}>
            {Icon}
            <p className="capitalize text-sm">{title}</p>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
