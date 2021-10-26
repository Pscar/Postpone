import React, { useState, createContext } from 'react'
import { getPostPonesNow, getUserAll, getPostPoneAll, createPostPones } from '../services/postpone-serveice';
export const StoreContext = createContext({})

export const StoreContextProvider = ({ children }) => {
  // initail State
  // data 1 array
  const [createPostpone, setCreatePostPone] = useState();
  console.log("🚀 ~ file: Store.js ~ line 9 ~ StoreContextProvider ~ createPostpone", createPostpone)
  const [postPoneAll, setPostPoneAll] = useState([]);

  const [postPoneNow, setPostPoneNow] = useState();
  const [postPoneEdit, setPostPoneEdit] = useState();
  const [postPoneById, setPostPoneById] = useState();


  const [dataUser, setDataUser] = useState([]);
  const [dataUserNow, setDataUserNow] = useState([]);

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

  React.useEffect(() => {
    const loggedInUser = localStorage.getItem("login");
    if (loggedInUser) {
      setAuth(true)
      const foundUser = JSON.parse(loggedInUser);
      setDataUserNow(foundUser);
    } else {
      setAuth(false)
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('login', JSON.stringify(dataUserNow));
  }, [dataUserNow])

  React.useEffect(() => {
    getPostPoneAll()
      .then((res) => setPostPoneAll(res.data.data))
      .catch(err => console.log(err))
  }, [])

  React.useEffect(() => {
    getUserAll()
      .then((res => setDataUser(res.data)))
      .catch(err => console.log(err));
  }, []);


  React.useEffect(() => {
    localStorage.setItem('scheduleDr', JSON.stringify(scheduleDr));
  }, [scheduleDr]);

  return <StoreContext.Provider value={{
    
    auth,
    setAuth,
    dataUser,
    setDataUser,
    dataUserNow,
    setDataUserNow,

    scheduleDr,
    setScheduleDr,

    ownerDrData,
    setOwnerDrData,

    createPostpone,
    setCreatePostPone,

    postPoneEdit,
    setPostPoneEdit,
    postPoneNow,
    setPostPoneNow,
    postPoneAll,
    setPostPoneAll,
    postPoneById,
    setPostPoneById,

  }}>{children}</StoreContext.Provider>
}