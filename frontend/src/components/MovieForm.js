import { useState } from "react";

const MovieForm = () => {
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState('');
    const [genres, setGenres] = useState('');
    const [duration, setDuration] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [imageUrl, setUrl] = useState('');
    const [error, setError] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const movie = {
            title,
            director,
            year,
            genres: genres.split(','),
            duration,
            review,
            rating,
            imageUrl
        };
        const response = await fetch('/api/addMovie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });
        const json = await response.json();
        if(!response.ok) {
            setError(json.message);
        }
        if(response.ok){
            setError(null);
            console.log('Movie added successfully');
            setTitle('');
            setDirector('');
            setYear('');
            setGenres('');
            setDuration('');
            setReview('');
            setRating('');
            setUrl('');
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
        />
        </label>
        <label>Director:
        <input
            type="text"
            name="director"
            placeholder="Director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
        />
        </label>
        <label>Year:
        <input
            type="number"
            name="year"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
        />
        </label>
        <label>Genres:
        <input
            type="text"
            name="genres"
            placeholder="Genres"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
        />
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
        />
        </label>
        <label>Image URL:
        <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setUrl(e.target.value)}
        />
        </label>
        <br />
        <button type="submit">Add Movie</button>
        {error && <div className="error">{error}</div>}
        </form>
    );
    }

    export default MovieForm;