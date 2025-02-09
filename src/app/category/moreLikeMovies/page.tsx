'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

type Movie = {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
};

const MoviesPage = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);

  const searchedGenresId = searchParams.get("genresId");

  const getMoviesByGenres = async (genreIds: string) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/discover/movie?language=en-US&with_genres=${genreIds}&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    if (searchedGenresId && searchedGenresId.trim() !== "") {
      const genreIdList = searchedGenresId.split(',');
      setSelectedGenreIds(genreIdList);
      getMoviesByGenres(searchedGenresId);
    }
  }, [searchedGenresId]);

  return (
    <div className="px-8 mt-10">
      <h1 className="text-2xl font-semibold mb-4">
        Found {movies.length} movies for your selected genres:
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="w-[165px]">
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : '/placeholder.jpg'}
                alt={movie.original_title || "No title available"}
                className="h-[244px] w-[165px] object-cover"
              />
              <div>
                <h1 className="text-lg font-semibold">{movie.original_title}</h1>
                <p className="line-clamp-2">{movie.overview}</p>
                <span>{movie.vote_average}/10</span>
              </div>
            </div>
          ))
        ) : (
          <div>No movies found for the selected genres.</div>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
