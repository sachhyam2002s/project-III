import React, { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import { useCart } from '../contexts/CartContext' 
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Checkout() {
  const {user} = useUser()
  const { cartItems, clearCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if(!user) {
      navigate('/account', {replace: true})
    }
  }, [user, navigate])
  const grandTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const [formData, setFormData] = useState({
    fullname: '',
    number: ' ',
    email: ' ',
    city: '',
    payment: 'cash on delivery'
  })
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
  
    const payload = {
      user_id: user.id,
      customer: { ...formData },
      items: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity || 1,
        price: item.price
      })),
      total: grandTotal
    }
    try {
      const res = await axios.post(
        'http://localhost/product-api/checkout.php',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (res.data.success) {
        alert(`Order placed! Thank you.`)
        clearCart()
        setFormData({
          fullname: '',
          number: '',
          email: '',
          city: '',
          payment: 'cash on delivery'
        })
        navigate('/')
      } else {
        alert('Checkout failed. Please try again.')
      }
    } catch (err) {
      console.error(err)
      alert('Error submitting order.')
    }
  }

  return (
    <div className="bg-blue-50 flex flex-col justify-center items-center min-h-full px-5 pb-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center font-bold text-3xl mb-4">Complete Your Order</h1>
        <div className='border border-blue-300 rounded-2xl p-2 bg-blue-100'>
          <div className="grid gap-3 mb-4">
            <div className='flex flex-wrap gap-2 justify-center'>
            {cartItems.map((item, index) => (
              <span key={index} className='bg-blue-200 px-2 py-1 rounded-full text-sm'>
                {item.name} ({item.quantity}),
              </span>
              ))}
            </div>
            <div className='text-center'>
              <span className="inline-block bg-blue-300 px-4 py-1 rounded-full font-semibold text-lg">
                Grand Total: Rs. {grandTotal.toFixed(2)} /-
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="flex flex-col">
              <label className='font-semibold mb-1'>Full Name:</label>
              <input className='border border-gray-400 rounded-lg p-1 text-gray-700' type="text" placeholder="Enter your name" name="fullname" value={formData.fullname} onChange={handleChange} required />
            </div>
            <div className="flex flex-col">
              <label className='font-semibold mb-1'> Contact:</label>
              <input className='border border-gray-400 rounded-lg p-1 text-gray-700' type="number" placeholder="Enter your number" name="number" value={formData.number} onChange={handleChange} required />
            </div>
            <div className="flex flex-col">
              <label className='font-semibold mb-1'>Email:</label>
              <input className='border border-gray-400 rounded-lg p-1 text-gray-700' type="email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="flex flex-col">
              <label className='font-semibold mb-1'>Location:</label>
              <input className='border border-gray-400 rounded-lg p-1 text-gray-700' type="text" placeholder="Enter your location" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="flex flex-col">
              <label className='font-semibold mb-1'>Payment Method:</label>
              <select className='border border-gray-400 rounded-lg p-1 text-gray-700' value={formData.payment} name='payment' onChange={handleChange}>
                <option value="cash on delivery">Cash on Delivery</option>
                <option value="online">Online Payment</option>
              </select>
            </div>
            <div className='text-center md:col-span-2 mt-3 mb-1'>
              <button type='submit' className='bg-red-500 hover:bg-red-600 font-semibold rounded-full text-white py-1 px-4 transition-all duration-300 shadow-md'>
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout
