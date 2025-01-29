import React from 'react'
import { MoonStar } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';

export const Header = () => {
  return (
    <div className='h-[50px] w-[100%] flex justify-center items-center justify-between px-[10px] bg-[#694646]'>
        <div className='h-[100%] w-[100px] flex justify-center items-center justify-around'>
            <button className='font-semibold text-sm'>Home</button>
            <button className='font-semibold text-sm'>Genre</button>
        </div>
        <div className='h-[36px] w-[200px] flex justify-center items-center'>
            <input className="h-[30px] w-[180px] rounded-[20px] pt-[4px] pb-[4px] pl-[40px] bg-[#d8d9d1] h-[36px]"  placeholder='Search movies'/>
        </div>
        <div className='h-[36px] w-[60px] flex justify-center items-center justify-between'>
            <button>
                <MoonStar className='h-[24px] w-[24px]'/>
            </button>
            <button>
                <CircleUserRound className='h-[24px] w-[24px]'/>
            </button>
        </div>
    </div>
  )
}
