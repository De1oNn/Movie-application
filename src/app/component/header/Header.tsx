'use client';

import React from 'react';
import { MoonStar } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const Header = () => {
  
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');  // Navigates to the main page (root)
  };

  return (
    <div className='w-full bg-[black] flex justify-center'>
      <div className='w-[100%] h-[50px] lg:h-[80px] lg:w-[57%] flex justify-center items-center justify-between lg:justify-around px-[10px] bg-[black] lg:bg-[transparent] backdrop-blur-sm lg:z-20 sticky'>
        <div className='h-[100%] w-[100px] flex justify-center items-center justify-around lg:w-[300px]'>
          <button
            className='font-semibold text-sm text-[white] lg:text-[20px]'
            onClick={handleHomeClick}
          >
            Home
          </button>
          <button className='hidden lg:block text-[white] text-sm font-semibold lg:text-[20px]'>Country</button>
          <Select>
            <SelectTrigger className="w-[50px] lg:w-[100px] h-[36px] rounded-[5px]">
              <SelectValue placeholder="Genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className='p-[20px] h-[310px] w-[570px]'>
                <SelectLabel className='text-[24px] font-semibold'>Genres</SelectLabel>
                  <p className=''>See lists of movies by genre</p>
                  <div className=''>
                    <SelectItem value="apple">Action</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </div>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='h-[36px] lg:h-[36px] w-[200px] lg:w-[410px] flex justify-center items-center'>
          <input className="w-[100%] lg:w-[410px] rounded-[10px] pt-[4px] pb-[4px] pl-[20px] bg-[white] h-[100%]" placeholder='Search movies'/>
        </div>
        <div className='h-[36px] w-[60px] lg:w-[120px] flex justify-center items-center justify-between text-[black]'>
          <button className='border-[1px] rounded-[5px] border-[#05044b] h-[24px] w-[24px] lg:h-[30px] lg:w-[30px] flex justify-center items-center'>
            <MoonStar className='h-[100%] w-[100%] text-[white] lg:h-[30px] lg:w-[30px]'/>
          </button>
          <button>
            <CircleUserRound className='h-[24px] w-[24px] lg:h-[45px] lg:w-[45px] text-[white]'/>
          </button>
        </div>
      </div>
    </div>
  );
}
