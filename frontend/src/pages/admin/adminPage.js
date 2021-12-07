import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  TablePagination,
  Fab,
  Typography,
  Checkbox,
  Container,
} from '@material-ui/core';

import TableHeads from '../../components/Admin/tableHeads';
import TableToolBar from '../../components/Admin/tableToolBar';
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentAll } from '../../services/appointmentService';
import { getPatientAll } from '../../services/patientService';



TableHeads.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
}));

export default function AdminPage() {

  const classes = useStyles();
  const [order] = useState('asc');
  const [orderBy] = useState('patientId');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const patients = useSelector(state => state.patients);
  const appointment = useSelector(state => state.appointment);
  const dispatch = useDispatch();


  const returnAppointmentAll = useCallback(() => {
    dispatch(getAppointmentAll());
  }, [dispatch])

  useEffect(() => {
    returnAppointmentAll()
  }, [returnAppointmentAll])

  const returnGetPatientAll = React.useCallback(() => {
    dispatch(getPatientAll());
  }, [dispatch])

  React.useEffect(() => {
    returnGetPatientAll()
  }, [returnGetPatientAll])


  const dataAppointment = () => {
    const rows = appointment.length > 0 && appointment.map((data) => {
      const appointments = {
        appointmentsId: data.appointmentsId,
        patientId: data.patientId,
        hn: data.hn,
        status: data.status,
        course: data.course,
        patients: patients.length > 0 && patients.filter((item) => {
          return item.patientId === data.patientId;
        }).map(function (item) {
          return {
            firstName: item.firstName,
            lastName: item.lastName,
            phone: item.phone,
          }
        })
      }
      return appointments
    })
    return rows
  }

  const dataAppointments = dataAppointment();

  const stableSort = (array, comparator) => {
    const stabilizedThis = Object.entries(array).map((el) => [...el]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el);
  }

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataAppointments.map((n) => n.appointmentsId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, appointmentsId) => {
    const selectedIndex = selected.indexOf(appointmentsId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, appointmentsId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (appointmentsId) => selected.indexOf(appointmentsId) !== -1;

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Paper className={classes.paper}>
          <TableToolBar
            numSelected={selected.length}
            data={dataAppointments}
            selected={selected}
          />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
            >
              <TableHeads
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                rowCount={dataAppointments.length}
              />
              <TableBody>
                {stableSort(dataAppointments, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const isItemSelected = isSelected(row[1].appointmentsId);
                    const labelId = `enhanced-table-checkbox-${row[1].appointmentsId}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row[1].appointmentsId)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row[1].appointmentsId}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell align="center" component="th" id={labelId} scope="row" padding="none">
                          {row[1].appointmentsId}
                        </TableCell>
                        {
                          row[1].patients.length > 0 && row[1].patients.map((item) => (
                            <>
                              <TableCell align="center">{item.firstName}-{item.lastName}</TableCell>
                              <TableCell align="center">{item.phone}</TableCell>
                            </>
                          ))
                        }
                        <TableCell align="center">{row[1].course}</TableCell>
                        <TableCell align="center">
                          {(() => {
                            switch (row[1].status) {
                              case 'อยู่ระหว่างดำเนินการ':
                                return (
                                  <Typography style={{ color: 'blue' }}>{row[1].status}</Typography>
                                )
                              case 'ยืนยันแบบฟอร์มการเลื่อนนัด':
                                return (
                                  <Typography style={{ color: 'green' }}>{row[1].status}</Typography>
                                )
                              case 'ไม่สามารถเลื่อนนัดได้':
                                return (
                                  <Typography style={{ color: 'red' }}>{row[1].status}</Typography>
                                )
                              default:
                                return null
                            }
                          })()
                          }
                        </TableCell>

                        <TableCell align="center">
                          <Link to={`/edit/${row[1].appointmentsId}`} style={{ textDecoration: 'none', color: 'white' }}>
                            <Fab color="primary" aria-label="edit" size="small">
                              <EditIcon />
                            </Fab>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataAppointments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </React.Fragment>
  );
}

