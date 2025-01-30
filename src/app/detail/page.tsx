"use client";
import React from 'react'
import { useRouter } from 'next/navigation'

const Details = () => {

  const router = useRouter()
  const handleNavigateCover = () => {
    router.push("/cover")
  }
  return (
    <div>
      <h1>112314page</h1>
      <button className='border-[2px] rounded' type="button" onClick={handleNavigateCover}>
      cover
    </button>
    </div>
  )
}
export default Details;
