export const addToFavorites = (movie: any) => {
  const favorites = getFavorites();
  favorites.push(movie);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const removeFromFavorites = (movieTitle: string) => {
  let favorites = getFavorites();
  favorites = favorites.filter((movie: any) => movie.title !== movieTitle);
  localStorage.setItem("favorites", JSON.stringify(favorites));``
};

export const getFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const isMovieInFavorites = (movieTitle: string) => {
  const favorites = getFavorites();
  return favorites.some((movie: any) => movie.title === movieTitle);
};
