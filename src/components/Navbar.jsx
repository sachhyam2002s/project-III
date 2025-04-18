import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import {ShoppingCart, Menu, X} from 'lucide-react'

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen)

  const navClass = ({isActive}) => `hover:text-red-500 ${isActive? "text-red-500" : 'text-gray-700'}`;

  return (
      <nav className='w-full z-10 bg-red-50 shadow-blue-200 '>
        <div className='max-w-7xl mx-auto py-2 px-6 flex justify-between items-center'>
            <div className='flex items-center gap-4'>
                <img className='rounded-full w-10 h-10 object-cover' src="./logo/NL.png" alt="Logo" />
                <Link to="/" className='text-blue-950 text-xl font-roboto font-bold'><strong>{props.title}</strong></Link>
            </div>
            <div className='hidden md:flex items-center gap-8 ml-auto'>
                <NavLink to="/" className={navClass}>Home</NavLink>
                <NavLink to="/about" className={navClass}>All Products</NavLink>
                <NavLink to="/contact" className={navClass}>Categories</NavLink>
            </div>
            <div className='hidden md:flex items-center gap-2 ml-auto'>
              <input className='border rounded-4xl p-1 h-7 ' type="text" name="query" placeholder="Search for products.." required />
              <button className='relative p-2 hover:text-blue-900'>
                <ShoppingCart className='w-6 h-6'/>
              </button>
            </div>
            <div>
                <button className='md:hidden' onClick={toggleMenu}>
                    {isOpen? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                </button>
            </div>
        </div>

        {isOpen && (
          <>
            <div className='md:hidden bg-blue-50 py-4 px-4 space-y-4 flex flex-col items-center '>
                <NavLink to="/" className={navClass}>Home</NavLink>
                <NavLink to="/about" className={navClass}>All Products</NavLink>
                <NavLink to="/contact" className={navClass}>Categories</NavLink>
            </div>
            <div className='md:hidden bg-blue-50 flex flex-col space-y-2  items-center'>
              <input className='border rounded-4xl p-1 h-6' type="text" name="query" placeholder="Search for products.." required />
              <button className='relative p-2 hover:text-blue-900'>
              <ShoppingCart className='w-6 h-6'/>
              </button>
            </div>
          </>
        )}
    </nav>
  )
}

export default Navbar
