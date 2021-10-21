import React, { useState, createContext } from 'react'
import { getPostPonesNow } from '../services/postpone-serveice';
export const StoreContext = createContext({})

export const StoreContextProvider = ({ children }) => {
  // initail State
  // data 1 array
  const [createPostpone, setCreatePostPone] = useState();
  console.log("🚀 ~ file: Store.js ~ line 10 ~ StoreContextProvider ~ createPostpone", createPostpone)
  const [postPoneNow, setPostPoneNow] = useState();
  console.log("🚀 ~ file: Store.js ~ line 11 ~ StoreContextProvider ~ postPoneNow", postPoneNow)
  const [dataUserNow, setDataUserNow] = useState([]);
  const [postPoneEdit, setPostPoneEdit] = useState();
  const [dataUser, setDataUser] = useState([]);
  const [postPoneUpdate, setPostPoneUpdate] = useState();
  const [postPoneAll, setPostPoneAll] = useState([]);

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

  // React.useEffect(() => {
  //   axios.get(`http://localhost:5000/api/postpone/get`)
  //     .then((res => setPostPoneAll(res.data)))
  //     .catch(err => console.log(err));
  // }, [createPostpone])


  React.useEffect(() => {
    getPostPonesNow()
      .then((res => setPostPoneNow(res.data)))
      .catch(err => console.log(err));
  }, [createPostpone])

  React.useEffect(() => {
    localStorage.setItem('scheduleDr', JSON.stringify(scheduleDr));
  }, [scheduleDr]);

  return <StoreContext.Provider value={{
    createPostpone,
    setCreatePostPone,
    postPoneEdit,
    setPostPoneEdit,
    postPoneUpdate,
    setPostPoneUpdate,
    auth,
    setAuth,
    dataUser,
    setDataUser,
    setDataUserNow,
    scheduleDr,
    setScheduleDr,
    ownerDrData,
    setOwnerDrData,
    postPoneNow,
    setPostPoneNow
  }}>{children}</StoreContext.Provider>
}