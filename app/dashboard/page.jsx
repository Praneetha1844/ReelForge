"use client";
import { useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { Button } from "@/components/ui/button";
function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-2xl text-purple-500">Dashboard</h2>
        <Link href="/dashboard/create-new">
        <Button className='mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'>
             + Create New
        </Button>
        </Link>
      </div>
      
      {/* Video List Section */}
      {videoList?.length === 0 && <EmptyState />}
    </div>
  );
}

export default Dashboard;