import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import DialogEditAppointment from '../../components/Dialog/dialogEditAppointment';
import FieldFormEditAppointment from '../../components/Admin/fieldFormEditAppointment';

import { useSelector, useDispatch } from 'react-redux'
import { updateAppointmentById, getAppointmentById } from '../../services/appointmentService';

export default function FormEditAppointment(props) {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [appointmentById, setAppointmentById] = useState()

  const dispatch = useDispatch();
  const appointment = useSelector(state => state.appointment);
  
  const dataAppointment = () => {
    const rows = appointment.length > 0 && appointment.map((data) => {
      const appointments = {
        appointments_id: data.appointments_id,
        patient_id: data.patient_id,
        hn: data.hn,
        status: data.status,
        course: data.course,
      }
      return appointments
    })
    return rows
  }

  const dataAppointments = dataAppointment();


  const methods = useForm({
    defaultValues: {
      hn: dataAppointments.hn,
      doctor_name: dataAppointments.doctor_name,
      dateNew: dataAppointments.dateNew,
      course: dataAppointments.course,
      status: dataAppointments.status
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
    const updateItem = {
      appointments_id: appointmentById.appointments_id,
      course: appointmentById.course,
      dateNew: appointmentById.dateNew,
      status: data.status,
      doctor_name: data.doctor_name,
    }
    await dispatch(updateAppointmentById(updateItem))
  }
  const handleSubmitChangDr = async () => {
    await window.location.reload(true);

  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/admin");
  };

  if (appointmentById) {
    return (
      <React.Fragment>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleNext)}>
            <FieldFormEditAppointment data={appointmentById} handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} />
            <DialogEditAppointment handleClose={handleClose} handleSubmitChangDr={handleSubmitChangDr} open={open} />
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
