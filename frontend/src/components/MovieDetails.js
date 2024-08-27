import { useMoviesContext } from "../hooks/useMoviesContext";
import {useAuthContext} from "../hooks/useAuthContext";

//Date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const MovieDetails = ({ movie }) => {

    const { user } = useAuthContext();

    const { dispatch } = useMoviesContext();

    const handleClick = async () => {
        if(!user){
            alert('You must be logged in to delete a movie');
            return;
        }
        const response = await fetch(`/api/` + movie._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        });
        // const data = await response.json();
        if (response.ok) {
            dispatch({ type: 'DELETE_MOVIE', payload: {_id: movie._id} });
        }
    }

    return (
        <div className="movie-details">
            <img src={movie.posterUrl} alt={movie.title} width="156px" height="231px" />
            <div>
                <h3>{movie.title}</h3>
            </div>
            <div>
                <p><strong>Director: </strong>{movie.director}</p>
                <p><strong>Year of Release: </strong>{movie.year}</p>
                <p>⭐{movie.rating}/10</p>
            </div>
            <div>
                {movie.genres && (
                    <p><strong>Genres: </strong>{movie.genres.join(', ')}</p>
                )}
                <p><strong>Duration: </strong>{movie.duration} minutes</p>
                <p><strong>My Review: </strong>{movie.review}</p>
                <p><strong>Created: </strong>{formatDistanceToNow(new Date(movie.createdAt), {addSuffix: true})}</p>
            </div>
            <div className="delete-div">
                <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
            </div>
        </div>
    );
}

export default MovieDetails;