import React, { useState, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { StoreContext } from '../../Context/Store';

//component
import ChangeDateId from './ChangeDateId';
import DialogChangeDate from './DialogChangeDate';
//style 
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Container,
} from "@material-ui/core";

import emailjs from 'emailjs-com';
import moment from 'moment';

export default function ChangeDate() {
  let { id } = useParams();
  let history = useHistory();
  let infData;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { informations, setInformation } = useContext(StoreContext);


  const rows = informations.find(row => row.id === Number(id));

  const methods = useForm({
    defaultValues: {
      HN: rows.HN,
      id: rows.id,
      firstName: rows.firstName,
      lastName: rows.lastName,
      email: rows.email,
      password: rows.password,
      phone: rows.phone,
      MUIPickerNew: rows.MUIPickerNew,
      MUIPickerOld: rows.MUIPickerOld,
      locations: rows.locations,
      course: rows.course,
      appointments: rows.appointments,
      status: rows.status,
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/admin");
  };

  const handleNext = (data) => {
    const updateItem = informations.map((inf) => {
      return data.id === inf.id ? data : inf
    });
    setInformation(updateItem);

    // let templateParams = {
    //   name: data.firstName,
    //   lastname: data.lastName,
    //   HN: data.HN,
    //   dateOld: moment(data.MUIPickerOld).format('DD/MM/YYYY HH:mm'),
    //   dateNew: moment(data.MUIPickerNew).format('DD/MM/YYYY HH:mm'),
    //   appDr: data.appointments,
    //   check: data.status,
    //   to: data.email
    // };

    // emailjs.send('service_apfny9b', 'template_oliy0om', templateParams, 'user_Khbgb7HTDcAO6gFQnuCFU')
    //   .then(function (response) {
    //     console.log('SUCCESS!', response.status, response.text);
    //   }, function (error) {
    //     console.log('FAILED...', error);
    //   });

  }

  if (rows) {
    infData = (
      <React.Fragment>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleNext)}>
            <ChangeDateId data={rows} />
            <Button
              onClick={handleClickOpen}
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
            >
              ยืนยันการแก้ไข
            </Button>
            <DialogChangeDate handleClose={handleClose} open={open} />
          </form>
        </FormProvider>
      </React.Fragment >
    );
  }

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Paper variant="outlined" square className={classes.paper}>
          แก้ไขสถานะ และ วันที่เลื่อนนัด # {rows.id}
        </Paper>
        <Paper variant="outlined" className={classes.paper}>
          {infData}
        </Paper>
      </Container>
    </React.Fragment >
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