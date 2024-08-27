import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {

    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className="navbar-container">
                <img src={`${process.env.PUBLIC_URL}/queued-favicon.png`} alt="Queued Favicon" className='navbar-queued-favicon' />
                <Link to="/">
                    <h1>Queued</h1>
                </Link>
                <nav>
                    {user && (
                        <div className="navbar-user">
                            <p>{user.user.username}</p>
                            <button onClick={handleClick}>Logout</button>
                        </div>
                    )}
                    {!user && (
                        <div className="navbar-links">
                            <Link to="/api/user/login">Login</Link>
                            <Link to="api/user/register">Register</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;