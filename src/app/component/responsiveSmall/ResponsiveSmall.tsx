"use client"

import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Users, Play,  } from "lucide-react";


const ResponsiveSmall = () => {
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
        const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]); 
          const [currentIndex, setCurrentIndex] = useState(0);
          const router = useRouter();

          const getNowPlayingMovieData = async () => {
            try {
        const response = await axios.get(
          `${process.env.TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
            },
          }
        );
              setNowPlayingMovies(response.data.results); 
              // console.log(response.data.runtime);
              
            } catch (err) {
              console.error("Error:", err);
            }
          };

            useEffect(() => {
              getNowPlayingMovieData();
            }, []);
          
            const handleNextMovie = () => {
              setCurrentIndex((prevIndex) => (prevIndex + 1) % nowPlayingMovies.length);
            };
          
            const handlePreviousMovie = () => {
              setCurrentIndex(
                (prevIndex) => (prevIndex - 1 + nowPlayingMovies.length) % nowPlayingMovies.length
              );
            };
      
  return (
    <div>
        {nowPlayingMovies.length > 0 && (
        <div
          className="flex flex-col items-start border-[2px] rounded p-4 cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md lg:hidden  "
          onClick={() => router.push(`/detailsm/${movie.id}`)}
        >
          {nowPlayingMovies[currentIndex].backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${nowPlayingMovies[currentIndex].backdrop_path}`}
              alt={nowPlayingMovies[currentIndex].title}
              className="rounded-md h-[246px] w-full"
            />
          )}
          <div className="p-[20px] min-h-[220px] max-h-[380px] w-full">
            <div className="flex justify-between">
              <div>
                <p>Now Playing</p>
                <h1 className="text-xl font-bold">{nowPlayingMovies[currentIndex].title}</h1>
              </div>
              <div className="flex">
                <Star className="h-[20px] w-[20px] mr-[10px]" />
                <div className="flex flex-col">
                  {nowPlayingMovies[currentIndex].vote_average}/10
                  <span className="flex justify-center items-center">
                    <Users className="h-[20px] w-[20px] mr-[10px]" />
                    {nowPlayingMovies[currentIndex].vote_count}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[14px] min-h-[100px] w-[350px] line-clamp-5">
              {nowPlayingMovies[currentIndex].overview}
            </p>
            <div className="h-[36px] w-[144px] mt-[20px]">
              <button className="py-[8px] px-[16px] flex justify-between h-[36px] w-[144px] bg-[black] text-[14px] text-[white] rounded-[10px] justify-center items-center">
                <Play className="text-[white] h-[15px] w-[15px]" />
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Buttons for Now Playing Movies */}
      <div className="flex space-x-4 mt-4 lg:hidden">
        <button
          onClick={handlePreviousMovie}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Previous Movie
        </button>
        <button
          onClick={handleNextMovie}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Next Movie
        </button>
      </div>
    </div>
  )
}
export default ResponsiveSmall;