// utils/api.ts
export const fetchMovies = async (query: string) => {
    const apiKey = import.meta.env.VITEKEY; 
    const baseUrl = 'https://api.themoviedb.org/3/search/movie';
  
    try {
      const response = await fetch(`${baseUrl}?api_key=${apiKey}&query=${query}&language=en-US`);
      const data = await response.json();
      return data.results;  // Returns movie results
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return [];
    }
  };
  