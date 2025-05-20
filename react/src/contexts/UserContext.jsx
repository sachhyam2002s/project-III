import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useCart } from './CartContext'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  // Base API URL (adjust as needed)
  const apiBaseUrl = 'http://192.168.1.3/product-api'

  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const { clearCart } = useCart()

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  // Create an axios instance for auth requests
  const authApi = axios.create({ baseURL: apiBaseUrl })

  // Login method
  const login = async (email, password) => {
    const res = await authApi.post('/login.php', { email, password })
    if (res.data.success) {
      setUser({ ...res.data.user, loggedIn: true })
    }
    return res.data
  }

  // Register method
  const register = async (username, email, password) => {
    const res = await authApi.post('/register.php', { username, email, password })
    return res.data
  }

  // Forgot password: request reset link
  const forgotPassword = async (email) => {
    const res = await authApi.post('/forgot_password.php', { email })
    return res.data
  }

  // Reset password: complete the reset with token & new password
  const resetPassword = async (token, newPassword) => {
    const res = await authApi.post('/reset_password.php', { token, password: newPassword })
    return res.data
  }

  // Logout method
  const logout = () => {
    setUser(null)
    clearCart()
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        apiBaseUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
