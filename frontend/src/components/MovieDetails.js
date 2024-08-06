const MovieDetails = ({ movie }) => {
    return (
        <div className="movie-details">
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
            </div>
        </div>
    );
}

export default MovieDetails;