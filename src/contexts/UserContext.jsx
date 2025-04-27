import React, {createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({name: 'Guest', loggedIn: false})

    const login = (name) => {
        setUser({name, loggedIn: true})
    }
    const logout = () => {
        setUser({name: 'Guest', loggedIn: false})
    }
  return (
    <UserContext.Provider value={{user, login, logout}}>
        {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
