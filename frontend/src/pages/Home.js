import { useEffect, useState } from 'react';
import { useMoviesContext } from '../hooks/useMoviesContext';
import {useAuthContext} from '../hooks/useAuthContext';

//Components
import MovieDetails from '../components/MovieDetails';
import MovieForm from '../components/MovieForm';

const Home = () => {
    const { movies, dispatch } = useMoviesContext();
    const [showForm, setShowForm] = useState(false);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch('/api/movies', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                dispatch({ type: 'GET_MOVIES', payload: data });
            }
        }
        if (user){
            fetchMovies();
        }
    }, [dispatch, user]);

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="home">
            <h2>List of Movies Watched</h2>
            <div className="movies">
                {movies && movies.map((movie, index) => (
                    <div className="movie" key={movie.id || index}>
                        <MovieDetails key={movie._id} movie={movie} />
                    </div>
                ))}
            </div>
            <button className='show-form-button' onClick={toggleFormVisibility}>
                {showForm ? 'Hide Form' : 'Add New Movie'}
            </button>
            {showForm && <MovieForm />}
            
        </div>
    );
}

export default Home;