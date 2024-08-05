import { useEffect, useState } from 'react';

const Home = () => {

    const [movies, setMovies] = useState(null);
    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch('http://localhost:4000/api/movies');
            const data = await response.json();
            if (response.ok) {
                setMovies(data);
            }
        }
        fetchMovies();
    }, []);

    return (
        <div className="home">
            <h2>List of Movies Watched</h2>
            <div className="movies">
                {movies && movies.map(movie => (
                    <div className="movie" key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>Rating: {movie.rating}</p>
                        <p>Genre: {movie.genre}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;