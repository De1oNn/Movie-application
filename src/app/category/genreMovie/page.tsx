'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
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

type Movie = {
  id: number;
  original_title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  poster_path: string;
};

const Page = () => {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const searchedGenresId = searchParams.get("genresId") || "";

  const getMoviesByGenres = async (genreIds: string, page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genreIds}&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log("Axios error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchedGenresId) {
      getMoviesByGenres(searchedGenresId, currentPage);
    }
  }, [searchedGenresId, currentPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  const getPaginationRange = () => {
    const range: number[] = [];
    const pageLimit = 5;

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-center sm:text-left">
          Movies
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.length === 0 ? (
          <p className="col-span-full text-center text-gray-400">
            No movies found for this genre.
          </p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col items-center rounded-xl bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer transition-transform hover:scale-[1.05] hover:shadow-xl relative overflow-hidden border-2 border-transparent"
              onClick={() => window.open(`/detailsm/${movie.id}`, "_self")}
            >
              {movie.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                  className="rounded-md w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[340px] object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                  width={800}
                  height={800}
                  priority={true}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
              <div className="w-full p-3 sm:p-4 relative z-10">
                <div className="flex items-center gap-1 px-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M14.0007 2.33325L17.6057 9.63659L25.6673 10.8149L19.834 16.4966L21.2107 24.5233L14.0007 20.7316L6.79065 24.5233L8.16732 16.4966L2.33398 10.8149L10.3957 9.63659L14.0007 2.33325Z"
                      fill="#FDE047"
                      stroke="#FDE047"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm text-white">
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
          ))
        )}
      </div>

      <Pagination className="flex justify-center sm:justify-end items-center mt-8">
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
