const MovieDetails = ({ movie }) => {
    return (
        <div className="">
        <h3>{movie.name}</h3>
        <p>Director: {movie.director}</p>
        <p>Year of release: {movie.year}</p>
        <p>Personal rating: {movie.rating}</p>
        </div>
    );
    }

export default MovieDetails;