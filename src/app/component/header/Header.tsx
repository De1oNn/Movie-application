import React from 'react'
import { MoonStar } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';

export const Header = () => {
  return (
    <div className='w-[100%] flex justify-center'>
        <div className='w-[100%] h-[50px]  lg:h-[80px] lg:w-[57%] flex justify-center items-center justify-between px-[10px] bg-[black] lg:bg-[transparent] backdrop-blur-sm lg:absolute lg:z-20'>
            <div className='h-[100%] w-[100px] flex justify-center items-center justify-around'>
                <button className='font-semibold text-sm text-[white]'>Home</button>
                <button className='font-semibold text-sm text-[white]'>Genre</button>
                <button className='hidden lg:block text-[white] text-sm'>Country</button>
            </div>
            <div className='h-[36px] w-[200px] flex justify-center items-center'>
                <input className="h-[30px] w-[180px] rounded-[20px] pt-[4px] pb-[4px] pl-[20px] bg-[white] h-[36px]"  placeholder='Search movies'/>
            </div>
            <div className='h-[36px] w-[60px] flex justify-center items-center justify-between text-[black]'>
                <button className='border-[1px] rounded-[5px] border-[#05044b] h-[26px] w-[26px] flex justify-center items-center'>
                    <MoonStar className='h-[20px] w-[20px] text-[white]'/>
                </button>
                <button>
                    <CircleUserRound className='h-[24px] w-[24px] text-[white]'/>
                </button>
            </div>
        </div>
    </div>
  )
}
