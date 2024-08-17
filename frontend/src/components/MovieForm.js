import { useState } from "react";
import { useMoviesContext } from "../hooks/useMoviesContext";

const MovieForm = () => {
    const { dispatch } = useMoviesContext();
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [duration, setDuration] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [posterUrl, setUrl] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const [error, setError] = useState(null);

    const genres = [
        'Action',
        'Comedy',
        'Drama',
        'Fantasy',
        'Horror',
        'Mystery',
        'Romance',
        'Thriller',
        'Western',
        'Science Fiction',
        'Animation',
        'Adventure',
        'Crime',
        'Documentary',
        'Family',
        'History',
        'Music',
        'War',
        'TV Movie',
        'Foreign',
        'Other'
    ];

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedGenres([...selectedGenres, value]);
        } else {
            setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const movie = {
            title,
            director,
            year,
            genres: selectedGenres,
            duration,
            review,
            rating,
            posterUrl
        };
        // Log the movie object to inspect the payload
        console.log('Movie payload:', movie);
        const response = await fetch('/api/addMovie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });

        const json = await response.json();

        if (!response.ok) {
            setEmptyFields(json.emptyFields || []);
            setError(json.error);
        }
        if (response.ok) {
            setError(null);
            setEmptyFields([]);
            setTitle('');
            setDirector('');
            setYear('');
            setSelectedGenres([]);
            setDuration('');
            setReview('');
            setRating('');
            setUrl('');
            console.log('Movie added successfully');
            dispatch({ type: 'ADD_MOVIE', payload: json });
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a Movie</h3>
            <label>Title:
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />
            </label>
            <label>Director:
                <input
                    type="text"
                    name="director"
                    placeholder="Director"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    className={emptyFields.includes('director') ? 'error' : ''}
                />
            </label>
            <label>Year:
                <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className={emptyFields.includes('year') ? 'error' : ''}
                />
            </label>
            <label>Genres:
                <div>
                    <div className='genres-checkboxes'>
                        {genres.map((genre) => (
                            <div key={genre}>
                                <input
                                    className='genre-checkbox'
                                    type="checkbox"
                                    name="genres"
                                    value={genre}
                                    onChange={handleCheckboxChange}
                                />
                                <label>{genre}</label>
                            </div>
                        ))}
                    </div>
                    <label>Selected Genres:</label>
                    <input
                        type="text"
                        value={selectedGenres.join(', ')}
                        readOnly
                        className={emptyFields.includes('genres') ? 'error' : ''}
                    />
                </div>
            </label>
            <label>Duration:
                <input
                    type="number"
                    name="duration"
                    placeholder="Duration"
                    value={duration}
                    min={1}
                    max={500}
                    onChange={(e) => setDuration(e.target.value)}
                    className={emptyFields.includes('duration') ? 'error' : ''}
                />
            </label>
            <label>Review:
                <input
                    type="text"
                    name="review"
                    placeholder="Review"
                    value={review}
                    maxLength={500}
                    onChange={(e) => setReview(e.target.value)}
                    className={emptyFields.includes('review') ? 'error' : ''}
                />
            </label>
            <label>Rating:
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    value={rating}
                    min={1}
                    max={10}
                    onChange={(e) => setRating(e.target.value)}
                    className={emptyFields.includes('rating') ? 'error' : ''}
                />
            </label>
            <label>Poster URL:
                <input
                    type="text"
                    name="posterUrl"
                    placeholder="Poster URL"
                    value={posterUrl}
                    onChange={(e) => setUrl(e.target.value)}
                    className={emptyFields.includes('posterUrl') ? 'error' : ''}
                />
            </label>
            <br />
            <button type="submit">Add Movie</button>
            {error && (
                <div className="error">
                    {emptyFields.map(field => field.charAt(0).toUpperCase() + field.slice(1)).join(', ')}
                </div>
            )}
        </form>
    );
}

export default MovieForm;