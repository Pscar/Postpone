import React, { useState, createContext } from 'react'
import { getScheduleAll, getDoctorAll } from '../services/postpone-serveice';

export const StoreContext = createContext({})

export const StoreContextProvider = ({ children }) => {

  const [postPoneEdit, setPostPoneEdit] = useState();
  const [scheduleDr, setScheduleDr] = useState([]);
  const [doctor, setDoctor] = useState([]);

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
    postPoneEdit,
    setPostPoneEdit,
    scheduleDr,
    setScheduleDr,
    doctor,
    setDoctor
  }}>{children}</StoreContext.Provider>

}