"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CardContent } from "@/components/ui/card";
import { Calendar, StepForward } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

export type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
};

interface Video {
  key: string;
  type: string;
  site: string;
  official: boolean;
  name: string;
}

const BigUpComingMovie = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const router = useRouter();
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

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

  const getMovieTrailer = useCallback(async (movieId: number) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );

      const trailerVideo = response.data.results.find(
        (video: Video) =>
          video.type === "Trailer" &&
          video.site === "YouTube" &&
          video.official
      ) || response.data.results.find(
        (video: Video) => video.type === "Trailer" && video.site === "YouTube"
      );

      setTrailer(trailerVideo?.key || null);
    } catch (err) {
      setTrailer(null);
      console.log("Error fetching trailer", err);
    }
  }, []);

  useEffect(() => {
    getUpcomingMovieData();
  }, []);

  const openModal = async (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    await getMovieTrailer(movie.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrailer(null);
    setSelectedMovie(null);
  };

  return (
    <div>
      <Carousel className="w-full" plugins={[plugin.current]}>
        <CarouselContent className="flex">
          {upcomingMovies.slice(0, 10).map((movie) => (
            <CarouselItem key={movie.id} className="h-[800px] w-full">
              <div className="h-full w-full">
                <CardContent className="relative p-0">
                  {movie.backdrop_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.title}
                      className="w-full h-[800px] object-cover cursor-pointer"
                      onClick={() => router.push(`/detailsm/${movie.id}`)}
                      height={800}
                      width={800}
                    />
                  ) : (
                    <div className="flex h-[800px] items-center justify-center bg-gray-800 text-white">
                      No Image Available
                    </div>
                  )}

                  <div className="absolute top-[25%] left-[10%] text-white p-4 w-[325px] rounded-lg">
                    <h4 className="text-[14px]">Upcoming Movie:</h4>
                    <h3 className="text-[24px] font-bold">{movie.title}</h3>
                    <div className="flex items-center mt-2">
                      <svg
                        width="28"
                        height="28"
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
                      {movie.vote_average}/10
                      <div className="flex ml-[15px]">
                        <Calendar className="h-[20px] w-[20px]" />
                        {movie.release_date}
                      </div>
                    </div>
                    <p className="line-clamp-5 text-[14px] mt-[16px]">
                      {movie.overview}
                    </p>
                    <div className="bottom-3 left-3 flex">
                      <button
                        onClick={() => openModal(movie)}
                        className="bg-white text-black border rounded-full h-[44px] w-[140px] flex justify-center items-center z-10 font-semibold shadow-lg hover:bg-gray-200 transition-all"
                      >
                        <StepForward className="mr-2" />
                        Watch Trailer
                      </button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Trailer Modal */}
      {isModalOpen && selectedMovie && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-70 z-40"
            onClick={closeModal}
          ></div>
          <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-gray-300 hover:bg-gray-400 text-black rounded-full w-10 h-10 flex items-center justify-center"
              >
                ×
              </button>
              {trailer ? (
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${trailer}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Movie Trailer"
                  className="rounded-lg"
                ></iframe>
              ) : (
                <p className="text-center text-black">No trailer available</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BigUpComingMovie;
