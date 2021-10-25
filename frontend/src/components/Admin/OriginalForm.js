import React, { useState, useContext } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import { StoreContext } from '../../Context/Store';

//component
import Originald from './Originald';
import DialogChangeO from './DialogChangeO';

//style
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Container
} from "@material-ui/core";

import emailjs from 'emailjs-com';
import moment from 'moment';

export default function OriginalForm(row) {
console.log("🚀 ~ file: OriginalForm.js ~ line 22 ~ OriginalForm ~ row", row)

  let { id } = useParams();
  let history = useHistory();
  let infData;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { postPoneAll } = useContext(StoreContext);

  const rows = postPoneAll.find(row => row.id === (id));
  console.log("🚀 ~ file: OriginalForm.js ~ line 31 ~ OriginalForm ~ rows", rows)

  const methods = useForm({
    defaultValues: {
      id: rows.postpone_id,
      hn: rows.hn,
      firstname: rows.firstname,
      lastname: rows.lastname,
      locations: rows.locations,
      appointments: rows.appointments,
      dateOld: rows.dateOld,
      dateNew: rows.dateNew,
      course: rows.course,
      email: rows.email,
      phone: rows.phone,
      status: rows.status
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
            <Originald data={rows} />
            <Button
              onClick={handleClickOpen}
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
            >
              ยืนยันการแก้ไข
            </Button>
            <DialogChangeO handleClose={handleClose} open={open} />
          </form>
        </FormProvider>
      </React.Fragment >
    );
  }

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Paper variant="outlined" square className={classes.paper}>
          แก้ไขสถานะ  # {rows.id}
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