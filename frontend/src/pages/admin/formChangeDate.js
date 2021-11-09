import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

//component
import DialogChangeDate from '../../components/Dialog/DialogChangeDate';
import FieldFormChangeDate from '../../components/Admin/fieldFormChangeDate';

import { getPostPonesById } from '../../services/postpone-serveice';
import { useSelector, useDispatch } from 'react-redux'
import { updatePostPoneById } from '../../services/redux-service';

export default function FormChangeDate(props) {

  let history = useHistory();

  const [open, setOpen] = useState(false);
  const [postPoneById, setPostPoneById] = useState()

  const dispatch = useDispatch();
  const postpones = useSelector(state => state.postpones);

  const dataPostPone = () => {
    const rows = postpones.length > 0 && postpones.map((data) => {
      const historys = {
        postpone_id: data.postpone_id,
        user_id: data.user_id,
        hn: data.hn,
        firstname: data.firstname,
        lastname: data.lastname,
        status: data.status,
        locations: data.locations,
        appointments: data.appointments,
        appointmentsNew: data.appointmentsNew,
        dateOld: data.dateOld,
        dateNew: data.dateNew,
        course: data.course,
        phone: data.phone
      }
      return historys
    })
    return rows
  }

  const data = dataPostPone();

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

  const getDataPostPone = (id) => {
    getPostPonesById(id)
      .then(response => {
        setPostPoneById(response.data.data);
      })
  }

  useEffect(() => {
    getDataPostPone(props.match.params.id)
  }, [props.match.params.id])

  // const postPoneSendEmail = (data) => {
  //   let templateParams = {
  //     name: data.firstName,
  //     lastname: data.lastName,
  //     HN: data.HN,
  //     dateOld: moment(data.MUIPickerOld).format('DD/MM/YYYY HH:mm'),
  //     dateNew: moment(data.MUIPickerNew).format('DD/MM/YYYY HH:mm'),
  //     appDr: data.appointments,
  //     check: data.status,
  //     to: data.email
  //   };

  //   emailjs.send('service_apfny9b', 'template_oliy0om', templateParams, 'user_Khbgb7HTDcAO6gFQnuCFU')
  //     .then(function (response) {
  //       console.log('SUCCESS!', response.status, response.text);
  //     }, function (error) {
  //       console.log('FAILED...', error);
  //     });
  // }

  const handleNext = async (data) => {
    const updateItem = {
      postpone_id: postPoneById.postpone_id,
      Doc_id: postPoneById.Doc_id,
      appointments: postPoneById.appointments,
      course: postPoneById.course,
      dateOld: postPoneById.dateOld,
      email: postPoneById.email,
      firstname: postPoneById.firstname,
      hn: postPoneById.hn,
      lastname: postPoneById.lastname,
      locations: postPoneById.locations,
      phone: postPoneById.phone,
      user_id: postPoneById.user_id,
      status: data.status,
      dateNew: postPoneById ? postPoneById.dateNew : data.dateNew,
    }
    await dispatch(updatePostPoneById(updateItem))
    // await postPoneSendEmail(data)
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

  if (postPoneById) {
    return (
      <React.Fragment>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleNext)}>
            <FieldFormChangeDate data={postPoneById} handleClickOpen={handleClickOpen} />
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
