import React, { useState, useContext } from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import SearchBar from "material-ui-search-bar";
import { StoreContext } from '../../Context/Store';
import PostPoneRow from './PostPoneRow';
import PostPoneNoRow from './PostPoneNoRow';

export default function PostPoneShow() {
  const classes = useStyles();
  const { informations, dataUser } = useContext(StoreContext);
  const [dataSearch, setDataSearch] = useState(informations);
  const [searched, setSearched] = useState("");

  const createData = (id, HN, firstName, lastName, status, phone, MUIPickerNew, MUIPickerOld, course, email, password) => {
    return {
      id,
      HN,
      firstName,
      lastName,
      status,
      phone,
      course,
      email,
      password,
      history:
        informations.map((data) => {
          return {
            id: data.id,
            locations: data.locations,
            appointments: data.appointments,
            email: data.email,
            password: data.password,
            course: data.course,
            status: data.status,
            appointmentsNew: data.appointmentsNew,
            MUIPickerOld: data.MUIPickerOld,
            MUIPickerNew: moment(data.MUIPickerNew).format('DD-MM-YYYY HH:mm'),
          }
        })
    }
  }

  const rows = dataSearch.map((data) =>
    createData(
      data.id,
      data.HN,
      data.firstName,
      data.lastName,
      data.status,
      data.phone,
      data.MUIPickerNew,
      data.MUIPickerOld,
      data.course,
      data.email,
      data.password,
    ))
  const requestSearch = (searchedVal) => {
    const filteredRows = informations.filter((row) => {
      return row.HN.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setDataSearch(filteredRows);
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
              {rows.map((row) => (row.email === dataUser.email && row.password === dataUser.password && row.status === 'อยู่ระหว่างดำเนินการ' ? (
                <TableBody>
                  <PostPoneRow key={row.id} row={row} />
                </TableBody>
              ) :
                <PostPoneNoRow key={row.id} row={row} />
              ))}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

    </Container>
  );
}

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
PostPoneRow.propTypes = {
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
