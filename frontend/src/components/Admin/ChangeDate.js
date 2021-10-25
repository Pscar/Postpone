import React, { useState, useContext, useEffect } from 'react';
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
import { getPostPonesById } from '../../services/postpone-serveice';

import emailjs from 'emailjs-com';
import moment from 'moment';

export default function ChangeDate(row) {
  console.log("🚀 ~ file: ChangeDate.js ~ line 22 ~ ChangeDate ~ row", row.match.params.id)
  let history = useHistory();
  let infData;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { postPoneAll } = useContext(StoreContext);

  const [postPoneById, setPostPoneById] = useState()

  const rows = postPoneAll.map(row => {
    return row
  });

  const getDataPostPone = (rows) => {

    getPostPonesById(rows)
      .then(response => {
        console.log(response.data);
        setPostPoneById(response.data);
      })
  }

  useEffect(() => {
    getDataPostPone()
  }, [])

  const methods = useForm({
    defaultValues: {
      // hn: rows.hn,
      // firstname: rows.firstname,
      // lastname: rows.lastname,
      // locations: rows.locations,
      // appointments: rows.appointments,
      // dateOld: rows.dateOld,
      // dateNew: rows.dateNew,
      // course: rows.course,
      // email: rows.email,
      // phone: rows.phone,
      // status: rows.status
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
          {/* แก้ไขสถานะ และ วันที่เลื่อนนัด # {rows.postpone_id} */}
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