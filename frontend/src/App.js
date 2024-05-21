import Header from "../src/components/layout/Header.jsx";
import './App.css'
import Footer from "../src/components/layout/Footer.jsx";
import Home from "../src/components/layout/Home.jsx"
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import  { Toaster } from 'react-hot-toast';
import ProductDetails from "./components/product/ProductDetails.jsx";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
<Toaster position="top-center" />
    <Header/>
    
  <div className="container">
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/:id" element={<ProductDetails/>}/>
    </Routes>

  </div>

  <Footer/>
    </BrowserRouter>

    </div>
  );
}

export default App;
