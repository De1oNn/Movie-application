"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

type TvShowType = {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

const TvShow = () => {
  const [tvShows, setTvShows] = useState<TvShowType[]>([]);
  const router = useRouter();

  const getTvShows = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/tv/top_rated?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setTvShows(response.data.results);
    } catch (err) {
      console.error("Error fetching TV shows:", err);
    }
  };

  useEffect(() => {
    getTvShows();
  }, []);

  return (
    <div className="p-[32px]">
      <div className="mt-6 flex flex-col w-full">
        <div className="flex justify-between w-full h-[36px]">
          <h1 className="font-semibold text-[24px] mb-4 text-gray-900">
            Top Rated TV Shows
          </h1>
          <button
            className="h-full w-[120px] border-b-2 border-transparent hover:border-black transition duration-300 cursor-pointer hover:scale-105 text-gray-900"
            onClick={() => router.push(`/category/tvShows`)}
          >
            See more
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-5 lg:gap-8 w-full">
          {tvShows.slice(0, 10).map((show) => (
            <div
              key={show.id}
              className="lg:w-[230px] flex flex-col items-center border-2 border-transparent rounded-xl bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700 relative overflow-hidden"
              onClick={() => router.push(`/detailsm/${show.id}`)}
            >
              {show.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="rounded-md w-full h-[225px] lg:h-[340px] object-cover transition duration-500 ease-in-out transform hover:scale-110"
                  height={800}
                  width={800}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50 transition duration-300"></div>
              <div className="w-full p-[10px] relative z-10">
                <div className="px-[20px] flex mt-[5px]">
                  <span className="flex justify-center items-center text-yellow-400">
                    ⭐
                  </span>
                  <span className="text-[14px] ml-[5px] text-white">
                    {show.vote_average} <span className="text-[12px]">/10</span>
                  </span>
                </div>
                <h2 className="text-lg mt-2 text-center text-white font-semibold">
                  {show.name}
                </h2>
                <p className="line-clamp-3 text-[14px] text-white font-extralight mt-2">
                  {show.overview || "No overview available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TvShow;
