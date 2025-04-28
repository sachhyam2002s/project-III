import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import AddProducts from "./components/AddProducts";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import Account from "./components/Account";

function App() {
  return (
    <>
    <div className="h-screen flex flex-col">
      <Navbar title='New Look'/>
      <header className="pt-26 bg-blue-50"/>
      <main className="flex-1">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/addProducts" element={<AddProducts/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/account" element={<Account/>}/>
      </Routes>
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
    </>
  )
}

export default App
