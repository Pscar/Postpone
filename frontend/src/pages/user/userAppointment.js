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
import UserAppointmentActualize from "../../components/User/userAppointmentActualize";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux'
import { getAppointmentAll } from "../../services/appointment-redux";


UserAppointmentActualize.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    HN: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        locations: PropTypes.string.isRequired,
        appointments: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        course: PropTypes.string.isRequired,
        MUIPickerOld: PropTypes.instanceOf(Date).isRequired,
        MUIPickerNew: PropTypes.instanceOf(Date).isRequired,
      }),
    ).isRequired,
    course: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
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


export default function UserAppointment() {
  const classes = useStyles();
  const [searched, setSearched] = useState("");
  const [displaySearch, setDisplaySearch] = useState([])

  const dispatch = useDispatch();
  const { users } = useSelector(state => state.users);
  const appointment = useSelector(state => state.appointment);

  const returnAppointmentAll = React.useCallback(() => {
    dispatch(getAppointmentAll());
  }, [dispatch])

  React.useEffect(() => {
    returnAppointmentAll()
  }, [returnAppointmentAll])


  const dataAppointment = () => {
    const rows = appointment.length > 0 && appointment.map((data) => {
      const historys = {
        appointments_id: data.appointments_id,
        user_id: data.user_id,
        hn: data.hn,
        firstname: data.firstname,
        lastname: data.lastname,
        status: data.status,
        history:
          appointment.filter(function (item) {
            return item.user_id === data.user_id;
          }).map(function (item) {
            return {
              appointments_id: item.appointments_id,
              user_id: item.user_id,
              locations: item.locations,
              appointments: data.appointments,
              status: item.status,
              dateOld: item.dateOld,
              dateNew: moment(item.dateNew).format('DD-MM-YYYY HH:mm'),
            }
          })
      }
      return historys
    })
    return rows
  }

  const data = dataAppointment();

  const requestSearch = (searchedVal) => {
    if (searchedVal) {
      const filteredRows = data.filter((row) => {
        return row.firstname.toLowerCase().includes(searchedVal.toLowerCase());
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
              {data && data.slice(-1).map((row) => (row.user_id === users.user_id ? (
                <TableBody>
                  <UserAppointmentActualize key={row.appointments_id} row={row} users={users} />
                </TableBody>
              ) : null
              ))}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

    </Container>
  );
}

