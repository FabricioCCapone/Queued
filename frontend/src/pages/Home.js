import { useEffect} from 'react';
import { useMoviesContext } from '../hooks/useMoviesContext';

//Components
import MovieDetails from '../components/MovieDetails';
import MovieForm from '../components/MovieForm';

const Home = () => {
    const { movies, dispatch } = useMoviesContext();
    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch('/api/movies');
            const data = await response.json();
            if (response.ok) {
                dispatch({ type: 'GET_MOVIES', payload: data });
            }
        }
        fetchMovies();
    }, [dispatch]);

    return (
        <div className="home">
            <h2>List of Movies Watched</h2>
            <div className="movies">
                {movies && movies.map((movie, index) => (
                    <div className="movie" key={movie.id || index}>
                        <MovieDetails key={movie._id}  movie={movie} />
                    </div>
                ))}
            </div>
            <MovieForm/>
        </div>
    );
}

export default Home;