import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';
import Moment from 'react-moment';
import {
  Typography,
  Paper,
  Grid,
  Container
} from "@material-ui/core";
import { useSelector } from 'react-redux';

export default function PatientSubmitForm(props) {

  const classes = useStyles();
  const logins = useSelector((state) => state.logins.login);

  const { createDataAppointments } = (props)

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <React.Fragment>
          <Grid container spacing={2} key={createDataAppointments.appointments_id}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                HN
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {createDataAppointments.hn}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                ชื่อ - นามสกุล
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {logins.firstName} &#160; {logins.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                สถานที่ตรวจ
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {createDataAppointments.location}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                นัดพบแพทย์
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {createDataAppointments.doctorName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                วัน/เดือน/ปี ที่นัดตรวจเดิม
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                <Moment format="DD-MM-YYYY HH:mm" date={createDataAppointments.dateOld} />
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                เบอร์โทรศัพท์ติดต่อผู้ป่วย
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {logins.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                E-mail
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {logins.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                เลื่อนนัดถัดไป
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {moment(createDataAppointments.dateNew).format('DD-MM-YYYY hh:mm')}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                กรณีที่ไม่สามารถเลื่อนนัดให้พบแพทย์ท่านเดิม
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body" gutterBottom>
                {createDataAppointments.course}
              </Typography>
            </Grid>
          </Grid>
        </React.Fragment>
      </Paper>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    fontSize: '1rem'
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
}));