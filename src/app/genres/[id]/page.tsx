'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

type GenreType = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
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
    push(`?genresId=${updatedSelectedGenres.join(',')}`);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mt-8 px-4 lg:px-8">
      
      {/* Genre Sidebar */}
      <div className="flex lg:flex-col gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
        {genres.length > 0 &&
          genres.map((item) => {
            const genreId = item.id.toString();
            const isSelected = selectedGenreIds.includes(genreId);
            return (
              <Badge
                key={item.name}
                onClick={() => handleGenreSelection(genreId)}
                variant="outline"
                className={`flex-shrink-0 ${
                  isSelected
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : ""
                } rounded-full cursor-pointer px-3 py-1`}
              >
                {item.name}
                <ChevronRight className="h-[16px] w-[16px]" />
              </Badge>
            );
          })}
      </div>

      {/* Divider for desktop */}
      <div className="hidden lg:block w-[2px] bg-black mx-6" />

      {/* Movies Section */}
      <div className="flex-1 w-full">
        {movies.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-5">
              <h2 className="text-2xl font-semibold mb-2 sm:mb-0">Found movies:</h2>
              <button
                className="w-fit px-4 py-2 border-b-2 border-transparent hover:border-black transition duration-300 cursor-pointer hover:scale-105 text-sm sm:text-base"
                onClick={() => push(`/category/genreMovie?genresId=${selectedGenreIds}`)}
              >
                See more
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mt-4">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex flex-col items-center border-2 border-transparent rounded-xl bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer transition-transform hover:scale-[1.05] hover:shadow-xl relative overflow-hidden"
                  onClick={() => push(`/detailsm/${movie.id}`)}
                >
                  {movie.poster_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.original_title}
                      className="rounded-md w-full h-[225px] sm:h-[280px] lg:h-[340px] object-cover transition duration-500 ease-in-out transform hover:scale-110"
                      height={800}
                      width={800}            
                    />
                  )}
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black opacity-50"></div>
                  <div className="w-full p-3 relative z-10">
                    <div className="flex items-center">
                      <span className="flex items-center text-yellow-400">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.0007 2.33325L17.6057 9.63659L25.6673 10.8149L19.834 16.4966L21.2107 24.5233L14.0007 20.7316L6.79065 24.5233L8.16732 16.4966L2.33398 10.8149L10.3957 9.63659L14.0007 2.33325Z"
                            fill="#FDE047"
                            stroke="#FDE047"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-sm ml-1 text-white">
                        {movie.vote_average} <span className="text-xs">/10</span>
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg mt-2 text-center text-white font-semibold">
                      {movie.original_title}
                    </h2>
                    <div className="line-clamp-3 text-xs sm:text-sm text-white font-extralight mt-2">
                      {movie.overview || "No overview available"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-4">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
