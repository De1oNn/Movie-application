'use client';

import React from 'react';
import { MoonStar } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from 'lucide-react';
import axios from "axios";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  // DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL; 
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

export const Header = () => {
  type Genre = {
    id: number;
    name: string;
  };

  const router = useRouter();
  const [genres, setGenres] = useState<Genre[]>([]); 

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleGenreClick = (genreId: number) => {
    console.log(`Genre ${genreId} clicked`);
    router.push(`/genres/${genreId}`); // Adjusted for genre-specific route
  }

  const getGenreData = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?language=en`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setGenres(response.data.genres);  // Note: Assuming `response.data.genres` returns an array of genre objects
      console.log(response.data.genres);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    getGenreData();
  }, []);

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
          {genres.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className='p-[12px]'>
                  <ChevronDown />
                  Genre
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="h-[330px] w-[570px] p-[20px]">
                <DropdownMenuLabel className='text-2xl font-semibold p-[0px] pb-[5px]'>Genres</DropdownMenuLabel>
                <DropdownMenuLabel className='text[16px] font-normal p-[0px] pb-[5px]'>See lists of movies by genre</DropdownMenuLabel>
                <DropdownMenuSeparator className='mb-[10px]'/>
                <DropdownMenuGroup className='grid grid-rows-5 grid-cols-3 gap-3'>
                  {genres.map((genre) => (
                    <Badge  
                    key={genre.id}
                    className=' border-[gray] rounded-[20px] h-[20px] bg-[white] text-[black]'
                    onClick={() => handleGenreClick(genre.id)}
                    >
                      {genre.name}
                      <ChevronRight className='h-[16px] w-[16px]'/>
                      </Badge> 
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className='h-[36px] lg:h-[36px] w-[200px] lg:w-[410px] flex justify-center items-center'>
          <input className="w-[100%] lg:w-[410px] rounded-[10px] pt-[4px] pb-[4px] pl-[20px] bg-[white] h-[100%]" placeholder='Search movies'/>
        </div>
        <div className='h-[36px] w-[60px] lg:w-[120px] flex justify-center items-center justify-between text-[black]'>
          <button className='border-[1px] rounded-[5px] border-[#05044b] h-[24px] w-[24px] lg:h-[30px] lg:w-[30px] flex justify-center items-center'>
            <MoonStar className='h-[100%] w-[100%] text-[white] lg:h-[30px] lg:w-[30px]'/>
          </button>
          <button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          </button>
        </div>
      </div>
    </div>
  );
}
