import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

//component
import ChangeDrId from './ChangeDrId';
import DialogChangeDr from '../Dialog/DialogChangeDr';

//style
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Container
} from "@material-ui/core";
import { getPostPonesById, updatePostPoneById } from '../../services/postpone-serveice';


import emailjs from 'emailjs-com';
import moment from 'moment';
import { StoreContext } from '../../Context/Store';

export default function ChangeDr() {
  let { id } = useParams();
  let history = useHistory();
  let infData;

  const classes = useStyles();
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

  const handleNext = (data) => {
    updatePostPonesById(id, data)
    // const updateItem = informations.map((inf) => {
    //   return data.id === inf.id ? data : inf
    // });
    // setInformation(updateItem);

    // let templateParams = {
    //   name: data.firstName,
    //   lastname: data.lastName,
    //   HN: data.HN,
    //   dateOld: moment(data.MUIPickerOld).format('DD/MM/YYYY HH:mm'),
    //   dateNew: moment(data.MUIPickerNew).format('DD/MM/YYYY HH:mm'),
    //   appDrOld: data.appointments,
    //   check: data.status,
    //   to: data.email
    // };

    // emailjs.send('service_lql88ig', 'template_yx5by8h', templateParams, 'user_Khbgb7HTDcAO6gFQnuCFU')
    //   .then(function (response) {
    //     console.log('SUCCESS!', response.status, response.text);
    //   }, function (error) {
    //     console.log('FAILED...', error);
    //   });

  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/admin");
  };

  if (postPoneById) {
    infData = (
      <React.Fragment>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleNext)}>
            <ChangeDrId data={postPoneById} />
            <Button
              onClick={handleClickOpen}
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
            >
              ยืนยันการแก้ไข
            </Button>
            <DialogChangeDr handleClose={handleClose} open={open} />
          </form>
        </FormProvider>
      </React.Fragment >
    );
  }

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Paper variant="outlined" square className={classes.paper}>
          แก้ไขสถานะ และ เปลี่ยนแพทย์ # {id}
        </Paper>
        <Paper variant="outlined" className={classes.paper}>
          {infData}
        </Paper>
      </Container>
    </React.Fragment>
  );
};


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    margin: '2rem',
    fontSize: 45,
    textAlign: 'center'
  },
  button: {
    display: 'flex',
    marginTop: '1rem',
  }
}));