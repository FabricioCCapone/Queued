import { useAuthContext } from "./useAuthContext";
import { useMoviesContext } from "./useMoviesContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: movieDispatch } = useMoviesContext();

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        movieDispatch({
            type: "GET_MOVIES",
            payload: null
        })
    }
    return { logout };

}