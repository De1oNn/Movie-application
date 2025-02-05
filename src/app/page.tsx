"use client";

import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Star, Users, Play, Calendar, } from "lucide-react";
import { useRouter } from "next/navigation";
import { CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
// import { Skeleton } from "@/components/ui/skeleton"

const TMDB_BASE_URL = process.env.TMDB_BASE_URL; 
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel"

type TvShow = {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

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
  
  

  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]); 
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]); 
  const [Tv, setTv] = useState<TvShow[]>([]) 
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const getNowPlayingMovieData = async () => {
    try {
const response = await axios.get(
  `${process.env.TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
  {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  }
);
      setNowPlayingMovies(response.data.results); 
      console.log(response.data.runtime);
      
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const getUpcomingMovieData = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/upcoming?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setUpcomingMovies(response.data.results); 
      
    } catch (err) {
      console.error("Error:", err);
    }
  };
  const getPopularMovieData = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setPopularMovies(response.data.results); 
    } catch (err) {
      console.error("Error:", err);
    }
  };
  const getTopRatedMovieData = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/top_rated?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setTopRatedMovies(response.data.results); 
      
    } catch (err) {
      console.error("Error:", err);
    }
  };
  const getTv = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/tv/top_rated?language=en-US&page=1`, 
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setTv(response.data.results); 
      console.log(response.data.results);
      
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // const { push }  = useRouter();
  // const router = useRouter();


  useEffect(() => {
    getNowPlayingMovieData();
    getUpcomingMovieData(); 
    getPopularMovieData();
    getTopRatedMovieData();
    getTv();
  }, []);

  const handleNextMovie = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % nowPlayingMovies.length);
  };

  const handlePreviousMovie = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + nowPlayingMovies.length) % nowPlayingMovies.length
    );
  };

  const handleNavigate = () => {
    router.push("/detail/trying");
  };

  console.log(upcomingMovies.slice(0, 10));

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <div className="flex flex-col items-center justify-center w-[100%]">
      {/* responsive deerh jijghen nuur */}
      {nowPlayingMovies.length > 0 && (
        <div
          className="flex flex-col items-start border-[2px] rounded p-4 cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md lg:hidden  "
          // onClick={() => router.push(`/detailsm/${movie.id}`)}
        >
          {nowPlayingMovies[currentIndex].backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${nowPlayingMovies[currentIndex].backdrop_path}`}
              alt={nowPlayingMovies[currentIndex].title}
              className="rounded-md h-[246px] w-full"
            />
          )}
          <div className="p-[20px] min-h-[220px] max-h-[380px] w-full">
            <div className="flex justify-between">
              <div>
                <p>Now Playing</p>
                <h1 className="text-xl font-bold">{nowPlayingMovies[currentIndex].title}</h1>
              </div>
              <div className="flex">
                <Star className="h-[20px] w-[20px] mr-[10px]" />
                <div className="flex flex-col">
                  {nowPlayingMovies[currentIndex].vote_average}/10
                  <span className="flex justify-center items-center">
                    <Users className="h-[20px] w-[20px] mr-[10px]" />
                    {nowPlayingMovies[currentIndex].vote_count}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[14px] min-h-[100px] w-[350px] line-clamp-5">
              {nowPlayingMovies[currentIndex].overview}
            </p>
            <div className="h-[36px] w-[144px] mt-[20px]">
              <button className="py-[8px] px-[16px] flex justify-between h-[36px] w-[144px] bg-[black] text-[14px] text-[white] rounded-[10px] justify-center items-center">
                <Play className="text-[white] h-[15px] w-[15px]" />
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Buttons for Now Playing Movies */}
      <div className="flex space-x-4 mt-4 lg:hidden">
        <button
          onClick={handlePreviousMovie}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Previous Movie
        </button>
        <button
          onClick={handleNextMovie}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Next Movie
        </button>
      </div>

<Carousel className="w-full hidden lg:block" plugins={[plugin.current]} >
  {/* <Skeleton className="h-full h-[800px] rounded"/> */}
  <CarouselContent className="flex">
    {upcomingMovies.slice(0, 10).map((movie) => (
      <CarouselItem key={movie.id} className="h-[800px] w-full">
        <div className="h-full w-full">
            <CardContent className="relative p-0">
              {/* Movie Poster */}
              {movie.backdrop_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
                  alt={movie.title} 
                  className="w-full h-[800px] object-cover cursor-pointer"
                  onClick={() => router.push(`/detailsm/${movie.id}`)}
                />
              ) : (
                <div className="flex h-[800px] items-center justify-center bg-gray-800 text-white">
                  No Image Available
                </div>
              )}

              {/* Movie Details */}
              <div className="absolute top-[25%] left-[10%] text-white p-4 w-[325px] rounded-lg">
                <h4 className="text-[14px]">Upcoming Movie:</h4>
                <h3 className="text-[24px] font-bold">{movie.title}</h3>
                <div className="flex items-center mt-2">
                  <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.0007 2.33325L17.6057 9.63659L25.6673 10.8149L19.834 16.4966L21.2107 24.5233L14.0007 20.7316L6.79065 24.5233L8.16732 16.4966L2.33398 10.8149L10.3957 9.63659L14.0007 2.33325Z" fill="#FDE047" stroke="#FDE047" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {movie.vote_average}/10
                  <div className="flex ml-[15px]">
                    <Calendar className="h-[20px] w-[20px]" />
                    {movie.release_date}
                  </div>
                </div>
                <p className="line-clamp-5 text-[14px] mt-[16px]">{movie.overview}</p>
                <button className="py-[8px] px-[16px] bg-[#262626] text-white rounded-[10px] mt-[16px] flex items-center justify-center">
                  <Play className="text-white h-[15px] w-[15px]" />
                  Watch Trailer
                </button>
              </div>
            </CardContent>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>

      {/* Upcoming Movies Section */}
      {upcomingMovies.length > 0 && (
  <div className="flex mt-6 w-[90%] lg:w-[1280px]">
    <div className="w-[100%]">
      <div className="w-full flex justify-between items-center h-[36px]">
        <h1 className="text-[24px] font-semibold">Upcoming Movies</h1>
        <button className="h-full w-[120px] border-b-2 border-transparent hover:border-black transition duration-300 cursor-pointer transition-transform hover:scale-[1.02]">
          See more
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-5 lg:gap-8 lg:w-[100%]">
        {upcomingMovies.slice(0, 10).map((movie) => (
          <div
            key={movie.id}
            className="lg:w-[230px] flex flex-col items-center border rounded-md bg-[#b2b2b2] lg:w-[230px] lg:h-[530px] cursor-pointer transition-transform hover:scale-[1.07] hover:shadow-md"
            onClick={() => router.push(`/detailsm/${movie.id}`)}
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md w-[100%] h-[225px] lg:h-[340px]"
              />
            )}
            <div className="w-[100%] p-[10px]">
              <div className="px-[20px] flex mt-[5px] flex justify-start">
                <span className="flex justify-center items-center">
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
                <span className="text-[14px] ml-[5px]">
                  {movie.vote_average}
                  <span className="text-[12px]">/10</span>
                </span>
              </div>
              <div className="">
                <h2 className="text-sm mt-2 text-center text-[20px] mb-[8px] font-semibold">
                  {movie.title}
                </h2>
                <div className="line-clamp-3 text-[14px] font-extralight">
                  {movie.overview}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

      {popularMovies.length > 0 && (
        <div 
          className=" flex mt-6 w-[90%] lg:w-[1280px]"
          >
          <div className="w-[100%]">
            <div className="w-full flex justify-between items-center h-[36px]">
              <h1 className="text-[24px] font-semibold">Popular Movies</h1>
              <button className="h-full w-[120px] border-b-2 border-transparent hover:border-black transition duration-300 cursor-pointer transition-transform hover:scale-[1.07]">See more</button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-5 lg:gap-8 lg:w-[100%]">
              {popularMovies.slice(0, 10).map((movie) => (
                <div key={movie.id} className="lg:w-[230px] flex flex-col items-center border rounded-md bg-[#b2b2b2] lg:w-[230px] lg:h-[530px] cursor-pointer transition-transform hover:scale-[1.07] hover:shadow-md"
                onClick={() => router.push(`/detailsm/${movie.id}`)}
                >
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-md w-[100%] h-[225px] lg:h-[340px]"
                    />
                  )}
                  <div className="w-[100%] p-[10px]">
                    <div className="px-[20px] flex mt-[5px] flex justify-start">
                      <span className="flex justify-center items-center">
                      <svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0007 2.33325L17.6057 9.63659L25.6673 10.8149L19.834 16.4966L21.2107 24.5233L14.0007 20.7316L6.79065 24.5233L8.16732 16.4966L2.33398 10.8149L10.3957 9.63659L14.0007 2.33325Z" fill="#FDE047" stroke="#FDE047" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className="text-[14px]">{movie.vote_average}<span className="text-[12px]">/10</span></span>
                    </div>
                    <h2 className="text-sm mt-2 text-center text-[20px] mb-[8px] font-semibold">{movie.title}</h2>
                    <div className="line-clamp-3 text-[14px] font-extralight">
                        {movie.overview}
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {topRatedMovies.length > 0 && (
        <div className=" flex mt-6 w-[90%] lg:w-[1280px]">
          <div className="w-[100%] ">
            <div className="w-full flex justify-between items-center h-[36px]">
              <h1 className="text-[24px] font-semibold">Top Rated Movies</h1>
              <button className="h-full w-[120px] border-b-2 border-transparent hover:border-black transition duration-300 cursor-pointer transition-transform hover:scale-[1.07]">See more</button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-5 lg:gap-8 lg:w-[100%]">
              {topRatedMovies.slice(0, 10).map((movie) => (
                <div 
                  key={movie.id} 
                  className="lg:w-[230px] flex flex-col items-center border rounded-md bg-[#b2b2b2] lg:w-[230px] lg:h-[530px] cursor-pointer transition-transform hover:scale-[1.07] hover:shadow-md"
                  onClick={() => router.push(`/detailsm/${movie.id}`)}
                  >
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-md w-[100%] h-[225px] lg:h-[340px]"
                    />
                  )}
                  <div className="w-[100%] p-[10px]">
                    <div className="px-[20px] flex mt-[5px] flex justify-start">
                      <span className="flex justify-center items-center">
                      <svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0007 2.33325L17.6057 9.63659L25.6673 10.8149L19.834 16.4966L21.2107 24.5233L14.0007 20.7316L6.79065 24.5233L8.16732 16.4966L2.33398 10.8149L10.3957 9.63659L14.0007 2.33325Z" fill="#FDE047" stroke="#FDE047" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className="text-[14px] ml-[5px]">{movie.vote_average}<span className="text-[12px]">/10</span></span>
                    </div>
                    <h2 className="text-sm mt-2 text-center text-[20px] mb-[8px] font-semibold">{movie.title}</h2>
                    <div className="line-clamp-3 text-[14px] font-extralight">
                        {movie.overview}
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
        {/* top tv */}
        <div className="mt-6 flex justify-center items-center flex-col">
  <div className="flex justify-between w-[90%] h-[36px]">
    <h1 className="font-semibold text-[24px] mb-4 text-gray-900">Top Rated TV Shows</h1>
    <button className="h-full w-[120px] border-b-2 border-transparent hover:border-black transition duration-300 cursor-pointer transition-transform hover:scale-[1.07] text-gray-900">
      See more
    </button>
  </div>
  <div className="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-5 lg:gap-8 w-[90%] lg:w-[100%]">
    {Tv.slice(0, 10).map((show) => (
      <div
        key={show.id}
        className="lg:w-[230px] flex flex-col items-center border-2 border-transparent rounded-xl bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer transition-transform hover:scale-[1.05] hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700 relative overflow-hidden"
        onClick={() => router.push(`/detailsm/${show.id}`)}
      >
        {show.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            className="rounded-md w-[100%] h-[225px] lg:h-[340px] object-cover transition duration-500 ease-in-out transform hover:scale-110"
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
              {show.vote_average} <span className="text-[12px]">/10</span>
            </span>
          </div>
          <h2 className="text-lg mt-2 text-center text-white font-semibold">{show.name}</h2>
          <div className="line-clamp-3 text-[14px] text-white font-extralight mt-2">
            {show.overview || "No overview available"}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      <button
        onClick={handleNavigate}
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
      >
        View Details
      </button>
    </div>
  );
};

export default Page;
