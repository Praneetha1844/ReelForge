"use client";
import { CircleUser, FileVideo, PanelLeft, ShieldPlus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

function SideNav() {
    const MenuOptions=[
        {
            id: 1,
            name: 'Dashboard',
            path: '/dashboard',
            icon: PanelLeft,
        },
        {
            id: 2,
            name: 'Create New',
            path: '/dashboard/create-new',
            icon: FileVideo,
        },
        {
            id: 3,
            name: 'Upgrade',
            path: '/dashboard/upgrade',
            icon: ShieldPlus,
        },
        {
            id: 4,
            name: 'Account',
            path: '/dashboard/account',
            icon: CircleUser,
        }
    ]
    const path=usePathname();
  return (
    <div className='w-64 h-screen shadow-md p-5'>
        <div className='grid gap-3'>
       {MenuOptions.map((item, index) => ( 
           <Link href={item.path} key={index}>     
            <div key={item.id} className={`flex items-center gap-3 p-3 hover:bg-purple-500 hover:text-white rounded-md cursor-pointer
                ${path===item.path && 'bg-purple-500 text-white'}
                `}>
            <item.icon className="w-5 h-5" />
            <h2>{item.name}</h2>
            </div>
            </Link> 
       ))}
       </div>
    </div>
  )
}

export default SideNav