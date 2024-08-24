import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const register = async (username, password, email) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                    email
                })
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error);
                setIsLoading(false);
            }
            if (res.ok) {
                setError(null);
                setIsLoading(false);
                localStorage.setItem('user', JSON.stringify(data));
                dispatch({ type: 'LOGIN', payload: data });
            }
        } catch (err) {
            console.error(err);
        }
    }
    return { register, error, isLoading };
}

export { useRegister };
