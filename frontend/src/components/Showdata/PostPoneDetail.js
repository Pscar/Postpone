import React, { useContext } from 'react'
import { useParams } from "react-router-dom";
import { StoreContext } from '../../Context/Store';
import { makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  Paper,
  Grid,
  Container
} from "@material-ui/core";
import moment from 'moment';

export default function PostPoneDetail() {
  const { id } = useParams();
  const classes = useStyles();

  const { informations } = useContext(StoreContext);

  const rows = informations.find(row => row.id === Number(id));

  return (
    <React.Fragment>
      <Container fixed>
        <Paper className={classes.paper}>
          <Grid container spacing={2} className={classes.gridController}>
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
                {rows.HN}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                ชื่อ - นามสกุล
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {rows.firstName} &#160; {rows.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                สถานที่ตรวจ
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {rows.locations}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                นัดพบแพทย์
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {rows.appointments}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                เลื่อนนัดถัดไป
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {moment(rows.MUIPickerNew).format('DD-MM-YYYY HH:mm')}
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