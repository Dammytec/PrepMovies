import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites, removeFromFavorites } from "../utils/favoriteMovies";
import Header from "../shared/headers";

const FavoritesPage: React.FC = () => {
    const [favorites, setFavorites] = useState<any[]>([]);

    useEffect(() => {
        const storedFavorites = getFavorites();
        setFavorites(storedFavorites);
    }, []);

    const handleRemoveFavorite = (movieTitle: string) => {
        removeFromFavorites(movieTitle);
        setFavorites(getFavorites()); // Update the list after removing the movie
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto p-4 bg-[#854e2c] text-white">
                <h1 className="text-xl md:text-3xl font-bold mb-4">
                    Your Favorite Movies
                </h1>
                {favorites.length === 0 ? (
                    <p>No favorite movies yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {favorites.map((movie, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-64 object-cover mb-4 rounded"
                                />
                                <h3 className="text-xl font-semibold">{movie.title}</h3>
                                <button
                                    className="mt-4 bg-red-600 text-white py-2 px-4 rounded"
                                    onClick={() => handleRemoveFavorite(movie.title)}
                                >
                                    Remove from Favorites
                                </button>
                                <Link
                                    to={`/movie/${movie.id}`}
                                    className="mt-2 block text-blue-500"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
