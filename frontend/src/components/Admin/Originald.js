import React from 'react';
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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment'
export default function Originald(props) {
  const { data } = props
  const classes = useStyles();
  const { register, control, formState: { errors } } = useFormContext();

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
              name="MUIPickerOld"
              control={control}
              render={({ field: { ref, ...datetimeold } }) => (
                <KeyboardDatePicker
                  id="date-picker-dialog-datetimeold"
                  label="วัน/เดือน/ปี ที่นัดตรวจเดิม"
                  inputVariant="outlined"
                  format="DD-MM-YYYY"
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                  value={data.MUIPickerOld}
                  {...datetimeold}
                  fullWidth
                  disabled
                  error={Boolean(errors.MUIPickerOld)}
                  helperText={errors.MUIPickerOld?.message}
                />
              )}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="filled-required-phone"
            label="วัน/เดือน/ปี เลื่อนนัดถัดไปใหม่"
            defaultValue={moment(data.MUIPickerNew).format('DD-MM-YYYY HH:mm')}
            variant="filled"
            disabled
            fullWidth
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
    </React.Fragment>
  )
}
const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const statuss = [
  { label: 'อยู่ระหว่างดำเนินการ', value: 'อยู่ระหว่างดำเนินการ' },
  { label: 'ยืนยันแบบฟอร์มการเลื่อนนัด', value: 'ยืนยันแบบฟอร์มการเลื่อนนัด' },
  { label: 'ไม่สามารถเลื่อนนัดได้', value: 'ไม่สามารถเลื่อนนัดได้' }
];