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

  
  const  router  = useRouter();
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
    <div className="px-[0px] lg:px-[500px] lg:flex ">
      {/* Genre Sidebar */}
      <div className="w-[100%] lg:w-[40%] p-[20px] lg:p-[0px] flex flex-wrap h-[250px] gap-[5px] mt-[50px]">
        {genres.length > 0 &&
          genres.map((movie) => {
            const genreId = movie.id.toString();
            const isSelected = selectedGenreIds.includes(genreId);
            return (
              <Badge
                key={movie.name}
                onClick={() => handleGenreSelection(genreId)}
                variant="outline"
                className={`${
                  isSelected
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : ""
                } rounded-full cursor-pointer`}
              >
                {movie.name}
                <ChevronRight className="h-[16px] w-[16px]" />
              </Badge>
            );
          })}
      </div>
  
      <div className="w-[2px] bg-[black] m-[20px] hidden lg:block" />
  
      {/* Movies Display */}
      <div className="w-[100%]">
  {movies.length > 0 ? (
    <>
      <div className='w-[100%] flex justify-between mt-[20px]'>
        <h2 className="text-xl font-semibold mb-6">Found {movies.length} movies:</h2>
        <button className="h-full w-[120px] border-b-2 border-transparent hover:border-black transition duration-300 cursor-pointer transition-transform hover:scale-[1.07] text-gray-900"
          onClick={() => router.push(`/category/moreLikeMovies`)}
        >
          See more
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[100%]">
        {movies.map((movie) => (
          <div
            key={movie.original_title}
            className="w-[197px] h-[400px] flex flex-col items-center border-2 border-transparent rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 cursor-pointer hover:shadow-lg hover:scale-[1.05] transition-transform overflow-hidden relative"
            onClick={() => router.push(`/detailsm/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.original_title}
              className="h-[244px] w-[100%] object-cover transition duration-500 ease-in-out transform hover:scale-110 rounded-t-lg"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black opacity-40 hover:opacity-50"></div>
            <div className="relative z-10 w-full p-4">
              <div className="flex items-center justify-start gap-2">
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
                <span className="text-yellow-400 text-sm">{movie.vote_average}</span>
                <span className="text-white text-sm">/10</span>
              </div>
              <h1 className="mt-2 text-sm text-white font-semibold line-clamp-1">{movie.original_title}</h1>
              <p className="text-xs text-gray-300 mt-2 line-clamp-3">{movie.overview || "No overview available"}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className="text-gray-700 mt-4 text-center">
      No movies found for the selected genre.
    </div>
  )}
</div>
    </div>
  );
};    

export default Page;
