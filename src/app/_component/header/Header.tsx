"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const TMDB_BASE_URL =
  process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN || "";

export const Header = () => {
  type Genre = {
    id: number;
    name: string;
  };
  type Movie = {
    id: number;
    poster_path: string;
    original_title: string;
  };

  const router = useRouter();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]); // ✅ Fixed state type

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleGenreClick = (genreId: number) => {
    router.push(`/genres/${genreId}`);
  };

  const getGenreData = async () => {
    try {
      if (!TMDB_BASE_URL || !TMDB_API_TOKEN) return;
      const response = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?language=en`,
        {
          headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
        }
      );
      setGenres(response.data.genres);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const performSearch = useCallback(async () => {
    if (searchValue.trim() && TMDB_BASE_URL && TMDB_API_TOKEN) {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        setSearchResults(response.data.results);
      } catch (error) {
        console.log("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  }, [searchValue]); // ✅ Memoized function

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, performSearch]); // ✅ Added performSearch 

  useEffect(() => {
    getGenreData();
  }, []);

  return (
    <div className="w-full bg-[black] flex justify-center items-center flex-col">
      <div className="w-[100%] h-[50px] px-[20px] lg:px-[0px] lg:h-[80px] lg:w-[57%] flex items-center justify-between bg-[black] lg:bg-[transparent] backdrop-blur-sm lg:z-20 sticky">
        <div className="h-[100%] flex items-center justify-between lg:w-[300px]">
          <button
            className="font-semibold text-sm text-[white] lg:text-[20px]"
            onClick={handleHomeClick}
          >
            Home
          </button>
        </div>

        <div className="h-[36px] lg:h-[36px] w-[200px] lg:w-[410px] flex justify-center items-center gap-4">
          {genres.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="lg:p-[10px] h-[25px] lg:h-[36px] p-[0px]"
                >
                  <ChevronDown />
                  Genre
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="lg:h-[330px] lg:w-[570px] p-[20px]">
                <DropdownMenuLabel className="text-2xl font-semibold p-[0px] pb-[5px]">
                  Genres
                </DropdownMenuLabel>
                <DropdownMenuLabel className="text[16px] font-normal p-[0px] pb-[5px]">
                  See lists of movies by genre
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="mb-[10px]" />
                <DropdownMenuGroup className="grid grid-cols-2 lg:grid-cols-3 gap-3">
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
          <input
            className="w-[100%] h-[25px] lg:h-[36px] pl:[4px] lg:pl-[8px] lg:w-[410px] rounded-[7px] bg-[white] h-[100%]"
            placeholder="Search movies"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      {searchResults.length > 0 && (
        <div className="mt-4 px-[50px] lg:px-[580px] absolute top-[5%] lg:top-[10%] z-30 ">
          <div className="p-[10px] border-[2px] rounded-[20px] backdrop-blur-lg">
            <h3 className="text-[30px] font-semibold text-black">
              Search Results
            </h3>
            <div className="grid grid-cols-3 gap-4 mt-4 lg:grid-cols-6 lg:gap-4">
              {searchResults.slice(0, 6).map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => router.push(`/detailsm/${movie.id}`)}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                    height={800}
                    width={800}
                  />
                  <h2>{movie.original_title}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
