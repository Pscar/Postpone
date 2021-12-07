import React from 'react';
import { useFormContext, Controller } from "react-hook-form";

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  Paper,
  Button,
} from "@material-ui/core";

import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux'
import { getDoctorAll } from '../../services/doctorService';
import { getPatientAll } from '../../services/patientService';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export default function FieldFormEditAppointment(props) {

  const { data, handleClickOpen } = props
  const classes = useStyles();
  const { register, control, formState: { errors } } = useFormContext();

  const patients = useSelector(state => state.patients);
  const doctors = useSelector(state => state.doctors);
  const dispatch = useDispatch();

  const returnGetPatientAll = React.useCallback(() => {
    dispatch(getPatientAll());
  }, [dispatch])

  React.useEffect(() => {
    returnGetPatientAll()
  }, [returnGetPatientAll])

  const returnGetDoctorAll = React.useCallback(() => {
    dispatch(getDoctorAll());
  }, [dispatch])

  React.useEffect(() => {
    returnGetDoctorAll()
  }, [returnGetDoctorAll])

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Paper variant="outlined" square className={classes.paper}>
          แก้ไขสถานะ และ เปลี่ยนแพทย์ # {data.appointmentsId}
        </Paper>
        <Paper variant="outlined" className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="filled-required-hn"
                label="HN"
                defaultValue={data.hn}
                variant="filled"
                disabled
                fullWidth
              />
            </Grid>
            {patients.length > 0 && patients.map((item) => (
              item.patientId === data.patientId ? (
                <React.Fragment>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="filled-required-firstname"
                      label="ชื่อคนไข้"
                      defaultValue={item.firstName}
                      variant="filled"
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="filled-required-lastname"
                      label="นามสกุลคนไข้"
                      defaultValue={item.lastName}
                      variant="filled"
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="filled-required-phone"
                      label="เบอร์ติดต่อคนไข้"
                      defaultValue={item.phone}
                      variant="filled"
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="email"
                      label="อีเมล"
                      defaultValue={item.email}
                      variant="filled"
                      disabled
                      fullWidth
                    />
                  </Grid>
                </React.Fragment>
              ) : null
            ))}
            <Grid item xs={12} md={12}>
              <TextField
                required
                id="filled-required-location"
                label="สถานที่ตรวจ"
                defaultValue={data.location}
                variant="filled"
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {(() => {
                switch (data.course) {
                  case 'ขอพบแพทย์ท่านเดิม วันเวลาใดก็ได้':
                    return (
                      <TextField
                        required
                        id="dateNew"
                        label="วัน/เดือน/ปี ที่นัดตรวจเดิมที่คนไข้"
                        defaultValue={moment(data.dateNew).format('DD-MM-YYYY HH:mm')}
                        variant="filled"
                        disabled
                        fullWidth
                      />
                    )
                  default:
                    return (
                      <TextField
                        required
                        id="filled-required-dateOld"
                        label="วัน/เดือน/ปี ที่นัดตรวจเดิม"
                        defaultValue={moment(data.dateOld).format('DD-MM-YYYY HH:mm')}
                        variant="filled"
                        disabled
                        fullWidth
                      />
                    )
                }
              })()
              }
            </Grid>
            <Grid item xs={12} md={6}>
              {(() => {
                switch (data.course) {
                  case 'ขอพบแพทย์ท่านเดิม วันเวลาใดก็ได้':
                    return (
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Controller
                          name="dateNew"
                          control={control}
                          render={({ field: { ref, ...datetimenew } }) => (
                            <KeyboardDateTimePicker
                              id="date-picker-dialog-datetimenew"
                              label="วัน/เดือน/ปี ที่นัดตรวจเดิมที่คนไข้ต้องการ"
                              inputVariant="outlined"
                              format="DD/MM/YYYY HH:mm"
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                              onError={console.log}
                              defaultValue={moment(new Date()).format('DD-MM-YYYY')}
                              {...datetimenew}
                              fullWidth
                              error={Boolean(errors.dateNew)}
                              helperText={errors.dateNew?.message}
                            />
                          )}
                        />
                      </MuiPickersUtilsProvider>
                    )
                  default:
                    return (
                      <TextField
                        required
                        id="dateNew"
                        label="วัน/เดือน/ปี ที่นัดตรวจเดิมที่คนไข้ต้องการ"
                        defaultValue={moment(data.dateNew).format('DD-MM-YYYY HH:mm')}
                        variant="filled"
                        disabled
                        fullWidth
                      />
                    )
                }
              })()
              }
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                required
                id="filled-required-course"
                label="กรณีที่ไม่สามารถเลื่อนนัดให้พบแพทย์ท่านเดิม"
                defaultValue={data.course}
                variant="filled"
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {(() => {
                switch (data.course) {
                  case 'เลือกตามวันเวลาเป็นหลัก พบแพทย์ท่านใดก็ได้':
                    return (
                      <Autocomplete
                        id="custom-appointments"
                        options={doctors}
                        fullWidth
                        getOptionLabel={(option) => `${option.doctorName}`}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="นัดพบแพทย์"
                              name="appointments"
                              {...register("doctorName")}
                              error={errors.doctorName ? true : false}
                              helperText={errors.doctorName?.message}
                            />
                          );
                        }}
                        renderOption={(option) => {
                          return <h4>{`${option.doctorName}`}</h4>;
                        }}
                      />
                    )
                  default:
                    return <TextField
                      required
                      id="filled-required-doctorName"
                      label="นัดพบแพทย์ คนเดิมของคนไข้"
                      defaultValue={data.doctorName}
                      variant="filled"
                      disabled
                      fullWidth
                    />
                }
              })()
              }
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}
                error={Boolean(errors.course)}
              >
                <InputLabel id="demo-simple-select-label">
                  สถานะ
                </InputLabel>
                <Controller
                  control={control}
                  render={(props) => (
                    <Select
                      defaultValue={data.status}
                      value={props.value}
                      onChange={props.onChange}
                      name="status"
                      {...register("status")}
                      helperText={errors.course?.message}

                    >
                      {statuss?.map(option => {
                        return (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label ?? option.value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                onClick={handleClickOpen}
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
              >
                ยืนยันการแก้ไข
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

    </React.Fragment >
  )
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

const statuss = [
  { label: 'อยู่ระหว่างดำเนินการ', value: 'อยู่ระหว่างดำเนินการ' },
  { label: 'ยืนยันแบบฟอร์มการเลื่อนนัด', value: 'ยืนยันแบบฟอร์มการเลื่อนนัด' },
  { label: 'ไม่สามารถเลื่อนนัดได้', value: 'ไม่สามารถเลื่อนนัดได้' }
];