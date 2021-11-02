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
  Button
} from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

export default function FieldFormChangeDate(props) {
  const { data, handleClickOpen } = props
  const classes = useStyles();
  const { register, control, formState: { errors } } = useFormContext();


  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Paper variant="outlined" square className={classes.paper}>
          แก้ไขสถานะ และ วันที่เลื่อนนัด # {data.postpone_id}
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
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="filled-required-firstname"
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
                id="filled-required-lastname"
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
                id="filled-required-appointments"
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
              <TextField
                required
                id="filled-required-dateOld"
                label="วัน/เดือน/ปี ที่นัดตรวจเดิม"
                defaultValue={moment(data.dateOld).format('DD-MM-YYYY HH:mm')}
                variant="filled"
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="filled-required-dateNew"
                label="วัน/เดือน/ปี ที่นัดตรวจใหม่ที่คนไข้ต้องการ"
                defaultValue={moment(data.dateNew).format('DD-MM-YYYY HH:mm')}
                variant="filled"
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="filled-required-email"
                label="email"
                defaultValue={data.email}
                variant="filled"
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Controller
                  name="dateNew"
                  control={control}
                  render={({ field: { ref, ...datetimenew } }) => (
                    <KeyboardDatePicker
                      margin="none"
                      id="date-picker-dialog-datetimenew"
                      label="วัน/เดือน/ปี เลื่อนนัดถัดไปใหม่"
                      inputVariant="outlined"
                      format="DD-MM-YYYY HH:mm"
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                      {...datetimenew}
                      minDate={new Date()}
                      fullWidth
                      defaultValue="01/01/1999"
                      error={Boolean(errors.dateNew)}
                      helperText={errors.dateNew?.message}
                    />
                  )}
                />
              </MuiPickersUtilsProvider>
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
    </React.Fragment>
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