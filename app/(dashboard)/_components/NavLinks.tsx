
'use client'
import { cn } from "@/lib/utils";
import { AlignCenter, AlignJustify, Blocks, Bolt, NotebookText, TableOfContents, Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};


const NavLinks = (props: Props) => {
    const pathname = usePathname()

    const LINKS = [
      {
        title: "main",
        href: "/",
        Icon: <Bolt className="icon" />,
        active:pathname === '/'
      },
      {
        title: "categories",
        href: "/categories",
        Icon: <AlignJustify className="icon" />,
         active:pathname.startsWith('/categories')
      },
      {
        title: "Sub-categories",
        href: "/sub-categories",
        Icon: <TableOfContents className="icon" />,
        active:pathname.startsWith('/sub-categories')
      },
      {
        title: "Post types",
        href: "/post-types",
        Icon: <Blocks className="icon" />,
        active:pathname.startsWith('/post-types')
      },
      {
        title: "posts",
        href: "/posts",
        Icon: <NotebookText className="icon" />,
        active:pathname.startsWith('/posts')
      },
      {
        title: "tags",
        href: "/tags",
        Icon: <Tag className="icon" />,
        active:pathname.startsWith('/tags')
      },
    ];
  return (
    <nav className="flex flex-col gap-2 p-6 border-t">
      {LINKS.map(({ Icon, href, title,active }) => (
        <Link key={title} href={href}>
          <div className={cn("flex items-center text-site-primary gap-5 px-6 py-3 hover:bg-neutral-100 transition",active && 'bg-site-primary text-white hover:bg-site-primary')}>
            {Icon}
            <p className="capitalize text-sm">{title}</p>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
