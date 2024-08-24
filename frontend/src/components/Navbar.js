import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {

    const { logout } = useLogout();

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
                    <div>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                    <Link to="/api/user/login">Login</Link>
                    <Link to="/api/user/register">Register</Link>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;