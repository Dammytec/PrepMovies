# React + TypeScript + Vite
# PrepMovies

## Description
PrepMovies is a movie discovery platform where users can explore trending and popular movies. The application pulls data from The Movie Database (TMDb) API and displays movies with details such as their posters, release dates, and ratings. The design is responsive and works seamlessly across both mobile and desktop screens.

## Features
- View a list of trending and popular movies.
- Navigate to individual movie details.
- Mobile-friendly design for an optimal viewing experience.
- Search for movies by title.
- Dynamic SEO functionality for basic search engine optimization.

## Technologies Used
- **React**: The app is built with React, a powerful JavaScript library for building user interfaces. React's component-based architecture makes it easy to maintain and reuse UI elements across the app.

- **Tailwind CSS**: I used Tailwind CSS for styling the app. Its utility-first approach allowed me to style the components quickly and responsively, without writing custom CSS, making the design process faster and more efficient.

- **TypeScript**: The app is written in TypeScript to provide type safety, improving code quality and developer productivity. TypeScript ensures that we have proper type checks and autocompletion in the codebase, making it easier to scale and maintain the project.

- **SEO**: Basic SEO functionality has been implemented to improve the app’s visibility on search engines. Dynamic meta tags like titles and descriptions are set for different pages, including individual movie pages. However, since the app is client-side rendered, advanced SEO techniques could be further enhanced in the future.

## Prerequisites
To run this application locally, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)

## Setup Instructions

### Clone the repository

1. Clone the repository to your local machine using the following command:
   ```bash
   git clone https://github.com/your-username/PrepMovies.git
2. Navigate into the project directory:
    '''bash
    cd PrepMovies
3. Install the required dependencies by running    
    '''bash
    npm install
4. Create a .env file in the root directory  
    .env
    REACT_APP_API_KEY=your_tmdb_api_key
5. Running the application
    After configuring the .env file, run the app locally with
    '''bash
    npm run dev
6. Visit http://localhost:4000 in your browser to access the app    

Design and Trade-offs
Design Decisions:
React: I chose React to build the UI due to its efficient component-based architecture, which allows for easy management of the app’s state and UI updates.

Tailwind CSS: Tailwind CSS was chosen for styling due to its utility-first approach, which helps quickly apply styles without writing custom CSS, and makes the design process modular and maintainable.

External API: The app pulls movie data from The Movie Database (TMDb) API. Using an external API allows for easy access to rich, up-to-date movie information, including movie posters, release dates, and ratings, without the need for backend development.

SEO Functionality: The app implements basic SEO features such as dynamic meta tags (title, description, image) for individual pages to improve the app’s visibility on search engines. Although this app is client-side rendered (CSR), this basic functionality ensures that the content is indexed by search engines.

Client-Side Rendering (CSR): The app is client-side rendered, meaning that data fetching and page rendering occur in the browser. This allows for a more dynamic user experience but may impact SEO performance. SSR (server-side rendering) or pre-rendering could be added in the future for better SEO performance.

Trade-offs:
Performance: While CSR provides a dynamic, interactive UI, it might result in slower initial page load times because the JavaScript bundle has to be loaded first, and then the data is fetched via API requests.

SEO: Since the app is client-side rendered, SEO is not as efficient as SSR. Although basic meta tags are set dynamically, using SSR would be more beneficial for indexing content. Adding SSR or pre-rendering could be considered in future iterations to improve SEO performance.

Error Handling: Basic error handling is in place to notify the user if the movie data fetch fails. However, there is potential to further improve user experience with more granular error messages or a fallback UI when API data is unavailable or an error occurs.