import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from "material-ui-search-bar";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
  TableHead,
  TableCell,
  Grid,
} from "@material-ui/core";

import moment from 'moment';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { useDispatch, useSelector } from "react-redux";
import { getDoctorAll, getScheduleAll } from '../../services/redux-service';


import DoctortTableRow from './doctortTableRow';

export default function DoctorTableHeadDr(props) {

  const classes = useStyles();
  const { handleNext } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searched, setSearched] = useState("");
  const [displayDoctor, setDisplayDoctor] = useState([]);
  const [displayScheduleDr, setDisplayScheduleDr] = useState([]);

  const doctors = useSelector(state => state.doctors);
  const schedules = useSelector(state => state.schedules)
  const dispatch = useDispatch();


  const getSchedulesAll = React.useCallback(() => {
    dispatch(getScheduleAll());
  }, [dispatch])

  React.useEffect(() => {
    getSchedulesAll()
  }, [getSchedulesAll])


  const getDoctorsAll = React.useCallback(() => {
    dispatch(getDoctorAll());
  }, [dispatch])

  React.useEffect(() => {
    getDoctorsAll()
  }, [getDoctorsAll])



  const dataSchedule = () => {
    const rows = displayDoctor.length > 0 && displayDoctor.map((data) => {
      const historys = {
        Doc_id: data.Doc_id,
        name: data.name,
        schedule:
          displayScheduleDr.length > 0 && displayScheduleDr.filter(function (item) {
            return item.Doc_id === data.Doc_id;
          }).map(function (item) {
            return {
              Id: item.Id,
              Doc_id: item.Doc_id,
              Description: item.Description,
              EndTime: item.EndTime,
              StartTime: item.StartTime,
              Subject: item.Subject,
            }
          })
      }
      return historys
    })
    return rows
  }

  const data = dataSchedule();


  const requestSearch = (searchedVal) => {
    if (searchedVal) {
      const filteredRows = data.length > 0 && data.filter((row) => {
        const filterName = row.name.toLowerCase().includes(searchedVal.toLowerCase());
        return filterName
      });
      setDisplayDoctor(filteredRows);
    } else {
      //ถ้าไม่มีค่า searchedVal จะแสดงค่าใน useContext
      setDisplayDoctor(doctors);
    }
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const startValue = new Date(new Date().getFullYear(), new Date().getMonth(), 14);
  const endValue = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15);

  const requestSearchDate = (e) => {
    if (e.startDate && e.endDate) {
      const startDate = moment(e.startDate).format('DD-MM-YYYY');
      const endDate = moment(e.endDate).format('DD-MM-YYYY');

      const filterDateRow = schedules.length > 0 && schedules.filter((row) => {
        const StartTime = moment(row.StartTime).format('DD-MM-YYYY');
        const EndTime = moment(row.EndTime).format('DD-MM-YYYY');
        const filterdate = StartTime >= startDate && EndTime <= endDate
        return filterdate
      });

      setDisplayDoctor(filterDateRow);
    } else {
      setDisplayDoctor(doctors);
    }
  };

  //แสดงผลหลังจาก get api 
  React.useEffect(() => {
    setDisplayDoctor(doctors)
  }, [doctors])

  React.useEffect(() => {
    setDisplayScheduleDr(schedules)
  }, [schedules])

  return (

    <React.Fragment>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12} md={6}>
          <SearchBar
            value={searched}
            onChange={(newValue) => (requestSearch(newValue))}
            onCancelSearch={() => cancelSearch()}
            className={classes.search}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <DateRangePickerComponent
              id="daterangepicker"
              placeholder='Select a range'
              startDate={startValue}
              endDate={endValue}
              change={requestSearchDate}
              minDays={3}
              maxDays={5}
              format="dd/MM/yyy">
            </DateRangePickerComponent>
          </Paper>

        </Grid>
      </Grid>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" />
                <TableCell align="center">ลำดับ</TableCell>
                <TableCell align="center">ชื่อ - นามสกุล</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <DoctortTableRow key={row.Doc_id} row={row} searched={searched} scheduleDr={schedules} handleNext={handleNext} />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  )
}

DoctortTableRow.propTypes = {
  row: PropTypes.shape({
    Doc_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    schedule: PropTypes.arrayOf(
      PropTypes.shape({
        Id: PropTypes.number.isRequired,
        Doc_id: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        EndTime: PropTypes.string.isRequired,
        StartTime: PropTypes.string.isRequired,
        Subject: PropTypes.string.isRequired,
      }),
    ).isRequired,
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
    padding: '0.75rem',
    width: '98%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
