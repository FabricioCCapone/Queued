import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="navbar-container">
                <img src={`${process.env.PUBLIC_URL}/queued-favicon.png`} alt="Queued Favicon" className='navbar-queued-favicon' />
                <Link to="/">
                    <h1>Queued</h1>
                </Link>
                <nav>
                    <Link to="/user/login">Login</Link>
                    <Link to="/user/register">Register</Link>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;