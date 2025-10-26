import { useContext, useState, useEffect, createContext } from "react"

const AuthContext = createContext()

const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
