import React from 'react';
import Header from './_components/Header';
import SideNav from './_components/SideNav';

export default function DashboardLayout({ children }) {
  return (
    <div >
     <div className="hidden md:block h-screen  bg-white fixed mt-[65px] w-64">
      <SideNav/>
     </div>
      <div>
      <Header />
      <div className="md:ml-64 p-10 pt-4 bg-gray-100 min-h-screen">
        {children}
        </div>
      </div>
    </div>
  );
}