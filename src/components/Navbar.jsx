import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import {Search, ShoppingCart, Menu, X, Home, ShoppingBag, Layers, User} from 'lucide-react'
import {useCart} from '../contexts/CartContext'
import { useSearch} from '../contexts/SearchContext';

function Navbar({title}) {
//menu toggle
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen)
//shows active nav item
  const navClass = ({isActive}) => `hover:text-red-600 ${isActive? "text-red-600" : 'text-gray-700'}`;
//cart count
  const {cartItems} = useCart()
//search 
  const {searchQuery, setSearchQuery, handleSearch} = useSearch()

  return (
      <nav className='w-full h-16 z-10 bg-blue-100 shadow-blue-200 fixed top-0 left-0'>
        <div className='max-w-7xl mx-auto h-full px-6 flex justify-between items-center'>
            <div className='flex items-center gap-4'>
                <img className='rounded-full w-10 h-10 object-cover' src="./logo/NL.png" alt="Logo" />
                <Link to="/" className='text-blue-950 text-xl font-roboto font-bold'><strong>{title}</strong></Link>
            </div>
{/* searchbar*/}
            <div className='hidden md:flex items-center gap-2 ml-auto'>
              <div className='relative w-full max-w-xs'>
                <input 
                className='border rounded-full p-4 h-7 w-full text-sm outline-none' type="text" 
                value={searchQuery}
                onChange={e => {setSearchQuery(e.target.value)}}
                onKeyDown={e => {
                  if (e.key === 'Enter'){
                    handleSearch()
                  }
                }}
                placeholder="Search for products.." required />
                <Search onClick= {handleSearch} className='absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer '/>
              </div>
            </div>
{/* Nav items */}
            <div className='hidden md:flex items-center gap-8 ml-auto pr-2'>
                <NavLink to="" className={navClass}><Home className='w-5 h-5'/></NavLink>
                <NavLink to="/products" className={navClass}><ShoppingBag className='w-5 h-5'/></NavLink>
                {/* <NavLink to="/categories" className={navClass}>Categories</NavLink> */}
                <NavLink to="/cart" className={navClass}>
                  <div className='flex items-center relative'>
                    <ShoppingCart className='w-5 h-5'/>
                    {cartItems.length > 0 && (
                      <div className='absolute top-0 right-0 transform translate-x-1/2 bg-red-400 text-white text-xs px-1 rounded-full shadow-md'>{cartItems.length}</div>
                    )}
                  </div>
                </NavLink>
                <NavLink to="/account" className={navClass}><User className='w-5 h-5'/></NavLink>
            </div>

{/* toggle menu */}
            <div>
                <button className='md:hidden cursor-pointer' onClick={toggleMenu}>
                    {isOpen? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                </button>
            </div>
        </div>

        {isOpen && (
          <>
            <div className='md:hidden bg-blue-100 py-1 space-x-5 flex flex-row justify-center items-center '>
                <NavLink to="/" className={navClass}><Home className='w-5 h-5'/></NavLink>
                <NavLink to="/products" className={navClass}><ShoppingBag className='w-5 h-5'/></NavLink>
                {/* <NavLink to="/categories" className={navClass}><Layers className='w-5 h-5'/></NavLink> */}
                <div className='relative '>
                  <input 
                  className='border rounded-full p-2 h-7 w-full text-sm outline-none' type="text" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter'){
                      handleSearch()
                    }
                  }}
                  placeholder="Search for products.." required />
                  <Search onClick={handleSearch} className='absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer'/>
                </div>
                <NavLink to="/cart" className={navClass}>
                  <div className='flex items-center relative'>
                    <ShoppingCart className='w-5 h-5'/>
                    {cartItems.length > 0 && (
                      <div className='absolute top-0 right-0 transform translate-x-1/2 bg-red-400 text-white text-xs px-1 rounded-full shadow-md'>{cartItems.length}</div>
                    )}
                  </div>
                </NavLink>
              <NavLink to="/account" className={navClass}><User className='w-5 h-5'/></NavLink>
            </div>
          </>
        )}
    </nav>
  )
}

export default Navbar
