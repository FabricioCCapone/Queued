import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import the components we created
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
          <Routes>
            <Route path='/user/login' element={<Login />} />
          </Routes>
          <Routes>
            <Route path='/user/register' element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
