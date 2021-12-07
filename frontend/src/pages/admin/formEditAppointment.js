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
        appointmentsId: data.appointmentsId,
        patientId: data.patientId,
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
      doctorName: dataAppointments.doctorName,
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
    if (data.course === 'เลือกตามวันเวลาเป็นหลัก พบแพทย์ท่านใดก็ได้') {
      const updateItem = {
        appointmentsId: appointmentById.appointmentsId,
        course: appointmentById.course,
        dateNew: appointmentById.dateNew,
        status: data.status,
        doctorName: data.doctorName,
      }
      await dispatch(updateAppointmentById(updateItem))

    } else {
      const updateItem = {
        appointmentsId: appointmentById.appointmentsId,
        course: appointmentById.course,
        doctorName: appointmentById.doctorName,
        dateNew: data.dateNew,
        status: data.status,
      }
      await dispatch(updateAppointmentById(updateItem))
    }


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
