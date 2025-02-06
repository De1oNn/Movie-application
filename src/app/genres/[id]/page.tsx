'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

type GenreType = {
  id: number;
  name: string;
};

type Movie = {
  original_title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  poster_path: string;
};

const Page = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);

  const searchedGenresId = searchParams.get("genresId");

  const getGenresList = async () => {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?language=en`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      });
      setGenres(response.data.genres);
    } catch (error) {
      console.log("Axios error", error);
    }
  };

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
    getGenresList();
  }, []);

  useEffect(() => {
    if (searchedGenresId) {
      getMoviesByGenres(searchedGenresId);
    }
  }, [searchedGenresId]);

  const handleGenreSelection = (genreId: string) => {
    const updatedSelectedGenres = selectedGenreIds.includes(genreId)
      ? selectedGenreIds.filter(id => id !== genreId)
      : [...selectedGenreIds, genreId];
    
    setSelectedGenreIds(updatedSelectedGenres);
    
    // Update URL with the selected genre ID
    push(`?genresId=${updatedSelectedGenres.join(',')}`);
  };

  return (
    <div className="px-[430px] h-screen flex">
      {/* Genre Sidebar */}
      <div className="w-[30%] h-[250px] gap-[5px] mt-[50px]">
        {genres.length > 0 &&
          genres.map((item) => {
            const genreId = item.id.toString();
            const isSelected = selectedGenreIds.includes(genreId);
            return (
              <Badge
                key={item.name}
                onClick={() => handleGenreSelection(genreId)}
                variant="outline"
                className={`${
                  isSelected
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : ""
                } rounded-full cursor-pointer`}
              >
                {item.name}
                <ChevronRight className="h-[16px] w-[16px]" />
              </Badge>
            );
          })}
      </div>
  
      <div className="w-[2px] h-[90%] bg-[black] m-[20px]" />
  
      {/* Movies Display */}
      <div>
        {movies.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Found {movies.length} movies:</h2>
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
    </div>
  );
};    

export default Page;
