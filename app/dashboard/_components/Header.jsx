"use client";

import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-3 px-5 shadow-md">
      <Link href="/dashboard" className="flex items-center gap-3">
        <Image src="/signin.jpeg" width={30} height={30} alt="" />
        <span className="text-xl font-semibold">ReelForge</span>
      </Link>
      <UserButton />
    </header>
  );
}
