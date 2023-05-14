import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';

import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About/>}> </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
