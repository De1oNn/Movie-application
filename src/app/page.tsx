"use client";

import axios from "axios";
import { useEffect } from "react";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

const Page = () => {


  const getMovieData = async () => {
    try {
      console.log("Running");

      // console.log("API Token:", TMDB_API_TOKEN);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );

      console.log(response.data.results); 
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  return <div>Movie Data</div>;
};

export default Page;