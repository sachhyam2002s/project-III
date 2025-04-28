import React, {useState} from 'react'
import { useUser } from '../contexts/UserContext'
import { NavLink } from 'react-router-dom'
import { User, Mail, Lock} from 'lucide-react'

function Account() {
  const {user, login, logout} = useUser()
  const [showLogin, setShowLogin] = useState(true)
  
  return (
    <div className="bg-blue-50 flex justify-around items-center min-h-full">
      <div className='flex flex-col sm:flex-row justify-around items-center p-5'>
        <div className="hidden sm:flex sm:w-1/2 lg:w-1/2">
            <img src="photo/store.png" alt="Store Image" width="100%"/>
        </div>
        <div className='bg-blue-200 w-90 sm:w-90 lg:w-1/3 p-6 rounded'>
          {showLogin ? (
              <form className='text-center flex flex-col gap-4'>
                <h2 className='font-semibold text-xl'>Login</h2>
                <div className='flex gap-2 items-center bg-white rounded p-1 '>
                  <Mail className='w-5 h-5'/>
                  <input type="email" placeholder='Email' name='email' className='outline-none' required/>
                </div>
                <div className='flex gap-2 items-center bg-white rounded p-1 '>
                  <Lock className='w-5 h-5'/>
                  <input type="password" placeholder='Password' name='password' className='outline-none' required/>
                </div>
                <NavLink to="" className='text-gray-600 text-sm hover:text-blue-600 hover:underline'>Forgot Password?</NavLink>
                <button type='button' onClick={() => login('name')} className='bg-red-500 text-white px-2 rounded-full'>
                  Login
                </button>
                <div>
                  <p className='text-gray-600 text-sm'>
                    Don't have an account?
                    <button type='button' onClick={() => setShowLogin(false)} className='text-blue-600 ml-1 hover:underline font-semibold'>Sign Up</button>
                  </p>
                </div>
              </form>
          ) : (
              <form className='text-center flex flex-col gap-4'>
                <h2 className='font-semibold text-xl'>Sign Up</h2>
                <div className='flex gap-2 items-center bg-white rounded p-1 '>
                <User className='w-5 h-5'/><input type="text" placeholder='Username' className='outline-none' required/>
                </div>
                <div className='flex gap-2 items-center bg-white rounded p-1 '>
                <Mail className='w-5 h-5'/><input type="text" placeholder='Email' className='outline-none' required/>
                </div>
                <div className='flex gap-2 items-center bg-white rounded p-1 '>
                <Lock className='w-5 h-5'/><input type="text" placeholder='Password' className='outline-none' required/>
                </div>
                <button type='button' onClick={() => login('NewUser')} className='bg-red-500 rounded-full text-white px-2'>
                  Sign Up
                </button>
                <div>
                  <p className='text-gray-500 text-sm'>Already have an account?
                    <button type='button' onClick={() => setShowLogin(true)} className='text-blue-600 ml-1 hover:underline font-semibold'>Sign In</button>
                  </p>
                </div>
              </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Account
