import React, { useState, createContext } from 'react'
import axios from 'axios';

export const StoreContext = createContext({})

export const StoreContextProvider = ({ children }) => {
  // initail State
  const [createPostpone, setCreatePostPone] = useState();
  const [postPoneNow, setPostPoneNow] = useState();
  const [PostPoneEditById, setPostponeEditById] = useState();
  const [dataUser, setDataUser] = useState([]);
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



  const [auth, setAuth] = useState(() => {
    if (dataUser.length === 0) {
      return false
    }
  });

  // React.useEffect(() => {
  //   const loggedInUser = localStorage.getItem("login");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setDataUser(foundUser);
  //   }
  // }, []);



  React.useEffect(() => {
    axios.get(`http://localhost:5000/api/postpone/now`)
      .then((res => setPostPoneNow(res.data)))
      .catch(err => console.log(err));
  }, [createPostpone])

  React.useEffect(() => {
    localStorage.setItem('scheduleDr', JSON.stringify(scheduleDr));
  }, [scheduleDr]);

  return <StoreContext.Provider value={{
    createPostpone,
    setCreatePostPone,
    auth,
    setAuth,
    dataUser,
    setDataUser,
    scheduleDr,
    setScheduleDr,
    ownerDrData,
    setOwnerDrData,
    postPoneNow
  }}>{children}</StoreContext.Provider>
}