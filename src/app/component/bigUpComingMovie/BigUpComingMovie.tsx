"use client"

import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CardContent } from "@/components/ui/card"
import { Play, Calendar, } from "lucide-react";
import Autoplay from "embla-carousel-autoplay"

const TMDB_BASE_URL = process.env.TMDB_BASE_URL; 
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    // CarouselNext,
    // CarouselPrevious,
  } from "@/components/ui/carousel"


const BigUpComingMovie = () => {

    type Movie = {
        id: number;
        title: string;
        overview: string;
        backdrop_path: string;
        poster_path: string;
        vote_average: number;
        vote_count: number;
        release_date: number;
      };

        const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
          const router = useRouter();

        const getUpcomingMovieData = async () => {
            try {
              const response = await axios.get(
                `${TMDB_BASE_URL}/movie/upcoming?language=en-US&page=1`,
                {
                  headers: {
                    Authorization: `Bearer ${TMDB_API_TOKEN}`,
                  },
                }
              );
              setUpcomingMovies(response.data.results); 
              
            } catch (err) {
              console.error("Error:", err);
            }
          };


            useEffect(() => {
              getUpcomingMovieData(); 
            }, []);

              const plugin = React.useRef(
                Autoplay({ delay: 5000, stopOnInteraction: true })
              )
  return (
    <div>
      <Carousel className="w-full hidden lg:block" plugins={[plugin.current]} >
      <CarouselContent className="flex">
        {upcomingMovies.slice(0, 10).map((movie) => (
          <CarouselItem key={movie.id} className="h-[800px] w-full">
            <div className="h-full w-full">
                <CardContent className="relative p-0">
                  {/* Movie Poster */}
                  {movie.backdrop_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
                      alt={movie.title} 
                      className="w-full h-[800px] object-cover cursor-pointer"
                      onClick={() => router.push(`/detailsm/${movie.id}`)}
                    />
                    
                  ) : (
                    <div className="flex h-[800px] items-center justify-center bg-gray-800 text-white">
                      No Image Available
                    </div>
                  )}

                  {/* Movie Details */}
                  <div className="absolute top-[25%] left-[10%] text-white p-4 w-[325px] rounded-lg">
                    <h4 className="text-[14px]">Upcoming Movie:</h4>
                    <h3 className="text-[24px] font-bold">{movie.title}</h3>
                    <div className="flex items-center mt-2">
                      <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0007 2.33325L17.6057 9.63659L25.6673 10.8149L19.834 16.4966L21.2107 24.5233L14.0007 20.7316L6.79065 24.5233L8.16732 16.4966L2.33398 10.8149L10.3957 9.63659L14.0007 2.33325Z" fill="#FDE047" stroke="#FDE047" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {movie.vote_average}/10
                      <div className="flex ml-[15px]">
                        <Calendar className="h-[20px] w-[20px]" />
                        {movie.release_date}
                      </div>
                    </div>
                    <p className="line-clamp-5 text-[14px] mt-[16px]">{movie.overview}</p>
                    <button className="py-[8px] px-[16px] bg-[#262626] text-white rounded-[10px] mt-[16px] flex items-center justify-center">
                      <Play className="text-white h-[15px] w-[15px]" />
                      Watch Trailer
                    </button>
                  </div>
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel className="w-full block lg:hidden" plugins={[plugin.current]} >
      <CarouselContent className="flex">
        {upcomingMovies.slice(0, 10).map((movie) => (
          <CarouselItem key={movie.id} className="h-[600px] w-full">
            <div className="h-full w-full">
                <CardContent className="relative p-0">
                  {/* Movie Poster */}
                  {movie.backdrop_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                      alt={movie.title} 
                      className="w-full h-[800px] object-cover cursor-pointer"
                      onClick={() => router.push(`/detailsm/${movie.id}`)}
                    />
                    
                  ) : (
                    <div className="flex h-[800px] items-center justify-center bg-gray-800 text-white">
                      No Image Available
                    </div>
                  )}

                  {/* Movie Details */}
                  <div className="absolute top-[25%] left-[10%] text-white p-4 w-[325px] rounded-lg">
                    <h4 className="text-[14px]">Upcoming Movie:</h4>
                    <h3 className="text-[24px] font-bold">{movie.title}</h3>
                    <div className="flex items-center mt-2">
                      <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0007 2.33325L17.6057 9.63659L25.6673 10.8149L19.834 16.4966L21.2107 24.5233L14.0007 20.7316L6.79065 24.5233L8.16732 16.4966L2.33398 10.8149L10.3957 9.63659L14.0007 2.33325Z" fill="#FDE047" stroke="#FDE047" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {movie.vote_average}/10
                      <div className="flex ml-[15px]">
                        <Calendar className="h-[20px] w-[20px]" />
                        {movie.release_date}
                      </div>
                    </div>
                    <p className="line-clamp-5 text-[14px] mt-[16px]">{movie.overview}</p>
                    <button className="py-[8px] px-[16px] bg-[#262626] text-white rounded-[10px] mt-[16px] flex items-center justify-center">
                      <Play className="text-white h-[15px] w-[15px]" />
                      Watch Trailer
                    </button>
                  </div>
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
export default BigUpComingMovie;