import { MoviesContext } from "../Context/MovieContext";
import { useContext } from "react";

export const useMoviesContext = () => {
    const context = useContext(MoviesContext);
    if (!context) {
        throw new Error('useMoviesContext must be used within a MoviesContextProvider');
    }
    return context;
}