import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { CartProvider } from './contexts/CartContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import { ProductProvider } from './contexts/ProductContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
      <CartProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
      </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
