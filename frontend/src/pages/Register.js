import { useState } from 'react';
import {useRegister} from '../hooks/useRegister';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState('');
    const { register, error, isLoading } = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(username, password, email);
        if (!error) {
            setSuccess('User registered successfully');
        }
    }

    return (
        <div>
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <label>Password:</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <label>Email:</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <button disabled={isLoading} type="submit">Register</button>
            </form>
            {error && <div className='error'>{error}</div>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    )
}

export default Register;