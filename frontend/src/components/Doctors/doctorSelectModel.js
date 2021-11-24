import React from 'react';
import { useFormContext, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  DialogTitle,
  Container,
  DialogContent,
  DialogContentText,
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core';
import moment from 'moment';

export default function DoctorSelectModel(props) {
  const classes = useStyles();
  const { control, register, formState: { errors }, } = useFormContext();

  const { row, handleNext } = props

  return (
    <Container maxwidth="md" className={classes.paper}>
      <DialogTitle id="alert-dialog-title">{"เลือกวันนัด"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ชื่อ</TableCell>
                  <TableCell align="center">เวลา</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.schedule.slice(-1).map((historyRow) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={historyRow.id}>
                      <TableCell align="center">
                        <TextField
                          id="doctor_name"
                          label="ชื่อ"
                          variant="outlined"
                          fullWidth
                          disabled
                          {...register("doctor_name", { value: row.doctor_name })}
                          error={Boolean(errors?.appointments)}
                          helperText={errors.appointments?.message}
                        />
                      </TableCell>
                      <TableCell>
                        <Controller
                          control={control}
                          render={() => (
                            <FormControl variant="outlined" className={classes.formControl}>
                              <Select
                                defaultValue={historyRow.starttime}
                                name="dateNew"
                                {...register("dateNew")}
                                error={Boolean(errors?.dateNew)}
                                helperText={errors.dateNew?.message}
                              >
                                {row.schedule.map(option => {
                                  return (
                                    <MenuItem key={option.doc_id} value={option.starttime}>
                                      {moment(option.starttime).format('DD-MM-YYYY hh:mm')}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          )}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <Button variant="contained" color="primary" onClick={() => handleNext()}>เลือกเวลานัด</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>
      </DialogContent>
    </Container >
  )
}
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '70%',
    textAlign: 'center',
    borderRadius: '2rem',
    overflowX: 'auto',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },

}));