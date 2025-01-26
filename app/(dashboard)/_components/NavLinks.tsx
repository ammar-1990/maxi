
'use client'
import { cn } from "@/lib/utils";
import { Bolt, NotebookText, TableOfContents } from "lucide-react";
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
    title: "categories & posts type",
    href: "/categories",
    Icon: <TableOfContents className="icon" />,
  },
  {
    title: "posts & tags",
    href: "/posts",
    Icon: <NotebookText className="icon" />,
  },
];
const NavLinks = (props: Props) => {
    const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-2 p-6 border-t">
      {LINKS.map(({ Icon, href, title }) => (
        <Link key={title} href={href}>
          <div className={cn("flex items-center gap-5 px-6 py-3 hover:bg-neutral-100 transition",pathname===href && 'bg-site-primary text-white hover:bg-site-primary')}>
            {Icon}
            <p className="capitalize text-sm">{title}</p>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
