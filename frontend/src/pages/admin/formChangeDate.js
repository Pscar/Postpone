import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import DialogChangeDate from '../../components/Dialog/dialogChangeDate';
import FieldFormChangeDate from '../../components/Admin/fieldFormChangeDate';

import { useSelector, useDispatch } from 'react-redux'
import { updateAppointmentById, getAppointmentById } from '../../services/appointmentService';

export default function FormChangeDate(props) {

  let history = useHistory();

  const [open, setOpen] = useState(false);
  const [appointmentById, setAppointmentById] = useState()
  const dispatch = useDispatch();
  const appointment = useSelector(state => state.appointment);

  const dataAppointment = () => {
    const rows = appointment.length > 0 && appointment.map((data) => {
      const historys = {
        appointments_id: data.appointments_id,
        user_id: data.user_id,
        hn: data.hn,
        firstname: data.firstname,
        lastname: data.lastname,
        status: data.status,
        locations: data.locations,
        appointments: data.appointments,
        dateOld: data.dateOld,
        dateNew: data.dateNew,
        course: data.course,
        phone: data.phone
      }
      return historys
    })
    return rows
  }

  const data = dataAppointment();

  const methods = useForm({
    defaultValues: {
      hn: data.hn,
      firstname: data.firstname,
      lastname: data.lastname,
      locations: data.locations,
      appointments: data.appointments,
      dateOld: data.dateOld,
      dateNew: data.dateNew,
      course: data.course,
      email: data.email,
      phone: data.phone,
      status: data.status
    }
  });

  const getAppointment = (id) => {
    getAppointmentById(id)
      .then(response => {
        setAppointmentById(response.data.data);
      })
  }

  useEffect(() => {
    getAppointment(props.match.params.id)
  }, [props.match.params.id])

  const handleNext = async (data) => {
    const updateItem = await dispatch(updateAppointmentById({
      appointments_id: appointmentById.appointments_id,
      doc_id: appointmentById.doc_id,
      doctor_name: appointmentById.doctor_name,
      course: appointmentById.course,
      dateOld: appointmentById.dateOld,
      email: appointmentById.email,
      firstname: appointmentById.firstname,
      hn: appointmentById.hn,
      lastname: appointmentById.lastname,
      locations: appointmentById.locations,
      phone: appointmentById.phone,
      user_id: appointmentById.user_id,
      status: data.status,
      dateNew: data.dateNew,
    }));
    return updateItem
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmitChangeDate = async () => {
    await window.location.reload(true);
  }
  const handleClose = () => {
    setOpen(false);
    history.push("/admin");
  };

  if (appointmentById) {
    return (
      <React.Fragment>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleNext)}>
            <FieldFormChangeDate data={appointmentById} handleClickOpen={handleClickOpen} />
            <DialogChangeDate handleClose={handleClose} handleSubmitChangeDate={handleSubmitChangeDate} open={open} />
          </form>
        </FormProvider>
      </React.Fragment >
    )
  }
  return (
    <React.Fragment>
      <h1>ไม่มีข้อมูล</h1>
    </React.Fragment>
  )

} 
