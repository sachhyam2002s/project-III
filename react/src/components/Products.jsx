import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useUser } from '../contexts/UserContext'
import { useProducts } from '../contexts/ProductContext'

function Products() {
  const {addToCart} = useCart()
  const {products} = useProducts()
  const {user} = useUser()
  const navigate = useNavigate()
  
  return (
      <div className="bg-blue-50 flex flex-col justify-center items-center min-h-full pb-10 px-6">
          <h2 className="text-center font-bold text-4xl text-stone-800 mb-12 underline decoration-red-400 decoration-4 underline-offset-8">Our Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md">
                <div className='aspect-w-1 aspect-h-1'>          
                  <img src={product.image} alt={product.name} className='w-full h-full object-cover mb-2 rounded'/>
                </div>
                <h2 className='font-bold '>{product.name}</h2>
                <div className='font-semibold'>Rs. {product.price}</div>
                <div className='text-center mt-2'>
                  <button 
                  onClick={() => addToCart(product)
                  } className='bg-red-500 hover:bg-red-600 font-semibold rounded-full text-white py-1 px-4 transition-all duration-300 shadow-md'>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
      </div>
  )
}

export default Products
