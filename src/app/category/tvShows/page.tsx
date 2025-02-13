"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

type TvShow = {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

const TvShowsPage = () => {
  const [Tv, setTv] = useState<TvShow[]>([]);
  const router = useRouter();

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
    } catch (err) {
      console.error("Error fetching TV shows:", err);
    }
  };

  useEffect(() => {
    getTv();
  }, []);

  return (
    <div className="mt-6 flex justify-center items-center flex-col">
      <div className="flex justify-between w-[90%] lg:w-[1280px] h-[36px]">
        <h1 className="font-semibold text-[24px] text-gray-900">
          Top Rated TV Shows
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-5 lg:gap-8 w-[90%] lg:w-[1280px]">
        {Tv.slice(0, 20).map((show) => (
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
              <div className="px-[20px] flex mt-[5px] justify-start">
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
              <h2 className="text-lg mt-2 text-center text-white font-semibold">
                {show.name}
              </h2>
              <div className="line-clamp-3 text-[14px] text-white font-extralight mt-2">
                {show.overview || "No overview available"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvShowsPage;
