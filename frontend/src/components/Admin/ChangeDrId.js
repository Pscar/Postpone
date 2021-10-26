import React, { useState } from 'react';
import { useFormContext, Controller } from "react-hook-form";

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@material-ui/core";

import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import MomentUtils from '@date-io/moment';
import moment from 'moment';

export default function ChangeDrId(props) {
  const { data } = props
  const classes = useStyles();
  const [appointments, setAppopintments] = useState([]);
  const { register, control, formState: { errors } } = useFormContext();

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => response.json())
      .then(data => setAppopintments(data))
  }, []);
  
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="filled-required-HN"
            label="HN"
            defaultValue={data.hn}
            variant="filled"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="filled-required-firstName"
            label="ชื่อ"
            defaultValue={data.firstname}
            variant="filled"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="filled-required-lastName"
            label="นามสกุล"
            defaultValue={data.lastname}
            variant="filled"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="filled-required-locations"
            label="สถานที่ตรวจ"
            defaultValue={data.locations}
            variant="filled"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="filled-required-locations"
            label="นัดพบแพทย์ คนเดิมของคนไข้"
            defaultValue={data.appointments}
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
            defaultValue={data.phone}
            variant="filled"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Controller
              name="dateOld"
              control={control}
              render={({ field: { ref, ...datetimeold } }) => (
                <KeyboardDatePicker
                  id="date-picker-dialog-datetimeold"
                  label="วัน/เดือน/ปี ที่นัดตรวจเดิม"
                  inputVariant="outlined"
                  format="DD-MM-YYYY HH:mm"
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                  value={data.dateOld}
                  {...datetimeold}
                  fullWidth
                  disabled
                  error={Boolean(errors.dateOld)}
                  helperText={errors.dateOld?.message}
                />
              )}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="dateNew"
            label="วัน/เดือน/ปี ที่นัดตรวจเดิมที่คนไข้ต้องการ"
            defaultValue={moment(data.dateNew).format('DD-MM-YYYY HH:mm')}
            variant="filled"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="email"
            label="email"
            defaultValue={data.email}
            variant="filled"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            id="custom-appointments"
            options={appointments}
            fullWidth
            getOptionLabel={(option) => `${option.userId}: ${option.title}`}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  variant="outlined"
                  label="นัดพบแพทย์"
                  name="appointments"
                  {...register("appointments")}
                  error={errors.appointments ? true : false}
                  helperText={errors.appointments?.message}

                />
              );
            }}
            renderOption={(option) => {
              return <h4>{`${option.userId}: ${option.title}`}</h4>;
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
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
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="filled-required-phone"
            label="กรณีที่ไม่สามารถเลื่อนนัดให้พบแพทย์ท่านเดิม"
            defaultValue={data.course}
            variant="filled"
            disabled
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment >
  )
}
const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%'
  },
}));

const statuss = [
  { label: 'อยู่ระหว่างดำเนินการ', value: 'อยู่ระหว่างดำเนินการ' },
  { label: 'ยืนยันแบบฟอร์มการเลื่อนนัด', value: 'ยืนยันแบบฟอร์มการเลื่อนนัด' },
  { label: 'ไม่สามารถเลื่อนนัดได้', value: 'ไม่สามารถเลื่อนนัดได้' }
];