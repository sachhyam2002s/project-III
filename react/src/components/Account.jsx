import React, {useState} from 'react'
import { useUser } from '../contexts/UserContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { User, Mail, Lock} from 'lucide-react'

function Account() {
  const {user, login, register, logout} = useUser()
  const [showLogin, setShowLogin] = useState(true)
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleRegister = async () => {
    const { success, message } = await register(username, email, password)
    alert(message)
    if (success) {
      setShowLogin(true)
      setUsername('')
      setEmail('')
      setPassword('')
    }
  }
  const handleLogin = async () => {
    const { success, message } = await login(email, password);
    if (!success) {
      alert(message);
    } else {
      navigate('/');
    }
  };
  
  return (
    <div className="bg-blue-50 flex justify-around items-center min-h-full pb-5">
      <div className='flex flex-col sm:flex-row justify-around items-center p-5'>
        <div className="hidden sm:block sm:w-1/3">
            <img src="logo/store.png" alt="Store Image" width="100%" className='object-cover h-full w-full'/>
        </div>
        <div className='bg-red-100 w-90 sm:w-1/2 lg:w-1/3 p-6 rounded-xl'>
          {showLogin ? (
              <form className='text-center flex flex-col gap-4'>
                <h2 className='font-semibold text-xl'>Login</h2>
                <div className='flex gap-2 items-center bg-white rounded p-1 '>
                  <Mail className='w-5 h-5'/>
                  <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} className='outline-none' required/>
                </div>
                <div className='flex gap-2 items-center bg-white rounded p-1 '>
                  <Lock className='w-5 h-5'/>
                  <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} className='outline-none' required/>
                </div>
                <NavLink to="/forgotPassword" className='text-gray-600 text-sm hover:text-blue-600 hover:underline'>Forgot Password?</NavLink>
                <button type='button' onClick={handleLogin} className='bg-red-500 text-white px-2 rounded-full'>
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
                <User className='w-5 h-5'/><input type="text" placeholder='Username' className='outline-none' value={username} onChange={e => setUsername(e.target.value)} required/>
                </div>
                <div className='flex gap-2 items-center bg-white rounded p-1 '>
                <Mail className='w-5 h-5'/><input type="email" placeholder='Email' className='outline-none' value={email} onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div className='flex gap-2 items-center bg-white rounded p-1 '>
                <Lock className='w-5 h-5'/><input type="password" placeholder='Password' className='outline-none' value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>
                <button type='button' onClick={handleRegister} className='bg-red-500 rounded-full text-white px-2'>
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
