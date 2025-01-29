import React from 'react'
import { MoonStar } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';

export const Header = () => {
  return (
    <div className='h-[50px] w-[100%] flex justify-center items-center justify-between px-[20px] bg-[#694646]'>
        <div className='h-[100%] w-[100px] flex justify-center items-center justify-between'>
            <button className='font-extrabold'>Home</button>
            <button className='font-extrabold'>Genre</button>
        </div>
        <div className='h-[36px] w-[200px]'>
            <input className="h-[36px] w-[200px] rounded-[20px] pt-[4px] pr-[10px] pb-[4px] pl-[40px] bg-[#d8d9d1] h-[36px]"  placeholder='Search movies'/>
        </div>
        <div className='h-[36px] w-[75px] flex justify-center items-center justify-between'>
            <button>
                <MoonStar className='h-[33px] w-[33px]'/>
            </button>
            <button>
                <CircleUserRound className='h-[33px] w-[33px]'/>
            </button>
        </div>
    </div>
  )
}
