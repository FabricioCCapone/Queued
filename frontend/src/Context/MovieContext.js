import { createContext, useReducer } from "react";

export const MoviesContext = createContext();

export const moviesreducer = (state, action) => {
    switch (action.type) {
        case 'GET_MOVIES':
            return {
                ...state,
                movies: action.payload
            };
        case 'ADD_MOVIE':
            return {
                ...state,
                movies: [...state.movies, action.payload]
            };
        case 'DELETE_MOVIE':
            return {
                ...state,
                movies: state.movies.filter(movie => movie._id !== action.payload)
            };
        default:
            return state;
    }
}

export const MoviesContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(moviesreducer, {
        movies: null
    });
    return (
        <MoviesContext.Provider value = {{...state, dispatch}}>
            {children}
        </MoviesContext.Provider>
    )
}