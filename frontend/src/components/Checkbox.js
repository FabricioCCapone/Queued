import React, { useState } from 'react';

const Checkbox = () => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedGenres([...selectedGenres, value]);
        } else {
            setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
        }
    };

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

    return (
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
                className={emptyFields.includes('title') ? 'error' : ''}
            />
        </div>
    );
};

export default Checkbox;