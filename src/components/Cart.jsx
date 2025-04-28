import React from 'react'
import { NavLink } from 'react-router-dom'
import {Trash2} from 'lucide-react'
import {useCart} from '../contexts/CartContext'

function Cart() {
  const {cartItems, removeFromCart, updateQuantity} = useCart()

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className='bg-blue-50 flex flex-col justify-center items-center min-h-full px-5'>
      <div className='max-w-full'>
        <h1 className='text-2xl font-bold text-center mb-4'>SHOPPING CART</h1>
        <div className='overflow-x-auto rounded-lg border border-stone-300'>
        <table className='min-w-full border-collapse'> 
          <thead className='bg-stone-300'>
            <tr>
              <th className='px-4 py-2 border-r border-stone-400'>Product</th>
              <th className='px-4 py-2 border-r border-stone-400'>Price</th>
              <th className='px-4 py-2 border-r border-stone-400'>Quantity</th>
              <th className='px-4 py-2 border-r border-stone-400'>Total</th>
              <th className='px-4 py-2'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
            <tr key={item.id} className=' text-center'>
              <td className='px-4 py-2 border-r border-stone-300'>{item.name}</td>
              <td className='px-4 py-2 border-r border-stone-300'>Rs.{item.price}</td>
              <td className='px-4 py-2 border-r border-stone-300'>
                <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.id, e.target.value)} className='w-16 border rounded px-1'/>
              </td>
              <td className='px-4 py-2 border-r border-stone-300'>Rs.{item.price * item.quantity}</td>
              <td className='px-4 py-2 text-center'>
                <button onClick={() => removeFromCart(item.id)} className='text-red-500 hover:text-red-800'>
                  <Trash2 className='w-5 h-5'/>
                </button>
              </td>
            </tr>
            ))
            ) : (
              <tr>
                <td colSpan={5} className='text-center text-gray-500 px-4 py-8'>Your cart is empty.</td>
              </tr>
            )}
          </tbody>
          {cartItems.length >0 && (
          <tfoot className='bg-stone-200'>
            <tr className='font-semibold '>
              <td className='px-4 py-3 text-right border-r border-stone-300' colSpan={3}>Total: </td>
              <td className='px-4 py-3 border-r border-stone-300'>Rs.{total.toFixed(2)} </td>
              <td className='px-4 py-3'/>
            </tr>
          </tfoot>
          )}
        </table>
        </div>
      </div>
      <div className='flex justify-center p-6'>
        <NavLink to="/checkout" className='bg-red-500 hover:bg-red-600 font-semibold rounded-full text-white py-1 px-4 transition-all duration-300 shadow-md'>Proceed to Checkout</NavLink>
      </div>
    </div>
  )
}

export default Cart
