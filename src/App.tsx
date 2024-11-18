import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FetchTrendingMovies from "./components/home"; // Ensure this path is correct
import MovieDetails from "./components/moviedetails";
import TrailerPage from "./components/trailerpage";
import FavoritesPage from "./components/favoritePage";
import BottomNav from "./shared/bottomNav";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
      {  /* Main content goes here */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<FetchTrendingMovies />} />
            <Route path="/movie/:movieId" element={<MovieDetails />} />
            <Route path="/movie/:movieId/trailer" element={<TrailerPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
       { /* Add the BottomNav component here */}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
