import React, { useState, createContext } from 'react'
import { getUserAll, getScheduleAll, getDoctorAll } from '../services/postpone-serveice';

export const StoreContext = createContext({})

export const StoreContextProvider = ({ children }) => {

  const [postPoneEdit, setPostPoneEdit] = useState();
  const [dataUser, setDataUser] = useState([]);

  const [scheduleDr, setScheduleDr] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [postPoneById, setPostPoneById] = useState();


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
    dataUser,
    setDataUser,
    scheduleDr,
    setScheduleDr,
    doctor,
    setDoctor,
    postPoneEdit,
    setPostPoneEdit,
    postPoneById,
    setPostPoneById,

  }}>{children}</StoreContext.Provider>
}