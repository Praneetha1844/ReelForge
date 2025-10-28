"use client";

import React from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

function Header() {
  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md'>
      <div className='flex gap-3 items-center'>
        <Image src="/signin.jpeg" width={30} height={30} alt="Logo" />
        <h2 className="text-xl font-semibold">Ai short Vid</h2>
      </div>
      <div className='flex gap-3 items-center'>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Dashboard
        </button>
        <UserButton/>
      </div>
    </div>
  );
}

export default Header;