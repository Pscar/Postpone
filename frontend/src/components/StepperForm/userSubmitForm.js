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

export default function UserSubmitForm(props) {

  const classes = useStyles();
  const { postpones } = useSelector((state) => state.postpones);
  const { editPostPone } = (props)
  console.log("🚀 ~ file: userSubmitForm.js ~ line 18 ~ UserSubmitForm ~ editPostPone", editPostPone)


  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <React.Fragment>
          <Grid container spacing={2} key={editPostPone ? editPostPone.payload.postpone_id : postpones.postpone_id}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                HN
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {editPostPone ? editPostPone.payload.hn : postpones.hn}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                ชื่อ - นามสกุล
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {editPostPone ? editPostPone.payload.firstname : postpones.firstname} &#160; {editPostPone ? editPostPone.payload.lastname : postpones.lastname}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                สถานที่ตรวจ
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {editPostPone ? editPostPone.payload.locations : postpones.locations}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                นัดพบแพทย์
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {editPostPone ? editPostPone.payload.appointments : postpones.appointments}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                วัน/เดือน/ปี ที่นัดตรวจเดิม
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                <Moment format="DD-MM-YYYY HH:mm" date={editPostPone ? editPostPone.payload.dateOld : postpones.dateOld} />
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                เบอร์โทรศัพท์ติดต่อผู้ป่วย
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {editPostPone ? editPostPone.payload.phone : postpones.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                E-mail
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {editPostPone ? editPostPone.payload.email : postpones.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                เลื่อนนัดถัดไป
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {moment(editPostPone ? editPostPone.payload.dateNew : postpones.dateNew).format('DD-MM-YYYY hh:mm')}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                กรณีที่ไม่สามารถเลื่อนนัดให้พบแพทย์ท่านเดิม
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body" gutterBottom>
                {editPostPone ? editPostPone.payload.course : postpones.course}
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