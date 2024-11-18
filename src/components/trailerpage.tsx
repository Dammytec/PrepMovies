import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Header from "../shared/headers";

const TrailerPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
        const API_KEY = 'b47db051659385374609427401504f12'
      const BASE_URL = "https://api.themoviedb.org/3";
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          setTrailerUrl(`https://www.youtube.com/embed/${data.results[0].key}`);
        }
      } catch (err) {
        console.error("Failed to fetch trailer", err);
      }
    };

    if (movieId) {
      fetchTrailer();
    }
  }, [movieId]);

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 bg-[#854e2c] text-white">
        <div className="w-full max-w-4xl m-auto">
          {trailerUrl ? (
            <iframe
              className="w-full h-[80vh]"
              src={trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <p>Loading trailer...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerPage;
