"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;



const Page = () => {

  type Movie = {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
  };
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const router = useRouter();

  const getMovieData = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setMovieList(response.data.results);
      console.log(response.data.results);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  const handleNavigate = () => {
    router.push('/detail/trying');
  };

  return (
    <div>
      <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
      {movieList.map((Movie) => (
        <div key={Movie.id} className="border p-4 rounded-lg mb-4 shadow-md">
          <img 
            src={`https://image.tmdb.org/t/p/original${Movie.poster_path}`} 
            alt={Movie.title}
            />
          <h1 className="text-xl font-bold">{Movie.title}</h1>
          <p>{Movie.overview}</p>
          {Movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${Movie.backdrop_path}`}
              alt={Movie.title}
              className="rounded-md mt-2"
            />
          )}
        </div>
      ))}
      <button onClick={handleNavigate} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
        View Details
      </button>
    </div>
  );
};

export default Page;
