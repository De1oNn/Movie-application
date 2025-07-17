"use client"
import { useState, useEffect } from "react";
// Ensure this is inside "page.tsx"
export default function TvShowsPage() {
  const [tvShows, setTvShows] = useState([]);
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  const getTvShowsData = async () => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/tv/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      console.log(data, "TV Shows Data");
      
      setTvShows(data.results);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return <div>TV Shows</div>;
}
