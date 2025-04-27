import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { CartProvider } from './contexts/CartContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
