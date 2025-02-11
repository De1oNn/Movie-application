"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TvShow from "./component/tvShow/TvShow";
import TopRatedMovie from "./component/topRatedMovie/TopRatedMovie";
import PopularMovie from "./component/popularMovie/PopularMovie";
import UpComingMovie from "./component/upComingMovie/UpComingMovie";
import BigUpComingMovie from "./component/bigUpComingMovie/BigUpComingMovie";
import ResponsiveSmall from "./component/responsiveSmall/ResponsiveSmall";

const Page = () => {
  const router = useRouter();
  const handleHomeClick = () => {
    router.push('/');
  };
  return (
    <div className="flex flex-col items-center justify-center w-[100%] bg-gradient-to-r from-blue-400 via-teal-500 to-purple-600 rounded-lg shadow-lg">
      <ResponsiveSmall></ResponsiveSmall>
      <BigUpComingMovie></BigUpComingMovie>
      <UpComingMovie></UpComingMovie>
      <PopularMovie></PopularMovie>
      <TopRatedMovie></TopRatedMovie>
      <TvShow></TvShow>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={handleHomeClick}
      >
        up
      </button>
    </div>
  );
};

export default Page;
