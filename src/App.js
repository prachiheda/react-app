import { useState, useEffect } from 'react'
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard'; 
// e4220912

const API_URL = 'http://www.omdbapi.com?apikey=e4220912';

const movie1 = {
    "Title": "Shrek: Thriller Night",
    "Year": "2011",
    "imdbID": "tt2051999",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDFhOGVlY2MtMGVlYS00OTdjLThkNzYtOTMwMDExMTA0YjQ3XkEyXkFqcGdeQXVyNDgyODgxNjE@._V1_SX300.jpg"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json(); 
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Shrek');
    }, []);

    return (
        <div className = 'app'>
            <h1>Movieland</h1>

            <div className = "search">
                <input
                    placeholder = "search for movies"
                    value = {searchTerm}
                    onChange = {(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src = {SearchIcon} 
                    alt = "search" 
                    onClick = {() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                    ? (
                        <div className = "container">
                            {movies.map((movie) => (
                                <MovieCard movie = {movie} />
                            ))}
                        </div>
                    ) : (
                        <div className = 'empty'>
                            <h2>No movies found</h2>
                        </div>
                    )}
        </div>
    );
}

export default App; 