import React from 'react';
import { useFormContext, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  Grid,
  Container
} from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment';

export default function UserFieldFormRegister() {
  const password = React.useRef({});


  const classes = useStyles();
  const { register, control, formState: { errors }, watch } = useFormContext();
  password.current = watch("password", "");

  const locations = [
    { id: 'SPASTIC	(1006)', name: 'คลินิกลดเกร็ง' },
    { id: 'CP	(1029)', name: 'ตึกศรีสังวาลย์ เวชระเบียน ชั้น 1' },
    { id: 'DIR1(1030)', name: 'ตึกศรีสังวาลย์ เวชระเบียน ชั้น 1' },
    { id: 'GR CLINIC(1034)', name: 'คลินิกฟื้นฟูผู้สูงอายุ' },
    { id: 'MPS CLINIC(1035)', name: 'คลินิกกลุ่มอาการปวดกล้ามเนื้อและเยื้อพังผืด' },
    { id: 'MSK CLINIC(1036)', name: 'คลินิกปวดกล้ามเนื้อและกระดูกเรื้อรัง' },
    { id: 'OPD3C0227AS', name: 'Achalasia Clinic ตึกผู้ป่วยนอกชั้น 3' }
  ]

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Paper className={classes.paper}>
          <Typography variant="h4" className={classes.item}>
            เลื่อนนัดออนไลน์
          </Typography>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} md={12}>
              <Controller
                control={control}
                name="hn"
                rules={{
                  required: "this field is required.",
                  pattern: /[1-9]{3}/,
                  maxLength: {
                    value: 6,
                    message: "HN must have at least 6 characters"
                  }
                }}
                render={({ field }) => (
                  <TextField
                    id="hn"
                    label="hn"
                    variant="outlined"
                    placeholder="HN"
                    fullWidth
                    margin="normal"
                    {...field}
                    error={Boolean(errors?.hn)}
                    helperText={errors.hn?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="firstname"
                rules={{
                  required: "this field is required.",
                  maxLength: {
                    value: 20,
                    message: "firstname must have at least 20 characters"
                  }
                }}
                render={({ field }) => (
                  <TextField
                    id="firstname"
                    label="ชื่อ"
                    variant="outlined"
                    placeholder="ชื่อ"
                    fullWidth
                    {...field}
                    error={Boolean(errors?.firstname)}
                    helperText={errors.firstname?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="lastname"
                rules={{
                  required: "this field is required.",
                  maxLength: {
                    value: 20,
                    message: "lastname must have at least 20 characters"

                  }
                }}
                render={({ field }) => (
                  <TextField
                    id="lastname"
                    label="นามสกุล"
                    variant="outlined"
                    placeholder="นามสกุล"
                    fullWidth
                    {...field}
                    error={Boolean(errors?.lastname)}
                    helperText={errors.lastname?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Autocomplete
                id="custom-locations"
                options={locations}
                rules={{ required: "this field is required." }}
                fullWidth
                getOptionLabel={(option) => `${option.id}: ${option.name}`}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="สถานที่ตรวจ"
                      name="locations"
                      {...register("locations")}
                      error={errors.locations ? true : false}
                      helperText={errors.locations?.message}

                    />
                  );
                }}
                renderOption={(option) => {
                  return <h4>{`${option.id}: ${option.name}`}</h4>;
                }}
              />

            </Grid>
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Controller
                  name="dateOld"
                  control={control}
                  render={({ field: { ref, ...datetimeold } }) => (
                    <KeyboardDateTimePicker
                      id="date-picker-dialog-datetimeold"
                      label="วัน/เดือน/ปี ที่นัดตรวจเดิม"
                      inputVariant="outlined"
                      format="DD/MM/YYYY HH:mm"
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                      onError={console.log}
                      defaultValue={moment(new Date()).format('DD-MM-YYYY')}
                      {...datetimeold}
                      fullWidth
                      error={Boolean(errors.dateOld)}
                      helperText={errors.dateOld?.message}
                    />
                  )}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="phone"
                rules={{
                  required: "this field is required.",
                  pattern: /[0-9]{3}/,
                  maxLength: {
                    value: 10,
                    message: "phone must have at least 10 characters"
                  }
                }}
                render={({ field }) => (
                  <TextField
                    id="phone"
                    label="เบอร์โทรศัพท์ติดต่อผู้ป่วย"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={Boolean(errors?.phone)}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "this field is required.",
                  maxLength: {
                    value: 30,
                    message: "email must have at least 30 characters"
                  }
                }}
                render={({ field }) => (
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={Boolean(errors?.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "this field is required.", minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters"
                  }
                }}
                render={({ field }) => (
                  <TextField
                    id="password"
                    label="รหัสผ่าน"
                    type="password"
                    variant="outlined"
                    fullWidth
                    {...field}

                    error={Boolean(errors?.password)}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="confirmpassword"
                rules={{
                  required: "this field is required.",
                  validate: value =>
                    value === password.current || "The passwords do not match"
                }}
                render={({ field }) => (
                  <TextField
                    id="outlined-password-input-confirmPassword"
                    label="ยืนยันรหัสผ่าน"
                    type="password"
                    fullWidth
                    autoComplete="current-password-confirmPassword"
                    variant="outlined"
                    {...field}
                    error={Boolean(errors?.confirmpassword)}
                    helperText={errors.confirmpassword?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}
                error={Boolean(errors.course)}
              >
                <InputLabel id="demo-simple-select-label">
                  กรณีที่ไม่สามารถเลื่อนนัดให้พบแพทย์ท่านเดิม
                </InputLabel>
                <Controller
                  control={control}
                  render={(props) => (
                    <Select
                      defaultValue=""
                      value={props.value}
                      onChange={props.onChange}
                      name="course"
                      {...register("course")}
                      helperText={errors.course?.message}

                    >
                      {options?.map(option => {
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
          </Grid>
        </Paper>
      </Container>
    </React.Fragment >
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  item: {
    margin: '1rem',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '1rem'
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
}));

const options = [
  { label: 'เลือกตามวันเวลาเป็นหลัก พบแพทย์ท่านใดก็ได้', value: 'เลือกตามวันเวลาเป็นหลัก พบแพทย์ท่านใดก็ได้' },
  { label: 'ขอพบแพทย์ท่านเดิม วันเวลาใดก็ได้  ', value: 'ขอพบแพทย์ท่านเดิม วันเวลาใดก็ได้' },
  { label: 'ขอรับการรักษาตามวันนัดหมายเดิม และ พบแพทย์ท่านเดิม', value: 'ขอรับการรักษาตามวันนัดหมายเดิม และ พบแพทย์ท่านเดิม' }
];
