// src/pages/SearchResults.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'

function SearchResults() {
  const location = useLocation();
  const results = location.state?.results || [];
  const query = location.state?.query || '';

  const {addToCart} = useCart()
  return (
    <div className="bg-blue-50 flex flex-col justify-center items-center min-h-full pb-10 px-6">
      <h2 className="text-xl font-semibold mb-4">
        Search results for: <span className="text-blue-800">"{query}"</span>
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-600">No products found matching your query.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {results.map(product => (
            <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md">
              <div className='w-full h-35 overflow-hidden mb-2 rounded'>          
                  <img src={product.image} alt={product.name} className='w-full h-full object-cover'/>
                </div>
              <h2 className='font-bold '>{product.name}</h2>
              <div className='font-semibold'>Rs. {product.price}</div>
              <div className='text-center'>
                <button onClick={() => addToCart(product)} className='bg-red-500 hover:bg-red-600 font-semibold rounded-full text-white py-1 px-4 transition-all duration-300 shadow-md'>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
