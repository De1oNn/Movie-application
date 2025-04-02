"use client";

import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { StepForward } from "lucide-react";
import Image from "next/image";

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
    job: string;
    name: string;
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
  type movieCast = {
    profile_path: string;
  };
  interface Video {
    key: string;
    type: string;
  }

  const [movie, setMovie] = useState<Movie>();
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const router = useRouter();
  const [movieCrew, setMovieCrew] = useState<Movie[]>([]);
  const [movieCast, setMovieCast] = useState<Movie[]>([]);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const type = "tv | movie";

  const getMovieTrailer = useCallback(async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/${type}/${id}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );

      const trailerVideo = response.data.results.find(
        (video: Video) => video.type === "Trailer"
      );

      if (trailerVideo) {
        setTrailer(trailerVideo.key);
      } else {
        console.log("No trailer found.");
        setTrailer(null);
      }
    } catch (err) {
      console.log("Error fetching trailer", err);
    }
  }, [id, type, TMDB_BASE_URL, TMDB_API_TOKEN]);

  useEffect(() => {
    if (id) {
      getMovieTrailer();
    }
  }, [id, getMovieTrailer]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getMovieCrews = useCallback(async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${id}/credits?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );

      setMovieCrew(response.data.crew);
      setMovieCast(response.data.cast);

      console.log("Crew:", response.data.crew);
    } catch (err) {
      console.log("Error fetching movie credits", err);
    }
  }, [id, TMDB_BASE_URL, TMDB_API_TOKEN]); // Include all dependencies

  useEffect(() => {
    getMovieCrews();
  }, [getMovieCrews]); //

  const getMovieData = useCallback(async () => {
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
  }, [id, TMDB_BASE_URL, TMDB_API_TOKEN]); // Include all dependencies

  const getMoreLike = useCallback(async () => {
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
  }, [id, TMDB_BASE_URL, TMDB_API_TOKEN]); // Include all dependencies

  console.log(`URL: ${TMDB_BASE_URL}/movie/${id}/similar?language=en-US`);

  useEffect(() => {
    if (id) {
      getMovieData();
      getMoreLike();
    }
  }, [id, getMovieData, getMoreLike]); //

  return (
    <div className="flex flex-col items-center justify-center w-full lg:px-[580px] relative">
      <div className="">
        <button
          onClick={openModal}
          className="absolute bg-white text-black border rounded-full h-[40px] w-[40px] flex justify-center items-center top-[500px] right-[1280px] z-10"
        >
          <StepForward />
        </button>

        {isModalOpen && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-60 z-10"
              onClick={closeModal} 
            ></div>

            <div className="fixed inset-0 flex items-center justify-center z-20">
              <div className="bg-white rounded-lg shadow-lg p-4 w-3/4 sm:w-1/2">
                <button
                  onClick={closeModal}
                  className="absolute top-[70px] right-[40px] text-white bg-black rounded-full h-[50px] w-[50px] p-1"
                >
                  X
                </button>
                {trailer ? (
                  <iframe
                    width="100%"
                    height="550"
                    src={`https://www.youtube.com/embed/${trailer}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Movie Trailer"
                  ></iframe>
                ) : (
                  <p>No trailer available</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {movie ? (
        <div className="w-full max-w-6xl hidden lg:block">
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
                <svg
                  width="28"
                  height="28"
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
                <div className="ml-2">
                  <p className="text-lg font-medium">
                    {movie.vote_average}{" "}
                    <span className="text-sm text-gray-500">/10</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {movie.vote_count} votes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Poster and Backdrop Images */}
          <div className="flex justify-between mb-8 space-y-4 md:space-y-0 relative">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="h-[150px] w-[100px] lg:h-[428px] lg:w-[288px] object-cover rounded-md shadow-md"
              height={800}
              width={800}
            />
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="h-[210px] w-[375px] lg:h-[428px] lg:w-[760px] max-w-4xl object-cover rounded-md shadow-md"
              height={800}
              width={800}
            />
          </div>

          <div className="hidden lg:block flex flex-wrap gap-2 mb-6">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="text-sm border rounded-lg px-3 py-1 bg-gray-100 text-gray-800"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="mt-4">
            <p className="text-lg leading-relaxed text-gray-700">
              {movie.overview}
            </p>
          </div>

          {/* Director, Writers, and Stars Section */}
          <div className="mt-8 space-y-6">
            {/* Director */}
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Director</h3>
              <p>
                {movieCrew?.length > 0
                  ? movieCrew.find((member) => member.job === "Director")
                      ?.name || "N/A"
                  : "N/A"}
              </p>
            </div>
            <div className="h-px bg-gray-300" />

            {/* Writers */}
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Writers</h3>
              <p>
                {movieCrew?.length > 0
                  ? movieCrew
                      .filter((member) => member.job === "Writer")
                      .map((writer) => writer.name)
                      .join(", ") || "N/A"
                  : "N/A"}
              </p>
            </div>
            <div className="h-px bg-gray-300" />

            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Stars</h3>
              <p>
                {movieCast?.length > 0
                  ? movieCast
                      .slice(0, 5)
                      .map((actor) => actor.name)
                      .join(", ") || "N/A"
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}

      {/* sm deer baih details iin style */}
      <div className="block lg:hidden">
        {movie ? (
          <div className="w-full max-w-6xl">
            {/* Title and Rating Section */}
            <div className="flex w-full justify-between mt-8 mb-6 px-[30px]">
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
                  <svg
                    width="28"
                    height="28"
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
                  <div className="ml-2">
                    <p className="text-lg font-medium">
                      {movie.vote_average}{" "}
                      <span className="text-sm text-gray-500">/10</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {movie.vote_count} votes
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="h-[210px] w-[375px] lg:h-[428px] lg:w-[760px] max-w-4xl object-cover rounded-md shadow-md"
              height={800}
              width={800}
            />

            {/* Poster and Backdrop Images */}
            <div className="flex p-[30px] justify-between">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="h-[150px] w-[100px] lg:h-[428px] lg:w-[288px] object-cover rounded-md shadow-md"
                height={800}
                width={800}
              />
              <div className="flex flex-col w-[250px]">
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
                <div className="mt-4">
                  <p className="text-lg leading-relaxed text-gray-700">
                    {movie.overview}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 p-[30px]">
              {/* Director */}
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Director</h3>
                <p>
                  {movieCrew?.length > 0
                    ? movieCrew.find((member) => member.job === "Director")
                        ?.name || "N/A"
                    : "N/A"}
                </p>
              </div>
              <div className="h-px bg-gray-300" />

              {/* Writers */}
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Writers</h3>
                <p>
                  {movieCrew?.length > 0
                    ? movieCrew
                        .filter((member) => member.job === "Writer")
                        .map((writer) => writer.name)
                        .join(", ") || "N/A"
                    : "N/A"}
                </p>
              </div>
              <div className="h-px bg-gray-300" />

              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Stars</h3>
                <p>
                  {movieCast?.length > 0
                    ? movieCast
                        .slice(0, 5)
                        .map((actor) => actor.name)
                        .join(", ") || "N/A"
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-screen flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>
      {similarMovies.length > 0 ? (
        <div className="p-[32px] lg:p-[0px]">
          <div className="">
            <div className="flex justify-between mt-[0px] lg:mt-[40px] items-center">
              <h2 className="text-2xl font-semibold mb-4">More like this</h2>
              <button
                className="h-full w-[120px] border-b-2 border-transparent hover:border-black transition duration-300 cursor-pointer transition-transform hover:scale-[1.07] text-gray-900"
                onClick={() =>
                  router.push(`/category/moreLikeMovies?genresId=${id}`)
                }
              >
                See more
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-5 lg:gap-8 w-[100%]">
              {similarMovies.slice(0, 5).map((similarMovie) => (
                <div
                  key={similarMovie.id}
                  className="lg:w-[190px] flex-col items-center border-2 border-transparent rounded-xl bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer transition-transform hover:scale-[1.05] hover:shadow-xl relative overflow-hidden"
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
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            No similar movies found
          </h2>
        </div>
      )}
    </div>
  );
};

export default Page;
