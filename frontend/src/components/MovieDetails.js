import { useMoviesContext } from "../hooks/useMoviesContext";

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
            <h3>{movie.title}</h3>
            <img src={movie.posterUrl} alt={movie.title} />
            <div>
                <p><strong>Director: </strong>{movie.director}</p>
                <p><strong>Year of Release: </strong>{movie.year}</p>
                <p><strong>Personal Rating: </strong>{movie.rating}</p>
            </div>
            <div>
                <p><strong>Genre: </strong>{movie.genre}</p>
                <p><strong>Duration: </strong>{movie.duration} minutes</p>
                <p><strong>My Review: </strong>{movie.review}</p>
            </div>
            <div>
                <span onClick={handleClick}>Delete</span>
            </div>

        </div>
    );
}

export default MovieDetails;