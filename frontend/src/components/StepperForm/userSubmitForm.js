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
          {postpones && postpones.map((item) => (
            <Grid container spacing={2} key={postPoneEdit ? postPoneEdit.meta.arg.postpone_id : item.postpone_id}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  HN
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  {postPoneEdit ? postPoneEdit.meta.arg.hn : item.hn}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  ชื่อ - นามสกุล
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  {postPoneEdit ? postPoneEdit.meta.arg.firstname : item.firstname} &#160; {postPoneEdit ? postPoneEdit.meta.arg.lastname : item.lastname}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  สถานที่ตรวจ
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  {postPoneEdit ? postPoneEdit.meta.arg.locations : item.locations}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  นัดพบแพทย์
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  {postPoneEdit ? postPoneEdit.meta.arg.appointments : item.appointments}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  วัน/เดือน/ปี ที่นัดตรวจเดิม
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  <Moment format="DD-MM-YYYY HH:mm" date={postPoneEdit ? postPoneEdit.meta.arg.dateOld : item.dateOld} />
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  เบอร์โทรศัพท์ติดต่อผู้ป่วย
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  {postPoneEdit ? postPoneEdit.meta.arg.phone : item.phone}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  E-mail
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  {postPoneEdit ? postPoneEdit.meta.arg.email : item.email}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  เลื่อนนัดถัดไป
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  {moment(postPoneEdit ? postPoneEdit.meta.arg.dateNew : item.dateNew).format('DD-MM-YYYY hh:mm')}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6">
                  กรณีที่ไม่สามารถเลื่อนนัดให้พบแพทย์ท่านเดิม
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body" gutterBottom>
                  {postPoneEdit ? postPoneEdit.meta.arg.course : item.course}
                </Typography>
              </Grid>
            </Grid>
          ))}
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