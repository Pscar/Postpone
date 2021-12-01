import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  Paper,
  Grid,
  Container
} from "@material-ui/core";
import moment from 'moment';
import { getAppointmentById } from '../../services/appointmentService';
import { useSelector } from 'react-redux';

export default function PatientAppointmentDetail() {
  const { id } = useParams();
  const classes = useStyles();

  const [appointmentById, setAppointmentById] = useState()
  const logins = useSelector((state) => state.logins.login);

  const getDataAppointmentById = (id) => {
    getAppointmentById(id)
      .then(response => {
        setAppointmentById(response.data.data);
      })
  }

  useEffect(() => {
    getDataAppointmentById(id)
  }, [id])
  return (
    <React.Fragment>
      <Container fixed>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3">
                ใบนัดผู้ป่วย
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                HN:
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {appointmentById ? appointmentById.hn : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                ชื่อ - นามสกุล
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {logins.firstname} &#160; {logins.lastname}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                สถานที่ตรวจ
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {appointmentById ? appointmentById.locations : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                นัดพบแพทย์
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {appointmentById ? appointmentById.doctor_name : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                เลื่อนนัดถัดไป
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {moment(appointmentById ? appointmentById.dateNew : "").format('DD-MM-YYYY HH:mm')}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: '2rem',
    fontSize: 45,
    textAlign: 'center'
  },
}));