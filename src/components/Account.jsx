import React from 'react'
import { useUser } from '../contexts/UserContext'
import { NavLink } from 'react-router-dom'
import { User, Mail, Lock} from 'lucide-react'

function Account() {
  const {user, login, logout} = useUser()
  
  return (
    <div className="pt-28 bg-blue-50">
      <div className='flex flex-col sm:flex-row justify-center items-center gap-4 pb-5'>
        <div className="hidden sm:flex sm:w-1/2 lg:w-1/3">
            <img src="photo/store.png" alt="Store Image" width="100%"/>
        </div>
        <div className='bg-blue-200 p-5 flex gap-4'>
          <div className='text-center'>
            <form className=''>
              <h2 className='font-semibold'>Login</h2>
              <div className='flex gap-2'>
                <Mail className='w-5 h-5'/><input type="text" placeholder='Email' name='email' className='' required/>
              </div>
              <div className='flex gap-2'>
                <Lock className='w-5 h-5'/><input type="password" placeholder='Password' name='password' required/>
              </div>
              <div className=''>
                <NavLink to="" className='text-gray-500 text-sm hover:text-blue-600 hover:underline'>Forgot Password?</NavLink>
              </div>
              <button className='bg-red-500 text-white px-2 rounded-full'>
                Login
              </button>
              <div>
                <p className='text-gray-500 text-sm'>Don't have an account?<a href="" className='text-blue-600 p-1 hover:underline font-semibold'>Sign Up</a></p>
              </div>
            </form>
          </div>
          <div className='text-center'>
            <form className=''>
              <h2 className='font-semibold'>Sign Up</h2>
              <div className='flex gap-2'>
              <User className='w-5 h-5'/><input type="text" placeholder='Username' required/>
              </div>
              <div className='flex gap-2'>
              <Mail className='w-5 h-5'/><input type="text" placeholder='Email' required/>
              </div>
              <div className='flex gap-2'>
              <Lock className='w-5 h-5'/><input type="text" placeholder='Password' required/>
              </div>
              <button className='bg-red-500 rounded-full text-white px-2'>
                Sign Up
              </button>
              <div>
                <p className='text-gray-500 text-sm'>Already have an account?<a href="" className='text-blue-600 p-1 hover:underline font-semibold'>Sign In</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
