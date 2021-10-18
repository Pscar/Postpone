import React from 'react';
import { StoreContext } from '../../Context/Store';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'react-moment';

import {
  Typography,
  Paper,
  Grid,
  Container
} from "@material-ui/core";

export default function SubmitForm() {
  const classes = useStyles();
  const { informations } = React.useContext(StoreContext)

  const datas = informations.slice(-1);
  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        {datas.map((data) => (
          <React.Fragment>
            <Grid container spacing={2} key={data.id}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  HN
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  {data.HN}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  ชื่อ - นามสกุล
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  {data.firstName} &#160; {data.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  สถานที่ตรวจ
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  {data.locations}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  นัดพบแพทย์
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  {data.appointments}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  วัน/เดือน/ปี ที่นัดตรวจเดิม
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  <Moment format="DD-MM-YYYY HH:mm" date={data.MUIPickerOld} />
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  เบอร์โทรศัพท์ติดต่อผู้ป่วย
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  {data.phone}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  E-mail
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  {data.email}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  เลื่อนนัดถัดไป
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body" gutterBottom>
                  <Moment format="DD-MM-YYYY HH:mm" date={data.MUIPickerNew} />
                </Typography>
              </Grid>
         
              <Grid item xs={12} md={6}>
                <Typography variant="h6">
                  กรณีที่ไม่สามารถเลื่อนนัดให้พบแพทย์ท่านเดิม
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body" gutterBottom>
                  {data.course}
                </Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        ))}
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
    fontSize:'1rem'
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
}));