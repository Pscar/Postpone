import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {
  CssBaseline,
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  Box,
  Paper
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux'
import { createPatient, getPatientAll } from '../services/patientService';

export default function ResgiterForm() {

  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('firstname is required'),
    lastname: Yup.string()
      .required('lastname is required')
      .min(6, 'lastname must be at least 6 characters')
      .max(20, 'lastname must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmpassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    phone: Yup.string().required('phone is required')
  });
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);

  const returnGetPatientAll = React.useCallback(() => {
    dispatch(getPatientAll());
  }, [dispatch])

  React.useEffect(() => {
    returnGetPatientAll()
  }, [returnGetPatientAll])

  const createPatients = async (data) => {
    for (const item of patients) {
      if (item.email !== data.email ) {
        setAlert(true)
        setAlertContent("มีข้อมูลในระบบแล้ว")
        break
      }
    }
    const createItem = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirmpassword: data.confirmpassword,
    }
    await dispatch(createPatient(createItem));
  }

  const onSubmit = async (data) => {
    await createPatients(data)
  }
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>

        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Paper>
            <Box px={5} py={5}>
              <Typography variant="h3" align="center" style={{ margin: '1.5rem' }}>
                Resgiter
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="firstname"
                    name="firstname"
                    label="ชื่อ"
                    fullWidth
                    variant="outlined"
                    {...register('firstname')}
                    error={errors.firstname ? true : false}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="lastname"
                    name="lastname"
                    label="นามสกุล"
                    fullWidth
                    variant="outlined"
                    {...register('lastname')}
                    error={errors.lastname ? true : false}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    {...register('email')}
                    error={errors.email ? true : false}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="phone"
                    name="phone"
                    label="เบอร์ติดต่อของคนไข้"
                    fullWidth
                    variant="outlined"
                    {...register('phone')}
                    error={errors.phone ? true : false}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="password"
                    name="password"
                    label="รหัสผ่าน"
                    type="password"
                    fullWidth
                    variant="outlined"
                    {...register('password')}
                    error={errors.password ? true : false}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="confirmpassword"
                    name="confirmpassword"
                    label="ยืนยันรหัสผ่าน"
                    type="password"
                    fullWidth
                    variant="outlined"
                    {...register('confirmpassword')}
                    error={errors.confirmpassword ? true : false}
                  />
                </Grid>
              </Grid>
              <Box mt={3}>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  {alert ? <Alert variant="filled" severity="error">{alertContent}</Alert> : <></>}
                </Grid>
              </Box>
            </Box>
          </Paper>
        </form>
      </div>
    </Container >
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));