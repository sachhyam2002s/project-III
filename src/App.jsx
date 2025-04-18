import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import AddProducts from "./components/AddProducts";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar title='New Look'/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/addProducts" element={<AddProducts/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
