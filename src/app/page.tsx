"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import * as React from "react"
import { Star } from 'lucide-react'
import { Play } from 'lucide-react'
import { Users } from 'lucide-react';


const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;



const Page = () => {

  type Movie = {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
  };
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const router = useRouter();

  const getMovieData = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      console.log("this is response");
      
      console.log(response);
      
      setMovieList(response.data.results);
      console.log(response.data.results);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  const handleNavigate = () => {
    router.push('/detail/trying');
  };

  return (
    <div>
        {movieList.map((Movie) => (
        <div key={Movie.id} className="flex flex-col items-start mb-4">
          {Movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${Movie.backdrop_path}`}
              alt={Movie.title}
              className="rounded-md h-[246px] w-[100%] "
            />
          )}
          <div className="p-[20px] min-h-[220px] max-h-[380px] w-[100%]">
            <div className="flex justify-between">
              <div>
                <p>Now Playing</p>
                <h1 className="text-xl font-bold">{Movie.title}</h1>
              </div>
              <div className="flex">
                <div>
                  <Star className="h-[20px] w-[20px] mr-[10px]" />
                </div>
                <div className="flex flex-col">
                {Movie.vote_average}/10
                  <span className="flex justify-center items-center">
                  <Users className="h-[20px] w-[20px] mr-[10px]"/>
                  {Movie.vote_count}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[14px] min-h-[100px] max-h=[300px] w-[350px]">{Movie.overview}</p>
            <div className="h-[36px] w-[144px] mt-[20px]">
              <button className="py-[8px] px-[16px] flex justify-between h-[36px] w-[144px] bg-[black] text-[14px] text-[white] rounded-[10px] justify-center items-center">
                <Play className="text-[white] h-[15px] w-[15px]" />
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* {movieList.map((Movie) => (
        <div key={Movie.id} className="border p-4 rounded-lg mb-4 shadow-md">
          <img 
            src={`https://image.tmdb.org/t/p/original${Movie.poster_path}`} 
            alt={Movie.title}
            />
          <h1 className="text-xl font-bold">{Movie.title}</h1>
          <p>{Movie.overview}</p>
          {Movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${Movie.backdrop_path}`}
              alt={Movie.title}
              className="rounded-md mt-2"
            />
          )}
        </div>
      ))} */}
      <button onClick={handleNavigate} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
        View Details
      </button>
    </div>
  );
};

export default Page;
