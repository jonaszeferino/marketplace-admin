"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

// Difinição dos types

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

interface ApiResponse {
  page: number;
  results: Movie[];
}

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    console.log('chamou 1')
    axios
      .get<ApiResponse>("/api/getWeekendMovies")
      .then((response) => {
        const movieList = response.data.results;
        setMovies(movieList);
        console.log('chamou 2')
      })
      .catch((error) => {
        console.error("Erro ao buscar os filmes:", error);
      });
  }, []);

  return (
    <div>
      < Navbar />
      <h1 className="text-2xl font-bold mb-4">Trends neste fim de semana:</h1>
      <div className="grid grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg p-4 shadow-md w-full max-h-100"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full max-h-100 object-contain" // Adicione as classes w-full, max-h-360 e object-contain
            />
            <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
            <p className="text-gray-700 mt-2">{movie.overview}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
