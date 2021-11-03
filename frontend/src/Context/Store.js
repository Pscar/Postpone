import React, { useState, createContext } from 'react'
import { getUserAll, getPostPoneAll, getScheduleAll, getDoctorAll } from '../services/postpone-serveice';

export const StoreContext = createContext({})

export const StoreContextProvider = ({ children }) => {

  const [createPostpone, setCreatePostPone] = useState();
  const [postPoneAll, setPostPoneAll] = useState([]);

  const [postPoneNow, setPostPoneNow] = useState();
  const [postPoneEdit, setPostPoneEdit] = useState();
  const [postPoneById, setPostPoneById] = useState();


  const [dataUser, setDataUser] = useState([]);
  const [dataUserNow, setDataUserNow] = useState([]);

  const [scheduleDr, setScheduleDr] = useState([]);
  const [doctor, setDoctor] = useState([]);

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
    getScheduleAll()
      .then(res => {
        setScheduleDr(res.data.data)
        getDoctorAll()
          .then((res => setDoctor(res.data.data)))
          .catch(err => console.log(err));
      })
      .catch(e => {
        console.log(e);
      });
  }, [])

  return <StoreContext.Provider value={{

    auth,
    setAuth,
    dataUser,
    setDataUser,
    dataUserNow,
    setDataUserNow,

    scheduleDr,
    setScheduleDr,

    doctor,
    setDoctor,

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