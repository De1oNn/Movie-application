'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
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

  const router = useRouter();

  return (
    <div className="px-[430px] flex">
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
  
      <div className="w-[2px] bg-[black] m-[20px]" />
  
      <div className="w-full">
  {movies.length > 0 ? (
    <>
      <div className="w-full flex justify-between mt-[20px]">
        <h2 className="text-[30px] font-semibold mb-4">Found  movies:</h2>
        <button
          className="h-full w-[120px] border-b-2 border-transparent hover:border-black transition duration-300 cursor-pointer hover:scale-[1.07]"
          onClick={() => push(`/category/genreMovie?genresId=${selectedGenreIds}`)}
        >
          See more
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-5 lg:gap-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className=" flex flex-col items-center border-2 border-transparent rounded-xl bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer transition-transform hover:scale-[1.05] hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700 relative overflow-hidden"
            onClick={() => router.push(`/detailsm/${movie.id}`)}
          >
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                className="rounded-md w-full h-[225px] lg:h-[340px] object-cover transition duration-500 ease-in-out transform hover:scale-110"
                height={800}
                width={800}            
              />
            )}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black opacity-50 transition duration-300"></div>
            <div className="w-full p-[10px] relative z-10">
              <div className="px-[20px] flex mt-[5px] justify-start">
                <span className="flex justify-center items-center text-yellow-400">
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
                <span className="text-[14px] ml-[5px] text-white">
                  {movie.vote_average} <span className="text-[12px]">/10</span>
                </span>
              </div>
              <h2 className="text-lg mt-2 text-center text-white font-semibold">
                {movie.original_title}
              </h2>
              <div className="line-clamp-3 text-[14px] text-white font-extralight mt-2">
                {movie.overview || "No overview available"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <p>No movies found.</p>
  )}
</div>
    </div>
  );
};    

export default Page;
