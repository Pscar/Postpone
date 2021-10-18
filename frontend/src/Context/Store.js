import React, { useState, createContext } from 'react'

export const StoreContext = createContext({})

export const StoreContextProvider = ({ children }) => {
  // initail State
  const [informations, setInformation] = useState(() => {
    const saveInf = window.localStorage.getItem("informations")
    if (saveInf) {
      return JSON.parse(saveInf);
    } else {
      return []
    }
  })

  const [ownerDrData, setOwnerDrData] = useState([
    { name: 'Nancy', Id: 1, OwnerColor: '#ffaa00' },
    { name: 'Steven', Id: 2, OwnerColor: '#f8a398' },
    { name: 'Michael', Id: 3, OwnerColor: '#7499e1' },
    
  ]);

  const [scheduleDr, setScheduleDr] = useState(() => {
    const saveSchDr = window.localStorage.getItem("scheduleDr")
    if (saveSchDr) {
      return JSON.parse(saveSchDr);
    } else {
      return []
    }
  });


  const [dataUser, setDataUser] = useState([]);
  const [auth, setAuth] = useState(() => {
    if (dataUser.length === 0) {
      return false
    }
  });

  React.useEffect(() => {
    const loggedInUser = localStorage.getItem("login");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setDataUser(foundUser);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('login', JSON.stringify(dataUser));
  }, [dataUser])

  React.useEffect(() => {
    window.localStorage.setItem('informations', JSON.stringify(informations));
  }, [informations]);

  React.useEffect(() => {
    localStorage.setItem('scheduleDr', JSON.stringify(scheduleDr));
  }, [scheduleDr]);

  return <StoreContext.Provider value={{ informations, setInformation, auth, setAuth, dataUser, setDataUser, scheduleDr, setScheduleDr, ownerDrData, setOwnerDrData }}>{children}</StoreContext.Provider>
}