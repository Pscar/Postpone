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
  TablePagination,
  Button,
  TextField,
  DialogTitle,
  Container,
  DialogContent,
  DialogContentText,
  Grid,
} from '@material-ui/core';
import moment from 'moment';

export default function DoctorSelectModel(props) {
  const classes = useStyles();
  const { register, formState: { errors }, } = useFormContext();

  const { row, handleNext } = props

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                {row.schedule.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((historyRow) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={historyRow.Id}>
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
                        <input
                          id="dateNew"
                          className={classes.textField}
                          fullWidth
                          disabled
                          InputLabelProps={{ shrink: true }}
                          type='datetime'
                          defaultValue={moment(historyRow.StartTime).format('DD-MM-YYYY hh:mm')}
                          // {...register("dateNew", { value: historyRow.StartTime })}
                          error={Boolean(errors?.dateNew)}
                          helperText={errors.dateNew?.message}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <Button variant="contained" color="primary" onClick={() => handleNext({ appointments: row.name, dateNew: historyRow.StartTime })}>เลือกเวลานัด</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 5]}
            component="div"
            count={row.schedule.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
  textField: {
    width: '100%',
    height: 50,
    fontSize: 16,
    textAlign: 'center'
  }
}));