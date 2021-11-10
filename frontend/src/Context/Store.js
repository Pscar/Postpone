import React, { useState, createContext } from 'react'

export const StoreContext = createContext({})

export const StoreContextProvider = ({ children }) => {

  const [postPoneEdit, setPostPoneEdit] = useState();
  return <StoreContext.Provider value={{ postPoneEdit, setPostPoneEdit }}>{children}</StoreContext.Provider>

}