"use client"

import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

type Movie = {
  original_title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  poster_path: string;
};

const page = () => {
  const { push } = useRouter();
    const searchParams = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);

  const searchedGenresId = searchParams.get("genresId");

  const getMoviesByGenres = async (genreIds: string) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genreIds}&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log("Axios error:", error);
    }
  };
    useEffect(() => {
      if (searchedGenresId) {
        getMoviesByGenres(searchedGenresId);
      }
    }, [searchedGenresId]);

  return (
    <div className='px-[580px]'>
        {movies.length > 0 ? (
          <>
          <div className='w-[100%] flex justify-between'>
              <h2 className="text-xl font-semibold mb-4">Found {movies.length} movies:</h2>
              <button className="h-full w-[120px] border-b-2 border-transparent hover:border-black transition duration-300 cursor-pointer hover:scale-[1.07]"
            onClick={() => push(`/category/moreLikeMovies`)}
            >
              See more
            </button>
          </div>
            <div className='grid grid-col-4 grid-row-5 w-[100%]'>
              {movies.map((item) => (
                <div key={item.original_title} className='w-[165px] h-[400px]'>
                  <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="" className='h-[244px] w-[165px]'/>
                  <div>
                    <div>
                      <span>{item.vote_average}</span><span>/10</span>
                    </div>
                    <h1 className=''>{item.original_title}</h1>
                    <p className='line-clamp-3'>{item.overview}</p>
                  </div>
                  
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>No movies found for the selected genre.</div>
        )}
    </div>
  )
}
export default page