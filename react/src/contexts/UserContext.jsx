import React, {createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }else{
      localStorage.removeItem('user')
    }
  },[user])
  const login = async (email, password) => {
      const res = await axios.post('http://localhost/product-api/login.php',{ email,password });
      if(res.data.success) 
        setUser({...res.data.user, loggedIn: true});
      return res.data
  }
  const register = async (username, email, password) => {
    const res = await axios.post('http://localhost/product-api/register.php', {username, email, password})
    return res.data
  }
  const logout = () => setUser(null)
  
  return (
    <UserContext.Provider value={{user, login, logout, register}}>
        {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
