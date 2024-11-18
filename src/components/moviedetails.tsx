import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaListUl, FaHeart, FaStar } from "react-icons/fa";
import {
  addToFavorites,
  removeFromFavorites,
  isMovieInFavorites,
} from "../utils/favoriteMovies";
import ReviewsSection from "./reviews";
import Header from "../shared/headers";

interface Genre {
  id: number;
  name: string;
}

interface CastMember {
  id: number;
  name: string;
  profile_path: string | null;
}

interface Review {
  id: string;
  author: string;
  content: string;
}

interface Recommendation {
  id: number;
  title: string;
  poster_path: string | null;
}

interface MovieDetails {
  title: string;
  poster_path: string;
  overview: string;
  genres: Genre[];
  cast: CastMember[];
  vote_average: number;
  trailer: string | null;
  director: string | null;
  reviews: Review[];
  recommendations: Recommendation[];
}

const MovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
        const API_KEY = import.meta.env.VITE_APP_API_KEY

      const BASE_URL = "https://api.themoviedb.org/3";

      try {
        const response = await fetch(
          `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits,reviews,recommendations`
        );
        if (!response.ok) throw new Error("Failed to fetch movie details");

        const data = await response.json();
        const director =
          data.credits.crew.find((member: any) => member.job === "Director")
            ?.name || "Unknown";

        const trailer =
          data.videos.results?.length > 0
            ? `https://www.youtube.com/watch?v=${data.videos.results[0].key}`
            : null;

        setMovieDetails({
          title: data.title,
          poster_path: data.poster_path,
          overview: data.overview,
          genres: data.genres,
          cast: data.credits.cast,
          trailer: trailer,
          vote_average: data.vote_average,
          director: director,
          reviews: data.reviews.results,
          recommendations: data.recommendations.results,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie details");
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  useEffect(() => {
    if (movieDetails) {
      setIsFavorite(isMovieInFavorites(movieDetails.title));
    }
  }, [movieDetails]);

  const handleFavoriteClick = () => {
    if (movieDetails) {
      if (isFavorite) {
        removeFromFavorites(movieDetails.title); // Remove from favorites
      } else {
        addToFavorites(movieDetails); // Add to favorites
      }
      setIsFavorite(!isFavorite); // Toggle favorite state
    }
  };

  const handlePlayTrailer = () => {
    if (movieId) {
      navigate(`/movie/${movieId}/trailer`);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-blue-500">Loading movie details...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 bg-[#854e2c] text-white">
        {movieDetails && (
          <div className="w-[90%] m-auto">
            <div className="flex flex-col md:flex-row gap-6">
            {  /* Movie Poster */}
              {movieDetails.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                  className="w-full md:w-1/4 h-96 object-cover mb-4 md:mb-0 rounded"
                />
              ) : (
                <div className="w-full bg-gray-500 h-96" />
              )}
              <div className="md:ml-6 mt-4 md:mt-0">
                <h1 className="text-3xl font-bold mb-4">
                  {movieDetails.title}
                </h1>
                <h3 className="text-lg font-semibold">
                  Directed by: {movieDetails.director}
                </h3>
                <h3 className="text-xl font-semibold mt-4">Genres</h3>
                <p>
                  {movieDetails.genres.map((genre) => genre.name).join(", ")}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span>{movieDetails.vote_average}</span>
                </div>

                <div className="flex items-center gap-6 mb-6">
                 { /* Buttons */}
                  <div className="relative">
                    <button
                      onClick={handleFavoriteClick}
                      className={`text-3xl mt-4 ${
                        isFavorite ? "text-red-700" : "text-red-500"
                      } focus:outline-none transition-colors duration-300`}
                    >
                      <FaHeart />
                    </button>
                  </div>
                  <div className="relative group">
                    <FaListUl className="text-blue-500 text-3xl mt-4 hover:text-blue-700" />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm bg-black text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Add to Watchlist
                    </div>
                  </div>
                  <div className="relative group">
                    <FaListUl className="text-green-500 text-3xl mt-4 hover:text-green-700" />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm bg-black text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Add to List
                    </div>
                  </div>
                 { /* Trailer */}
                  {movieDetails.trailer && (
                    <div className="mt-6">
                      <button
                        onClick={handlePlayTrailer}
                        className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Play Trailer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
           {/* Movie Overview */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold">Overview</h3>
              <p>{movieDetails.overview}</p>
            </div>
            {/* Cast */}
            <h3 className="text-xl font-semibold mt-6">Cast</h3>
            <div className="flex space-x-6 overflow-x-auto mb-4">
              {movieDetails.cast.slice(0, 5).map((cast) => (
                <div key={cast.id} className="text-center flex-shrink-0">
                  {cast.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                      alt={cast.name}
                      className="w-32 h-32 object-cover rounded-full mb-2"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-500 rounded-full mb-2" />
                  )}
                  <p>{cast.name}</p>
                </div>
              ))}
            </div>
           { /* Reviews */}
            <ReviewsSection reviews={movieDetails.reviews} />
          {  /* Recommendations */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold">You might also like</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-6 mt-4">
                {movieDetails.recommendations.map((rec) => (
                  <div key={rec.id} className="text-center">
                    {rec.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                        alt={rec.title}
                        className="w-full h-40 object-cover mb-2 rounded"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-500 rounded mb-2" />
                    )}
                    <p>{rec.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
