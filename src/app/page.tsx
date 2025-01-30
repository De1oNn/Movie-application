"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'


const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

const Page = () => {
  const [movieList, setMovieList] = useState([])

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
      setMovieList(response.data) 
      console.log(setMovieList); 
      // // console.log(response.data.results[0].backdrop_path); 
    } catch (err) {
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    console.log("called");
    getMovieData();
  }, []);


  const router = useRouter()
  const handleNavigate = () => {
    router.push('/detail');
  }
  
  
  return (
    <div>
      <div>
      </div>
      <button onClick={handleNavigate}>
        details
      </button>
    </div>
  )


};

export default Page;