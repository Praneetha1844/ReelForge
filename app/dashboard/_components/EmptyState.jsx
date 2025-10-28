import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function EmptyState() {
  return (
    <div className="p-5 py-24 flex items-center flex-col mt-10 border-2 border-dashed">
        <h2>You dont have any short videos created</h2>
        <Link href="/dashboard/create-new">
        <Button className='mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'>
             Create New Short Video   
        </Button>
        </Link>
    </div>
  )
}

export default EmptyState