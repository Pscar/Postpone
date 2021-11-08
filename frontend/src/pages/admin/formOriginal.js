import React, { useState, useContext, useEffect } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";

//component
import FieldFormOriginal from '../../components/Admin/fieldFormOriginal';
import DialogChangeOrinal from '../../components/Dialog/dialogChangeOriginal';


import { getPostPonesById, updatePostPoneById } from '../../services/postpone-serveice';
import { StoreContext } from '../../Context/Store';

// import emailjs from 'emailjs-com';
// import moment from 'moment';

export default function FormOriginal() {
  let { id } = useParams();
  let history = useHistory();

  const [open, setOpen] = useState(false);
  const [postPoneById, setPostPoneById] = useState()
  const { postPoneAll, setPostPoneEdit } = useContext(StoreContext);

  const dataPostPone = () => {
    const rows = postPoneAll.map((data) => {
      const historys = {
        id: data.postpone_id,
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
    getDataPostPone(id)
  }, [id])


  const updatePostPonesById = (id, data) => {
    updatePostPoneById(id, data)
      .then(res => {
        setPostPoneEdit(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // const postPoneSendEmail = () => {
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
  console.log("🚀 ~ file: formOriginal.js ~ line 107 ~ handleNext ~ data", data)
    await updatePostPonesById(id, data)
    // await postPoneSendEmail(data)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmitChangOriginal = async () => {
    await window.location.reload(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/admin");
  };
  if (postPoneById) {
    return (
      <React.Fragment>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleNext)}>
            <FieldFormOriginal data={postPoneById} handleClickOpen={handleClickOpen} />
            <DialogChangeOrinal handleClose={handleClose} handleSubmitChangOriginal={handleSubmitChangOriginal} open={open} />
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