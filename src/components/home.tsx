import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import to handle navigation
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../shared/headers";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

interface TMDbResponse {
  results: Movie[];
}

const FetchPopularMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const API_KEY = import.meta.env.VITE_APP_API_KEY;

      if (!API_KEY) {
        console.error("API key is not defined. Please check your .env file.");
      }

      console.log(API_KEY); // Replace this with your API key

      const BASE_URL = "https://api.themoviedb.org/3";

      try {
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch movies");

        const data: TMDbResponse = await response.json();
        setMovies(data.results); // Set the fetched movies into the state
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError("Failed to fetch movies");
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="text-center text-blue-500">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const handleMoreClick = () => {
    // Navigate pages for all movies
    navigate("/all-movies");
  };
  const truncateTitle = (title: string): string => {
    return title.length > 20 ? `${title.slice(0, 20)}...` : title;
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 bg-black">
        <h1 className="text-xl md:text-3xl font-bold  mb-6 text-white">
          Popular Movies
        </h1>

        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Display first 11 movies */}
          {movies.slice(0, 11).map((movie) => (
            <div
              key={movie.id}
              className=" shadow-lg rounded-lg overflow-hidden"
            >
              {movie.poster_path && (
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-52 object-cover"
                    loading="lazy"
                  />
                </Link>
              )}
              <div className="p-4">
                <h2 className="text-sm md:text-xl font-semibold text-white">
                  {truncateTitle(movie.title)}
                </h2>
                <p className="text-gray-600 text-sm">{movie.release_date}</p>
                <div className="mt-2">
                  <span className="text-yellow-500  flex items-center gap">
                    <FaStar /> <FaStar /> {movie.vote_average}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div
            onClick={handleMoreClick}
            className="bg-blue-500 text-white shadow-lg rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
          >
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">More</h2>
              <p>Click to see all popular movies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchPopularMovies;
