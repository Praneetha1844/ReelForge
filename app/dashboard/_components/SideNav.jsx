"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileVideo, PanelLeft } from "lucide-react";

// Only routes that exist are listed. Upgrade and Account are on the roadmap.
const MENU = [
  { id: "dashboard", name: "Dashboard", path: "/dashboard", icon: PanelLeft },
  { id: "create", name: "Create New", path: "/dashboard/create-new", icon: FileVideo },
];

export default function SideNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard" className="h-screen w-64 p-5 shadow-md">
      <ul className="grid gap-3">
        {MENU.map(({ id, name, path, icon: Icon }) => {
          const active = pathname === path;
          return (
            <li key={id}>
              <Link
                href={path}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-md p-3 hover:bg-purple-700 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-700 ${
                  active ? "bg-purple-700 text-white" : ""
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
