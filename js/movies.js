const moviesDiv = document.getElementById("movies");
const overlayContent = document.getElementById('overlay-content');
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=a27701f8805a63588f0f0862e55a29a3`

import { getPopularMovies, getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies} from "./api.js";
import { config } from "./config.js";

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let totalPages = 0;
var lastUrl = '';

let activeSlide = 0; // Define activeSlide globally
let totalVideos = 0; // Define totalVideos globally

const current = document.getElementById('current');
const prev = document.getElementById('prev-button');
const next = document.getElementById('next-button');
const main = document.getElementById('main'); // Replace with your element
const leftArrow = document.getElementById('left-arrow')
const rightArrow = document.getElementById('right-arrow')
const tagsEl = document.getElementById('tags');
const moviesHeadingTitle = document.getElementById('movies-heading');
const searchURL = `${config.api_base_url}search/movie?api_key=${config.api_key}`

// Defines the user's chosen genres.

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

leftArrow.addEventListener('click', () => {
    if(activeSlide > 0){
      activeSlide--;
    }else{
      activeSlide = totalVideos -1;
    }
  
    showVideos()
  })
  
  rightArrow.addEventListener('click', () => {
    if(activeSlide < (totalVideos -1)){
      activeSlide++;
    }else{
      activeSlide = 0;
    }
    showVideos()
  })
  

function showMovies(movies) {
    moviesDiv.innerHTML = movies.map(movie => renderSingleMovie(movie)).join("");
}

export async function renderMoviesTrending() {
    try {
        const movies = await getPopularMovies();
        console.log(movies);

        // Fetch descriptions for each movie
        const moviesWithDescriptions = await Promise.all(movies.results.map(async (movie) => {
            const response = await fetch(`${config.api_base_url}movie/${movie.id}?api_key=${config.api_key}`);
            const data = await response.json();
            return { ...movie, description: data.overview };
        }));

        // Render movies with descriptions
        showMovies(moviesWithDescriptions);

        // Attach event listeners for the expand buttons
        document.querySelectorAll('.expand').forEach(button => {
            button.addEventListener('click', (e) => {
                const movieId = e.target.getAttribute('data-movie-id');
                const movie = moviesWithDescriptions.find(m => m.id == movieId);
                openOverlay(movie);
            });
        });
    } catch (error) {
        console.error("Error rendering movies:", error);
        main.innerHTML = `
            <h1>Error loading movies</h1>
            <p>${error.message}</p>
        `;
    }
}

export async function renderNowPlayingMovies() {
    try {
        const movies = await getNowPlayingMovies();
        console.log(movies);

        // Fetch descriptions for each movie
        const moviesWithDescriptions = await Promise.all(movies.results.map(async (movie) => {
            const response = await fetch(`${config.api_base_url}movie/${movie.id}?api_key=${config.api_key}`);
            const data = await response.json();
            return { ...movie, description: data.overview };
        }));

        // Render movies with descriptions
        showMovies(moviesWithDescriptions);

        // Attach event listeners for the expand buttons
        document.querySelectorAll('.expand').forEach(button => {
            button.addEventListener('click', (e) => {
                const movieId = e.target.getAttribute('data-movie-id');
                const movie = moviesWithDescriptions.find(m => m.id == movieId);
                openOverlay(movie);
            });
        });
    } catch (error) {
        console.error("Error rendering movies:", error);
        main.innerHTML = `
            <h1>Error loading movies</h1>
            <p>${error.message}</p>
        `;
    }
}

export async function renderUpcomingMovies() {
    try {
        const movies = await getUpcomingMovies();
        console.log(movies);

        // Fetch descriptions for each movie
        const moviesWithDescriptions = await Promise.all(movies.results.map(async (movie) => {
            const response = await fetch(`${config.api_base_url}movie/${movie.id}?api_key=${config.api_key}`);
            const data = await response.json();
            return { ...movie, description: data.overview };
        }));

        // Render movies with descriptions
        showMovies(moviesWithDescriptions);

        // Attach event listeners for the expand buttons
        document.querySelectorAll('.expand').forEach(button => {
            button.addEventListener('click', (e) => {
                const movieId = e.target.getAttribute('data-movie-id');
                const movie = moviesWithDescriptions.find(m => m.id == movieId);
                openOverlay(movie);
            });
        });
    } catch (error) {
        console.error("Error rendering movies:", error);
        main.innerHTML = `
            <h1>Error loading movies</h1>
            <p>${error.message}</p>
        `;
    }
}

export async function renderTopRatedMovies() {
    try {
        const movies = await getTopRatedMovies();
        console.log(movies);

        // Fetch descriptions for each movie
        const moviesWithDescriptions = await Promise.all(movies.results.map(async (movie) => {
            const response = await fetch(`${config.api_base_url}movie/${movie.id}?api_key=${config.api_key}`);
            const data = await response.json();
            return { ...movie, description: data.overview };
        }));

        // Render movies with descriptions
        showMovies(moviesWithDescriptions);

        // Attach event listeners for the expand buttons
        document.querySelectorAll('.expand').forEach(button => {
            button.addEventListener('click', (e) => {
                const movieId = e.target.getAttribute('data-movie-id');
                const movie = moviesWithDescriptions.find(m => m.id == movieId);
                openOverlay(movie);
            });
        });
    } catch (error) {
        console.error("Error rendering movies:", error);
        main.innerHTML = `
            <h1>Error loading movies</h1>
            <p>${error.message}</p>
        `;
    }
}

function renderSingleMovie(movie) {
    const ratingPercentage = Math.round(movie.vote_average * 10);
    let className = "";

    if (ratingPercentage >= 80) {
        className = "green";
    } else if (ratingPercentage >= 50) {
        className = "orange";
    } else {
        className = "red";
    }

    // Check if the movie's poster_path exists, otherwise use the fallback image
    const posterPath = movie.poster_path 
        ? `${config.image_base_url + movie.poster_path}`
        : 'assets/img/imageNotFound.jpg';


    return `
        <div class="col-md-3 p-1">
            <img src="${posterPath}" class="img-fluid" >
            <div class="movie-info">
               <h3>${movie.title}</h3>
                <span id="percentage" class="${className}">${ratingPercentage}%</span>
            </div>
            <div class="description">
               <h3 class="overview">Overview</h3>    
               <p>${movie.description}</p>
               <button class="expand" data-movie-id="${movie.id}">Expand</button>                
            </div>            
        </div>
    `;
}


/* Show videos function */
function showVideos() {
    let embedClasses = document.querySelectorAll('.embed');
    let dots = document.querySelectorAll('.dot');

    totalVideos = embedClasses.length;
    embedClasses.forEach((embedTag, idx) => {
        if (activeSlide === idx) {
            embedTag.classList.add('show');
            embedTag.classList.remove('hide');
        } else {
            embedTag.classList.add('hide');
            embedTag.classList.remove('show');
        }
    });

    dots.forEach((dot, indx) => {
        if (activeSlide === indx) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}


function getMovies(url) {
    lastUrl = url;
    fetch(url)
        .then(res => res.json())
        .then(async data => {
            console.log(data.results);
            if (data.results.length !== 0) {
                // Fetch descriptions for each movie
                const moviesWithDescriptions = await Promise.all(data.results.map(async (movie) => {
                    const response = await fetch(`${config.api_base_url}movie/${movie.id}?api_key=${config.api_key}`);
                    const movieData = await response.json();
                    return { ...movie, description: movieData.overview };
                }));

                // Show movies with descriptions
                showMovies(moviesWithDescriptions);

                // Re-attach event listeners for the "Expand" buttons
                document.querySelectorAll('.expand').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const movieId = e.target.getAttribute('data-movie-id');
                        const movie = moviesWithDescriptions.find(m => m.id == movieId);
                        openOverlay(movie);
                    });
                });

                currentPage = data.page;
                nextPage = currentPage + 1;
                prevPage = currentPage - 1;
                totalPages = data.total_pages;

                current.innerText = currentPage;

                // Update pagination buttons
                if (currentPage <= 1) {
                    prev.classList.add('disabled');
                    next.classList.remove('disabled');
                } else if (currentPage >= totalPages) {
                    prev.classList.remove('disabled');
                    next.classList.add('disabled');
                } else {
                    prev.classList.remove('disabled');
                    next.classList.remove('disabled');
                }

            } else {
                main.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
            }
        })
        .catch(error => {
            console.error("Error fetching movies:", error);
            main.innerHTML = `
                <h1>Error loading movies</h1>
                <p>${error.message}</p>
            `;
        });
}

// Call getMovies functionality, ultimately

if (window.location.pathname.endsWith('index.html')) {
    getMovies(`${config.api_base_url}movie/popular?api_key=${config.api_key}`);
} else if (window.location.pathname.endsWith('nowplaying.html')) {
    getMovies(`${config.api_base_url}movie/now_playing?api_key=${config.api_key}`);
} else if (window.location.pathname.endsWith('toprated.html')) {
    getMovies(`${config.api_base_url}movie/top_rated?api_key=${config.api_key}`);
} else if (window.location.pathname.endsWith('upcoming.html')) {
    getMovies(`${config.api_base_url}movie/upcoming?api_key=${config.api_key}`);
}

function pageCall(page) {
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length - 1].split('=');
    if (key[0] != 'page') {
        let url = lastUrl + '&page=' + page;
        getMovies(url);
    } else {
        key[1] = page.toString();
        let a = key.join('=');
        queryParams[queryParams.length - 1] = a;
        let b = queryParams.join('&');
        let url = urlSplit[0] + '?' + b;
        console.log(url)
        getMovies(url);
    }
}

prev.addEventListener('click', () => {
    if(prevPage > 0){
      pageCall(prevPage);
    }
  })
  
  next.addEventListener('click', () => {
    if(nextPage <= totalPages){
      pageCall(nextPage);
    }
  })

// API Call to Get Movie/Show Info
async function getInfo(movie) {
    let id = movie.id;
    try {
      let response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${config.api_key}`);
      let data = await response.json();
      console.log(data);
      let releaseDate = data.release_date;
      let ratingVoteAverage = data.vote_average;
      let runTimeMovie = data.runtime;
      let genres = data.genres.map(genre => genre.name).join(', ');
      let status = data.status;
       // Extract and format the budget
      let budget = data.budget ? `$${data.budget.toLocaleString()}` : 'N/A';
      let revenue = data.revenue ? `$${data.revenue.toLocaleString()}` : 'N/A';
        
      let responseTwo = await fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${config.api_key}`);
      let rating = await responseTwo.json();
      console.log(rating);
      // Extracting the Certification with Improved Error Handling
      let usRelease = rating.results.find(result => result.iso_3166_1 === 'US');

      // Check if 'usRelease' exists and if 'release_dates' is not empty
      let certification = 'Not Rated';
      if (usRelease && usRelease.release_dates && usRelease.release_dates.length > 0) {
      certification = usRelease.release_dates[0].certification || 'Not Rated';
}
      let responseThree = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${config.api_key}`);
      let cast = await responseThree.json();
      console.log(cast);
      // Extract and format the first 15 actors
      let top15Actors = cast.cast.slice(0, 15).map(actor => {
        let [actorName, characterName] = [actor.original_name, actor.character];
        return `<p class="top15-actors">${actorName} as <span class="highlight">${characterName}</span></p>`;
       }).join('');


      return `
          <div class="movieInfo">
                <div class="movieInfo-left-col"> 
                <div class="release-date"><div class="release-date-title">Release Date:</div> ${releaseDate}</div>
                <div class="rating-vote-average"><div class="rating-title">Rating:</div> ${ratingVoteAverage}</div>
                <div class="runtime-movie"><div class="runtime-title">Runtime: </div> ${runTimeMovie} minutes</div>
                <div class="genres"><div class="genres-title">Genres:</div> ${genres}</div>
                <div class="certification"><div class="cert-title">Certification:</div>${certification}</div>
                <div class="top-actors"><div class="top-actors-title">Top Cast:</div>${top15Actors}</div>
                </div>
                <div class="movieInfo-right-col">
                <div class="status"><div class="status-title">Status:</div> ${status}</div>
                <div class="budget"><div class="budget-title">Budget:</div>${budget}</div>
                <div class="empty-row"></div>
                <div class="revenue"><div class="revenue-title">Revenue:</div>${revenue}</div>
                </div>
          </div>
      `;
    } catch (error) {
        console.error("Error fetching movie description:", error);
        return `
            <div class="movieInfo">
                <p>Error fetching movie information.</p>
            </div>
        `;            
    }
  }

/* Open when someone clicks on the span element */
function openOverlay(movie) {
    let id = movie.id;
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${config.api_key}`).then(res => res.json()).then(async (videoData) => {
        console.log(videoData);
        if (videoData) {
            document.getElementById("overlay").style.width = "100%";
            if (videoData.results.length > 0) {
                var embed = [];
                var dots = [];
                videoData.results.forEach((video, idx) => {
                    let { name, key, site } = video;

                    if (site == 'YouTube') {
                        embed.push(`
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        `);

                        dots.push(`
                            <span class="dot">${idx + 1}</span>
                        `);
                    }
                });

                // Get the movie info content by calling getInfo(movie)
                const movieInfoContent = await getInfo(movie);

                var content = `
                    <h1 class="no-results">${movie.original_title}</h1>
                    <br/>
                    ${movieInfoContent}
                    <div class="centered-content">
                    <h1 class="trailer-title">Trailers</h1>
                    ${embed.join('')}
                    <br/>
                    
                    <div class="dots">${dots.join('')}</div>
                    </div>
                `;
                overlayContent.innerHTML = content;
                activeSlide = 0;
                showVideos();
            } else {
                overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
            }
        }
    });
}
/* Close when someone clicks on the "x" symbol inside the overlay */
export function closeNav() {
    document.getElementById("overlay").style.width = "0%";
}

// Get the heading element
const moviesHeading = document.getElementById('movies-heading');

// Searches any movies you want
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value.trim();
    if (searchTerm) {
        // Update the heading to the search term
        moviesHeading.innerText = 'Search Results For: '+ searchTerm;

        // Fetch and display the movies based on the search term
        getMovies(searchURL + '&query=' + searchTerm);
    } else {
        // Reset the heading to "Trending Movies" if no search term is entered
        moviesHeading.innerText = "Trending Movies";

        // Fetch and display trending movies
        getMovies(`${config.api_base_url}movie/popular?api_key=${config.api_key}`);
    }
});

var selectedGenre = []
setGenre();
function setGenre() {
    tagsEl.innerHTML= '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                }else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
            moviesHeadingTitle.innerHTML = 'SORTING BY GENRE';
            highlightSelection()
        })
        tagsEl.append(t);
    })
}


function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtn()
    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }
}

function clearBtn(){
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('highlight')
    }else{
            
        let clear = document.createElement('div');
        clear.classList.add('tag','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenre();            
            getMovies(API_URL);
        })
        tagsEl.append(clear);
    }    
}

