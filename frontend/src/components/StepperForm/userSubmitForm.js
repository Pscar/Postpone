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
import { useSelector } from 'react-redux';

export default function UserSubmitForm() {
  const classes = useStyles();
  const { postPoneEdit } = React.useContext(StoreContext)
  const { postpones } = useSelector((state) => state.postpones);


  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <React.Fragment>
          <Grid container spacing={2} key={postPoneEdit ? postPoneEdit.payload.postpone_id : postpones.postpone_id}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                HN
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {postPoneEdit ? postPoneEdit.payload.hn : postpones.hn}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                ชื่อ - นามสกุล
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {postPoneEdit ? postPoneEdit.payload.firstname : postpones.firstname} &#160; {postPoneEdit ? postPoneEdit.payload.lastname : postpones.lastname}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                สถานที่ตรวจ
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {postPoneEdit ? postPoneEdit.payload.locations : postpones.locations}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                นัดพบแพทย์
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {postPoneEdit ? postPoneEdit.payload.appointments : postpones.appointments}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                วัน/เดือน/ปี ที่นัดตรวจเดิม
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                <Moment format="DD-MM-YYYY HH:mm" date={postPoneEdit ? postPoneEdit.payload.dateOld : postpones.dateOld} />
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                เบอร์โทรศัพท์ติดต่อผู้ป่วย
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {postPoneEdit ? postPoneEdit.payload.phone : postpones.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                E-mail
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {postPoneEdit ? postPoneEdit.payload.email : postpones.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                เลื่อนนัดถัดไป
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body" gutterBottom>
                {moment(postPoneEdit ? postPoneEdit.payload.dateNew : postpones.dateNew).format('DD-MM-YYYY hh:mm')}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                กรณีที่ไม่สามารถเลื่อนนัดให้พบแพทย์ท่านเดิม
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body" gutterBottom>
                {postPoneEdit ? postPoneEdit.payload.course : postpones.course}
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