import React from 'react'
import { useCart } from '../contexts/CartContext'


function Products() {
  const {addToCart} = useCart()
  const products = [
    {id:1, name:"Converse", image:"/photo/converse.jpg", price:"3000"},
    {id:2, name:"Air Jordan", image:"/photo/jordan.jpg", price:"5000"},
    {id:3, name:"Air Jordan", image:"/photo/jordan.jpg", price:"3000"},
    {id:4, name:"Air Jordan", image:"/photo/jordan.jpg", price:"2000"}
  ]
  return (
      <div className="bg-blue-50 py-12 px-6 pt-28">
          <h2 className="text-center font-bold text-4xl text-stone-800 mb-12 underline decoration-red-400 decoration-4 underline-offset-8">Our Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-lg hover:scale-105 transition-transform duration-300 shadow-md text-center">
                <img src={product.image} alt={product.name} className='w-full h-auto object-cover mb-2 rounded'/>
                <h2 className='font-bold '>{product.name}</h2>
                <div className='font-semibold'>Rs. {product.price}</div>
                <button onClick={() => addToCart(product)} className='bg-red-500 hover:bg-red-600 font-semibold rounded-full text-white py-1 px-4 transition-all duration-300 shadow-md'>Add to Cart</button>
              </div>
            ))}
          </div>
      </div>
  )
}

export default Products
