import React from 'react'
import { Clapperboard } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <div className='w-[100%] h-[308px] py-[40px] px-[40px] bg-[black] flex justify-between flex-col'>
        <div className='flex flex-col h-[55px] justify-between'>
            <div className='flex w-[90px] justify-between text-[white]'>
                <Clapperboard/>
                <p>Movie N</p>
            </div>
            <p className='text-[white]'>
            © 2024 Movie Z. All Rights Reserved.
            </p>
        </div>
        <div className='flex justify-between'>
            <div className='h-[161px] flex justify-between flex-col'>
                <p>Contact Information</p>
                <div className='flex justify-center items-center justify-between w-[200px] text-[white]'>
                    <Mail/>
                    <div>
                        <p>Email</p>
                        <p>support@movieN.com</p>
                    </div>
                </div>
                <div className='flex justify-center items-center justify-between w-[150px] text-[white]'>
                    <Phone />
                    <div>
                        <p>Phone</p>
                        <p>+976 90015676</p>
                    </div>
                </div>
            </div>
            <div className='w-[25%] flex justify-between flex-col text-[white]'>
                <p className='font-semibold'>Follow us</p>
                <p className='font-semibold'>Facebook</p>
                <p className='font-semibold'>Instagram</p>
                <p className='font-semibold'>Twitter</p>
                <p className='font-semibold'>YouTube</p>
            </div>
        </div>
    </div>
  )
}
