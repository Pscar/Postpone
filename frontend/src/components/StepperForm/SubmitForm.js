import React from 'react';
import { StoreContext } from '../../Context/Store';
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';
import Moment from 'react-moment';

import {
  Typography,
  Paper,
  Grid,
  Container
} from "@material-ui/core";

export default function SubmitForm() {
  const classes = useStyles();
  const { postPoneNow, postPoneEdit } = React.useContext(StoreContext)
  console.log("🚀 ~ file: SubmitForm.js ~ line 17 ~ SubmitForm ~ postPoneNow", postPoneNow)


  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <React.Fragment>
          <Grid container spacing={2} key={postPoneNow ? postPoneNow.postpone_id : ""}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                HN
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {postPoneEdit ? postPoneEdit.hn : postPoneNow ? postPoneNow.hn : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                ชื่อ - นามสกุล
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {postPoneEdit ? postPoneEdit.firstname : postPoneNow ? postPoneNow.firstname : ""} &#160; {postPoneEdit ? postPoneEdit.lastname : postPoneNow ? postPoneNow.lastname : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                สถานที่ตรวจ
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {postPoneEdit ? postPoneEdit.locations : postPoneNow ? postPoneNow.locations : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                นัดพบแพทย์
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {postPoneEdit ? postPoneEdit.appointments : postPoneNow ? postPoneNow.appointments : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                วัน/เดือน/ปี ที่นัดตรวจเดิม
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                <Moment format="DD-MM-YYYY HH:mm" date={postPoneEdit ? postPoneEdit.dateOld : postPoneNow ? postPoneNow.dateOld : ""} />
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                เบอร์โทรศัพท์ติดต่อผู้ป่วย
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {postPoneEdit ? postPoneEdit.phone : postPoneNow ? postPoneNow.phone : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                E-mail
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {postPoneEdit ? postPoneEdit.email : postPoneNow ? postPoneNow.email : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                เลื่อนนัดถัดไป
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {moment(postPoneEdit ? postPoneEdit.dateNew : postPoneNow ? postPoneNow.dateNew : "").format('DD-MM-YYYY hh:mm')}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                กรณีที่ไม่สามารถเลื่อนนัดให้พบแพทย์ท่านเดิม
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body" gutterBottom>
                {postPoneEdit ? postPoneEdit.course : postPoneNow ? postPoneNow.course : ""}
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