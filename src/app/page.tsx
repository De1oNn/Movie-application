"use client";

import React from "react";
import { useRouter } from "next/navigation";
// import TvShow from "./_component/tvShow/TvShow";
import TopRatedMovie from "./_component/topRatedMovie/TopRatedMovie";
import PopularMovie from "./_component/popularMovie/PopularMovie";
import UpComingMovie from "./_component/upComingMovie/UpComingMovie";
import BigUpComingMovie from "./_component/bigUpComingMovie/BigUpComingMovie";

const Page = () => {
  const router = useRouter();
  const handleHomeClick = () => {
    router.push("/");
  };
  return (
    <div className="flex flex-col items-center justify-center w-[100%] bg-gradient-to-r from-blue-400 via-teal-500 to-purple-600 rounded-lg shadow-lg relative">
      <BigUpComingMovie />
      <UpComingMovie />
      <PopularMovie />
      <TopRatedMovie />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 absolute z-40 fixed bottom-[5%] left-[5%] sticky"
        onClick={handleHomeClick}
      >
        up
      </button>
    </div>
  );
};

export default Page;
