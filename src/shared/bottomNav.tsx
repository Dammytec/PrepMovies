import React from "react";
import { Link } from "react-router-dom"; // using react router for navigation

const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white shadow-lg z-10 md:hidden">
      <div className="flex justify-around items-center py-3">
       { /* Home Icon */}
        <Link to="/" className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-6 w-6 mb-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 9l9-7 9 7v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9z"
            />
          </svg>
          <span>Home</span>
        </Link>

       { /* Live TV Icon */}
        <Link to="/live-tv" className="flex flex-col items-center"> 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-6 w-6 mb-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4h16M4 12h16M4 20h16"
            />
          </svg>
          <span>Live TV</span>
        </Link>

       {  /* Favorites Icon */}
        <Link to="/favorites" className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-6 w-6 mb-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 3l7 7 7-7M5 13l7 7 7-7"
            />
          </svg>
          <span>Favorites</span>
        </Link>

       { /* Discover Icon */}
        <Link to="/discover" className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-6 w-6 mb-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 5v14m7-7H5"
            />
          </svg>
          <span>Discover</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
