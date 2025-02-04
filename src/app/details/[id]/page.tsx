"use client";

import React from 'react'
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();



  return (
    <div className='mx-[580px] h-full pt-[100px]'>
      <div className='h-[100%] w-[100%] '>
        <div>
          hello {params.id}
        </div>

      </div>
    </div>
  )
}
export default Page
