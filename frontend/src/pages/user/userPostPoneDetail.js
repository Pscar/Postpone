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
import { getPostPonesById } from '../../services/postpone-redux';

export default function UserPostPoneDetail() {
  const { id } = useParams();
  const classes = useStyles();

  const [postPoneById, setPostPoneById] = useState()

  const getDataPostPone = (id) => {
    getPostPonesById(id)
      .then(response => {
        setPostPoneById(response.data.data);
      })
  }

  useEffect(() => {
    getDataPostPone(id)
  }, [id])
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
                {postPoneById ? postPoneById.hn : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                ชื่อ - นามสกุล
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {postPoneById ? postPoneById.firstname : ""} &#160; {postPoneById ? postPoneById.lastname : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                สถานที่ตรวจ
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {postPoneById ? postPoneById.locations : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                นัดพบแพทย์
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {postPoneById ? postPoneById.appointments : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                เลื่อนนัดถัดไป
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {moment(postPoneById ? postPoneById.dateNew : "").format('DD-MM-YYYY HH:mm')}
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