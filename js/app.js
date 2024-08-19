import { renderMoviesTrending, renderNowPlayingMovies, renderUpcomingMovies, renderTopRatedMovies} from './movies.js';

function App() {
    // Get the current page's file name
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'nowplaying.html') {
        // Call renderNowPlayingMovies if nowplaying.html is loaded
        renderNowPlayingMovies();
    } else if (currentPage === 'upcoming.html') {
        // Call renderUpcomingMovies if upcoming.html is loaded
        renderUpcomingMovies();
    } else if (currentPage === 'toprated.html') {
        // Call renderTopRatedMovies if toprated.html is loaded
        renderTopRatedMovies();
    } else {
        // Otherwise, call the trending movies render function
        renderMoviesTrending();
    }

}
    
App();
