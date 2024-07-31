import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import the components we created
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
