"use client"

import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TMDB_BASE_URL = process.env.TMDB_BASE_URL; 
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const page = () => {
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
  return (
    <div className='px-[580px]'>
        {upcomingMovies.length > 0 && (
  <div className="flex mt-6 w-[90%] lg:w-[1280px]">
    <div className="w-[100%]">
      <div className="w-full flex justify-between items-center h-[36px]">
        <h1 className="text-[24px] font-semibold">Upcoming Movies</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-5 lg:gap-8 w-[100%]">
        {upcomingMovies.slice(0, 20).map((movie) => (
          <div
            key={movie.id}
            className="lg:w-[230px] flex flex-col items-center border-2 border-transparent rounded-xl bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer transition-transform hover:scale-[1.05] hover:shadow-xl relative overflow-hidden"
            onClick={() => router.push(`/detailsm/${movie.id}`)}
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md w-[100%] h-[225px] lg:h-[340px] object-cover transition duration-500 ease-in-out transform hover:scale-110"
              />
            )}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black opacity-50 transition duration-300"></div>
            <div className="w-[100%] p-[10px] relative z-10">
              <div className="px-[20px] flex mt-[5px] flex justify-start">
                <span className="flex justify-center items-center text-yellow-400">
                  <svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.0007 2.33325L17.6057 9.63659L25.6673 10.8149L19.834 16.4966L21.2107 24.5233L14.0007 20.7316L6.79065 24.5233L8.16732 16.4966L2.33398 10.8149L10.3957 9.63659L14.0007 2.33325Z" fill="#FDE047" stroke="#FDE047" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[14px] ml-[5px] text-white">{movie.vote_average}<span className="text-[12px]">/10</span></span>
              </div>
              <h2 className="text-lg mt-2 text-center text-white font-semibold">{movie.title}</h2>
              <div className="line-clamp-3 text-[14px] text-white font-extralight mt-2">{movie.overview || "No overview available"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
    </div>
  )
}

export default page