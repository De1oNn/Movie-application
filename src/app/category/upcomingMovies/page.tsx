"use client";

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";

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
    release_date: number;
  };

  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // Track the current page
  const [totalPages, setTotalPages] = useState<number>(1);

  const router = useRouter();

  const getUpcomingMovieData = async (page: number) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/upcoming?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setUpcomingMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    getUpcomingMovieData(currentPage);
  }, [currentPage]);

  const getPaginationRange = () => {
    const range: number[] = [];
    const pageLimit = 2;

    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (endPage - startPage < pageLimit - 1) {
      if (startPage === 1) {
        endPage = Math.min(startPage + 4, totalPages);
      } else {
        startPage = Math.max(endPage - 4, 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };
  return (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {upcomingMovies.length > 0 && (
      <div className="flex flex-col items-center mt-6">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">
          Upcoming Movies
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 w-full">
          {upcomingMovies.slice(0, 20).map((movie) => (
            <div
              key={movie.id}
              className="w-full flex flex-col items-center border-2 border-transparent rounded-xl bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer transition-transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
              onClick={() => router.push(`/detailsm/${movie.id}`)}
            >
              {movie.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-md w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[340px] object-cover transition duration-500 ease-in-out transform hover:scale-110"
                  height={800}
                  width={800}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50 transition duration-300" />
              <div className="w-full p-4 relative z-10">
                <div className="flex items-center text-yellow-400 space-x-2 mb-2">
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
                  <span className="text-white text-sm">
                    {movie.vote_average}
                    <span className="text-xs">/10</span>
                  </span>
                </div>
                <h2 className="text-base md:text-lg text-center text-white font-semibold truncate">
                  {movie.title}
                </h2>
                <p className="line-clamp-3 text-sm text-white font-light mt-1">
                  {movie.overview || "No overview available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    <Pagination className="flex justify-center items-center mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() =>
              setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
            }
          />
        </PaginationItem>

        {getPaginationRange().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && currentPage + 2 < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              setCurrentPage(
                currentPage < totalPages ? currentPage + 1 : totalPages
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
);
};
export default Page;