import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,
  FaHome,
  FaTv,
  FaHeart,
  FaListAlt,
  FaUserCircle,
  FaBars,
} from "react-icons/fa"; // Icons for navbar
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // For mobile search bar toggle
  const [searchQuery, setSearchQuery] = useState(""); // State for holding search query
  const [searchResults, setSearchResults] = useState<any[]>([]); // State for holding search results

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Fetch movies based on search query from TMDb API
  const handleSearch = async (query: string) => {
    if (query.trim() === "") {
      setSearchResults([]); // Clear results if search query is empty
      return;
    }
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            api_key: "b47db051659385374609427401504f12",
            query: query,
            language: "en-US",
            page: 1,
          },
        }
      );
      setSearchResults(response.data.results); //  API returns search results in "results"
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Trigger search on input change
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);

    // Cleanup the timeout
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <header className="bg-gray-800 text-white p-4 fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          PrepMovies
        </Link>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            <FaBars size={24} />
          </button>
        </div>
      {  /* Search Icon (Mobile) */}
        <div className="lg:hidden">
          <button onClick={toggleSearch} className="text-white">
            <FaSearch size={24} />
          </button>
        </div>
       { /* Search Bar for large screen */}
        <div className="hidden lg:flex flex-1 justify-center items-center">
          <input
            type="text"
            placeholder="Search Movies..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div className="hidden lg:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-400">
            <FaHome size={24} />
          </Link>
          <Link to="/discover" className="text-white hover:text-gray-400">
            <FaListAlt size={24} />
          </Link>
          <Link to="/live-tv" className="text-white hover:text-gray-400">
            <FaTv size={24} />
          </Link>
          <Link to="/favorites" className="text-white hover:text-gray-400">
            <FaHeart size={24} />
          </Link>
          <Link to="/demand" className="text-white hover:text-gray-400">
            <FaListAlt size={24} />
          </Link>
          <Link to="/profile" className="text-white hover:text-gray-400">
            <FaUserCircle size={24} />
          </Link>
        </div>
        <div className="lg:hidden">
          <button className="text-white">
            <FaUserCircle size={24} />
          </button>
        </div>
      </div>
     { /* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-gray-800 text-white p-4 space-y-4">
          <Link to="/" className="block hover:text-gray-400">
            Home
          </Link>
          <Link to="/discover" className="block hover:text-gray-400">
            Discover
          </Link>
          <Link to="/live-tv" className="block hover:text-gray-400">
            Live TV
          </Link>
          <Link to="/favorites" className="block hover:text-gray-400">
            Favorites
          </Link>
          <Link to="/demand" className="block hover:text-gray-400">
            Demand
          </Link>
          <Link to="/profile" className="block hover:text-gray-400">
            Profile
          </Link>
        </div>
      )}
      {isSearchOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-gray-800 text-white p-4">
          <input
            type="text"
            placeholder="Search Movies..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 rounded-full w-full bg-gray-700 text-white focus:outline-none"
          />
        </div>
      )}
     { /* Display Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-gray-800 text-white p-4 mt-4">
          <h3 className="text-lg font-semibold">Search Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {searchResults.map((movie) => (
              <div key={movie.id} className="bg-gray-700 p-4 rounded-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <p className="text-white text-center">{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
