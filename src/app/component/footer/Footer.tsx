import React from 'react'
import { Clapperboard } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <div className='w-[100%] h-[430px] py-[40px] px-[20px]'>
        <div className='flex flex-col'>
            <div className='flex'>
            <Clapperboard />
            <p>Movie N</p>
            </div>
            <p>
            © 2024 Movie Z. All Rights Reserved.
            </p>
        </div>
        <div className='flex justify-between'>
            <div>
                <p>Contact Information</p>
                <div>
                    <Mail />
                    <div>
                        <p>Email</p>
                        <p>support@movieN.com</p>
                    </div>
                </div>
                <div>
                    <Phone />
                    <div>
                        <p>Phone</p>
                        <p>+976 90015676</p>
                    </div>
                </div>
            </div>
            <div>
                <p>Follow us</p>
                <p>Facebook</p>
                <p>Instagram</p>
                <p>Twitter</p>
                <p>YouTube</p>
            </div>
        </div>
    </div>
  )
}
