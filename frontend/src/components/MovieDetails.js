import { useMoviesContext } from "../hooks/useMoviesContext";

//Date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const MovieDetails = ({ movie }) => {

    const { dispatch } = useMoviesContext();

    const handleClick = async () => {
        const response = await fetch(`/api/` + movie._id, {
            method: 'DELETE'
        });
        // const data = await response.json();
        if (response.ok) {
            dispatch({ type: 'DELETE_MOVIE', payload: {_id: movie._id} });
        }
    }

    return (
        <div className="movie-details">
            <img src={movie.posterUrl} alt={movie.title} width="156px" height="231px" />
            <h3>{movie.title}</h3>
            <div>
                <p><strong>Director: </strong>{movie.director}</p>
                <p><strong>Year of Release: </strong>{movie.year}</p>
                <p><strong>Personal Rating: </strong>{movie.rating}</p>
            </div>
            <div>
                <p><strong>Genre: </strong>{movie.genre}</p>
                <p><strong>Duration: </strong>{movie.duration} minutes</p>
                <p><strong>My Review: </strong>{movie.review}</p>
                <p>{formatDistanceToNow(new Date(movie.createdAt), {addSuffix: true})}</p>
            </div>
            <div>
                <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
            </div>

        </div>
    );
}

export default MovieDetails;