import React from 'react';
import { useFormContext } from "react-hook-form";
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
  DialogContentText
} from '@material-ui/core';

export default function ContentModel(props) {
  const classes = useStyles();
  const { register, formState: { errors }, } = useFormContext();

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
                {row.schedule.map((historyRow) => (
                  <TableRow key={historyRow.Id}>
                    <TableCell align="center">
                      <TextField
                        id="appointments"
                        label="ชื่อ"
                        variant="outlined"
                        fullWidth
                        disabled
                        {...register("appointments", { value: row.name })}
                        error={Boolean(errors?.appointments)}
                        helperText={errors.appointments?.message}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        id="dateNew"
                        label="เวลานัดใหม่ที่คนไข้ต้องการ"
                        variant="outlined"
                        fullWidth
                        disabled
                        {...register("dateNew", { value: historyRow.StartTime })}
                        error={Boolean(errors?.dateNew)}
                        helperText={errors.dateNew?.message}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Button variant="contained" color="primary" onClick={() => handleNext({ appointments: row.name, dateNew: historyRow.StartTime })}>เลือกเวลานัด</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>
      </DialogContent>
    </Container>
  )
}
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '70%',
    textAlign: 'center',
    borderRadius: '2rem'
  },
}));