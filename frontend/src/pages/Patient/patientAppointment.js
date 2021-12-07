import React, { useState } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Container,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import SearchBar from "material-ui-search-bar";
import PatientAppointmentActualize from "../../components/Patient/patientAppointmentActualize";

import { useDispatch, useSelector } from 'react-redux'
import { getAppointmentAll } from "../../services/appointmentService";


PatientAppointmentActualize.propTypes = {
  row: PropTypes.shape({
    hn: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '1rem'
  },
  container: {
    maxHeight: '100vh',
  },
  search: {
    height: 60,
  },
  paper: {
    padding: '1rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function PatientAppointment() {
  const classes = useStyles();
  const [searched, setSearched] = useState("");
  const [displaySearch, setDisplaySearch] = useState([])

  const dispatch = useDispatch();
  const logins = useSelector(state => state.logins.login);
  const appointment = useSelector(state => state.appointment);

  const returnAppointmentAll = React.useCallback(() => {
    dispatch(getAppointmentAll());
  }, [dispatch])

  React.useEffect(() => {
    returnAppointmentAll()
  }, [returnAppointmentAll])


  const requestSearch = (searchedVal) => {
    if (searchedVal) {
      const filteredRows = appointment.length > 0 && appointment.filter((row) => {
        return row.hn.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setDisplaySearch(filteredRows);
    } else {
      setDisplaySearch(appointment);
    }
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  React.useEffect(() => {
    setDisplaySearch(appointment)
  }, [appointment])

  return (
    <Container maxWidth="md">
      <Grid container className={classes.root}>
        <Grid item xs={12} md={12}>
          <TableContainer component={Paper}>
            <SearchBar
              value={searched}
              onChange={(newValue) => (requestSearch(newValue))}
              onCancelSearch={() => cancelSearch()}
            />
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ลำดับ</TableCell>
                  <TableCell align="center">เลขบัตรรพ</TableCell>
                  <TableCell align="center">ชื่อ - นามสกุล</TableCell>
                  <TableCell align="center">สถานะใบนัด</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displaySearch.length > 0 && displaySearch.map((row) => (row.patientId === logins.patientId ? (
                  <PatientAppointmentActualize key={row.appointmentsId} row={row} patient={logins} />
                ) : null
                ))}
              </TableBody>

            </Table>
          </TableContainer>
        </Grid>
      </Grid>

    </Container>
  );
}

