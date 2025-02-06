"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const params = useParams();
  const { id } = params;

  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

  type Genre = {
    id: number;
    name: string;
  };

  type ProductionCompany = {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  };

  type Language = {
    iso_639_1: string;
    name: string;
  };

  type Movie = {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    adult: boolean;
    budget: number;
    genres: Genre[];
    homepage: string;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    popularity: number;
    production_companies: ProductionCompany[];
    production_countries: { iso_3166_1: string; name: string }[];
    revenue: number;
    runtime: number;
    spoken_languages: Language[];
    status: string;
    tagline: string;
    video: boolean;
    director?: string;
  };

  const [movie, setMovie] = useState<Movie>();
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const router = useRouter();

  const getMovieData = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${id}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setMovie(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  const getMoreLike = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${id}/similar?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setSimilarMovies(response.data.results);
      console.log(response.data.results);
      
    } catch (err) {
      console.log("error:", err); 
    }
  };
  console.log(`URL: ${TMDB_BASE_URL}/movie/${id}/similar?language=en-US`);


  useEffect(() => {
    if (id) {
      getMovieData();
      getMoreLike();
    }
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center w-full lg:px-[580px]">
      {movie ? (
        <div className="w-full max-w-6xl">
          {/* Title and Rating Section */}
          <div className="flex w-full justify-between mt-8 mb-6">
            <div>
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              <div className="flex space-x-4 mt-2">
                <p>{movie.release_date}</p>
                <p>{movie.runtime} Minutes</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm">Rating</p>
              <div className="flex items-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.0007 2.33325L17.6057 9.63659L25.6673 10.8149L19.834 16.4966L21.2107 24.5233L14.0007 20.7316L6.79065 24.5233L8.16732 16.4966L2.33398 10.8149L10.3957 9.63659L14.0007 2.33325Z" fill="#FDE047" stroke="#FDE047" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="ml-2">
                  <p className="text-lg font-medium">
                    {movie.vote_average} <span className="text-sm text-gray-500">/10</span>
                  </p>
                  <p className="text-sm text-gray-500">{movie.vote_count} votes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Poster and Backdrop Images */}
          <div className="flex justify-between flex-col md:flex-row mb-8 space-y-4 md:space-y-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="h-[428px] w-[288px] object-cover rounded-md shadow-md"
            />
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="h-[428px] w-[760px] max-w-4xl object-cover rounded-md shadow-md"
            />
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="text-sm border rounded-lg px-3 py-1 bg-gray-100 text-gray-800"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Overview Section */}
          <div className="mt-4">
            <p className="text-lg leading-relaxed text-gray-700">{movie.overview}</p>
          </div>

          {/* Director, Writers, and Stars Section */}
          <div className="mt-8 space-y-6">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Director</h3>
              <p>{movie.director || "N/A"}</p>
            </div>
            <div className="h-px bg-gray-300" />
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Writers</h3>
              <p>Writer Names Here</p>
            </div>
            <div className="h-px bg-gray-300" />
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Stars</h3>
              <p>Actor Names Here</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}
      {similarMovies.length > 0 ? (
  <div>
    <div className="mt-8">
      <div className="flex justify-between justify-center mt-[40px]">
        <h2 className="text-2xl font-semibold mb-4">More like this</h2>
        <button className="h-full w-[120px] border-b-2 border-transparent hover:border-black transition duration-300 cursor-pointer transition-transform hover:scale-[1.07] text-gray-900 mt-[7px]">
          See more
        </button>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-5 gap-9 ">
        {similarMovies.slice(0, 5).map((similarMovie) => (
          <div
            key={similarMovie.id}
            className="border-[2px] rounded-[5px] hover:shadow-md w-[190px] h-[380px]"
            onClick={() => router.push(`/detailsm/${similarMovie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`}
              alt={similarMovie.title}
              className="w-full h-220 object-cover mb-2"
            />
            <div className="p-[10px]">
              <h3 className="text-lg font-semibold">
                {similarMovie.title}
              </h3>
              <p className="text-sm text-gray-600">
                Rating: {similarMovie.vote_average}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
) : (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">No similar movies found</h2>
  </div>
)}
    </div>
  );
};

export default Page;
