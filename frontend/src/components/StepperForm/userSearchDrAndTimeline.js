import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Container,
  Typography
} from '@material-ui/core';

import UserCondition from './userCondition';
import DoctorTableHeadDr from '../Doctors/doctorTableHeadDr';
import { useSelector } from 'react-redux';

export default function UserSearchDrAndTimeline(props) {
  const classes = useStyles();

  const { handleNext } = props
  const { doctors } = useSelector((state) => state.doctors);
  console.log("🚀 ~ file: doctorTableHeadDr.js ~ line 35 ~ TimelineDr ~ doctors", doctors)

  const conditionPostPone = [
    {
      id: 1,
      title: 'ผู้ใช้งานเป็นผู้ป่วยที่มีนัดเดิมอยู่ก่อนแล้ว'
    },
    {
      id: 2,
      title: 'ต้องเลื่อนก่อนถึงวันนัด อย่างน้อย 1 สัปดาห์'
    },
    {
      id: 3,
      title: 'วันนัดใหม่ในวันที่ต้องการ อาจไม่ได้แพทย์ท่านเดิม'
    },
    {
      id: 4,
      title: 'หากมีการนัดหมายใหม่ วันนัดเดิมจะถูกยกเลิก'
    },
    {
      id: 5,
      title: 'ระบบจะตอบกลับภายใน 1 วันทำการ'
    },
  ]

  return (
    <Container maxWidth="md">
      <Grid container className={classes.root}>
        <Grid item xs={12} md={12}>
          <DoctorTableHeadDr handleNext={handleNext} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.typography}>เงื่อนไขการเลื่อนนัดออนไลน์</Typography>
            <UserCondition data={conditionPostPone} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    marginTop: '1rem'
  },
  container: {
    maxHeight: '100vh',
  },
  search: {
    height: 60,
  },
  typography: {
    textAlign: 'center',
    fontSize: '2rem',
  },
  paper: {
    padding: '1rem',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
}));

