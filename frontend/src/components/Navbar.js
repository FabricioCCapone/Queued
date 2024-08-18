import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="navbar-container">
                <img src={`${process.env.PUBLIC_URL}/queued-favicon.png`} alt="Queued Favicon" className='navbar-queued-favicon'/>
                <Link to="/">
                    <h1>Queued</h1>
                </Link>
            </div>
        </header>
    );
}

export default Navbar;