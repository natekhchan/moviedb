import { config } from "./config.js"

const BASE_URL = config.api_base_url
const API_KEY = config.api_key

export async function getPopularMovies() {
    const response = await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function getNowPlayingMovies() {
    const response = await fetch(`${BASE_URL}movie/now_playing?api_key=${API_KEY}`)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function getUpcomingMovies() {
    const response = await fetch(`${BASE_URL}movie/upcoming?api_key=${API_KEY}`)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function getTopRatedMovies() {
    const response = await fetch(`${BASE_URL}movie/top_rated?api_key=${API_KEY}`)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

