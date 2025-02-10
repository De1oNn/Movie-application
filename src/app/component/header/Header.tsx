'use client';

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { MoonStar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Base URL and token for TMDB API
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

export const Header = () => {
  type Genre = {
    id: number;
    name: string;
  };

  const router = useRouter();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchValue, setSearchValue] = useState<string>(''); // Track search query
  const [searchResults, setSearchResults] = useState<any[]>([]); // Store movie search results

  // Handle home button click
  const handleHomeClick = () => {
    router.push('/');
  };

  // Handle genre click
  const handleGenreClick = (genreId: number) => {
    router.push(`/genres/${genreId}`); // Adjusted for genre-specific route
  };

  // Fetch genre data from TMDB
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
      setGenres(response.data.genres);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Handle the input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value); // Update search value when input changes
  };

  // Perform the search API call
  const performSearch = async () => {
    if (searchValue.trim()) {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        setSearchResults(response.data.results); // Set the movie search results
      } catch (error) {
        console.log("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]); // Clear results if search input is empty
    }
  };

  // Debounce the search input to reduce API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch();
    }, 500); // Wait 500ms after the user stops typing

    return () => clearTimeout(timer); // Clean up timer if searchValue changes
  }, [searchValue]);

  // Fetch genre data when component mounts
  useEffect(() => {
    getGenreData();
  }, []);

  return (
    <div className="w-full bg-[black] flex justify-center items-center flex-col">
      <div className="w-[100%] h-[50px] lg:h-[80px] lg:w-[57%] flex justify-center items-center justify-between lg:justify-around px-[10px] bg-[black] lg:bg-[transparent] backdrop-blur-sm lg:z-20 sticky">
        {/* Left section with home and genre dropdown */}
        <div className="h-[100%] w-[100px] flex justify-center items-center justify-around lg:w-[300px]">
          <button
            className="font-semibold text-sm text-[white] lg:text-[20px]"
            onClick={handleHomeClick}
          >
            Home
          </button>
          {/* <button className="hidden lg:block text-[white] text-sm font-semibold lg:text-[20px]">Country</button> */}
          {genres.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="p-[12px]">
                  <ChevronDown />
                  Genre
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="h-[330px] w-[570px] p-[20px]">
                <DropdownMenuLabel className="text-2xl font-semibold p-[0px] pb-[5px]">Genres</DropdownMenuLabel>
                <DropdownMenuLabel className="text[16px] font-normal p-[0px] pb-[5px]">See lists of movies by genre</DropdownMenuLabel>
                <DropdownMenuSeparator className="mb-[10px]" />
                <DropdownMenuGroup className="grid grid-rows-5 grid-cols-3 gap-3">
                  {genres.map((genre) => (
                    <Badge
                      key={genre.id}
                      className="border-[gray] rounded-[20px] h-[20px] bg-[white] text-[black]"
                      onClick={() => handleGenreClick(genre.id)}
                    >
                      {genre.name}
                      <ChevronRight className="h-[16px] w-[16px]" />
                    </Badge>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Search Input */}
        <div className="h-[36px] lg:h-[36px] w-[200px] lg:w-[410px] flex justify-center items-center">
          <input
            className="w-[100%] lg:w-[410px] rounded-[10px] pt-[4px] pb-[4px] pl-[20px] bg-[white] h-[100%]"
            placeholder="Search movies"
            value={searchValue} // Bind input value to state
            onChange={handleSearchInputChange} // Update search value on input change
          />
        </div>

        {/* Right section with moon icon and user avatar */}
        <div className="h-[36px] w-[60px] lg:w-[120px] flex justify-center items-center justify-between text-[black]">
          <button className="border-[1px] rounded-[5px] border-[#05044b] h-[24px] w-[24px] lg:h-[30px] lg:w-[30px] flex justify-center items-center">
            <MoonStar className="h-[100%] w-[100%] text-[white] lg:h-[30px] lg:w-[30px]" />
          </button>
          <button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>

      {/* Display search results below */}
      {searchResults.length > 0 && (
        <div className="mt-4 px-[580px]">
          <h3 className="text-xl font-semibold text-white">Search Results</h3>
          <div className="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-5 lg:gap-8">
            {searchResults.slice(0, 5).map((movie: any) => (
              <div
                key={movie.id}
                className="flex flex-col items-center border-2 border-transparent rounded-xl bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer transition-transform hover:scale-[1.05] hover:shadow-xl relative overflow-hidden"
                onClick={() => router.push(`/detailsm/${movie.id}`)} // Navigate to movie details page
              >
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                    className="rounded-md w-full h-[225px] lg:h-[340px] object-cover transition duration-500 ease-in-out transform hover:scale-110"
                  />
                )}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black opacity-50 transition duration-300"></div>
                <div className="w-full p-[10px] relative z-10">
                  <h2 className="text-lg mt-2 text-center text-white font-semibold">
                    {movie.original_title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
