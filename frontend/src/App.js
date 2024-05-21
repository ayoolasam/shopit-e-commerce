import Header from "./layout/Header";
import './App.css'
import Footer from "./layout/Footer";
import Home from './layout/Home.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
    <BrowserRouter>

    <Header/>
  <div className="container">
    <Routes>
    <Route path="/" element={<Home/>}/>
    </Routes>

  </div>

  <Footer/>
    </BrowserRouter>

    </div>
  );
}

export default App;
