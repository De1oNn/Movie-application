"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
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

const MoviesPage = () => {
  type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const genresId = searchParams.get("genresId") || "";
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1); // Track the current page
  const [totalPages, setTotalPages] = useState<number>(1); // Add a loading state

  // Function to fetch movies based on genre (similar movies)
  useEffect(() => {
    const getSimilarMoviesByGenre = async (page: number) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${genresId}/similar?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        console.log("API Response:", response.data);
        setSimilarMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    getSimilarMoviesByGenre(currentPage);
  }, [currentPage, genresId]); // Only depends on currentPage and genresId // Empty dependency array means this runs only once when the component mounts

  if (loading) {
    return <p>Loading...</p>; // Show loading message while data is being fetched
  }
  const getPaginationRange = () => {
    const range: number[] = [];
    const pageLimit = 2;

    // Handle pages before and after the current page
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    // Make sure we always display 5 page buttons when possible
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
      <div className="p-[32px] lg:px-[480px]">
        <div className="my-[20px]">
          <h1 className="text-[40px] font-semibold">More like this</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-5 lg:gap-8 w-[100%]">
          {similarMovies.length === 0 ? (
            <p>No similar movies found</p> // Display a message if no similar movies are found
          ) : (
            similarMovies.slice(0, 20).map((similarMovie) => (
              <div
                key={similarMovie.id}
                className="lg:w-[100%] flex flex-col items-center border-2 border-transparent rounded-xl bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer transition-transform hover:scale-[1.05] hover:shadow-xl relative overflow-hidden"
                onClick={() => router.push(`/detailsm/${similarMovie.id}`)}
              >
                {similarMovie.poster_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                    alt={similarMovie.title}
                    className="rounded-md w-[100%] h-[225px] lg:h-[340px] object-cover transition duration-500 ease-in-out transform hover:scale-110"
                    height={800}
                    width={800}
                  />
                )}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black opacity-50 transition duration-300"></div>
                <div className="w-[100%] p-[10px] relative z-10">
                  <div className="px-[20px] flex mt-[5px] flex justify-start">
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
                      {similarMovie.vote_average}
                      <span className="text-[12px]">/10</span>
                    </span>
                  </div>
                  <h3 className="text-lg mt-2 text-center text-white font-semibold">
                    {similarMovie.title}
                  </h3>
                  <div className="line-clamp-3 text-[14px] text-white font-extralight mt-2">
                    {similarMovie.overview || "No overview available"}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <Pagination className="flex justify-end items-end mt-[20px] px-[32px] lg:p-[0px]">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() =>
                  setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
                }
              />
            </PaginationItem>

            {/* Show page numbers with ellipses */}
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

            {/* Show ellipses if there are more pages */}
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

export default MoviesPage;
