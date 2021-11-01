import React, { useState, useContext } from 'react';

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
import { StoreContext } from '../../Context/Store';
import TimelineRow from './TimelineRow';


export default function TimelineDr(props) {
  const classes = useStyles();
  const { scheduleDr, doctor } = useContext(StoreContext);
  const { handleNext } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searched, setSearched] = useState("");
  const [displayDoctor, setDisplayDoctor] = useState([]);
  const [displayScheduleDr, setDisplayScheduleDr] = useState([]);


  const dataSchedule = () => {
    const rows = displayDoctor.map((data) => {
      const historys = {
        Doc_id: data.Doc_id,
        name: data.name,
        schedule:
          displayScheduleDr.filter(function (item) {
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
      const filteredRows = data.filter((row) => {
        const filterName = row.name.toLowerCase().includes(searchedVal.toLowerCase());
        return filterName
      });
      setDisplayDoctor(filteredRows);
    } else {
      //ถ้าไม่มีค่า searchedVal จะแสดงค่าใน useContext
      setDisplayDoctor(doctor);
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

      const filterDateRow = scheduleDr.filter((row) => {
        const StartTime = moment(row.StartTime).format('DD-MM-YYYY');
        const EndTime = moment(row.EndTime).format('DD-MM-YYYY');
        const filterdate = StartTime >= startDate && EndTime <= endDate
        return filterdate
      });

      setDisplayDoctor(filterDateRow);
    } else {
      setDisplayDoctor(doctor);
    }
  };

  //แสดงผลหลังจาก get api 
  React.useEffect(() => {
    setDisplayDoctor([...doctor])
  }, [doctor])

  React.useEffect(() => {
    setDisplayScheduleDr([...scheduleDr])
  }, [scheduleDr])

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
              {/* {displayDoctor.map((item) => {
                return (
                  <h1>{item.name}</h1>
                )
              })} */}
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TimelineRow key={row.Doc_id} row={row} searched={searched} scheduleDr={scheduleDr} handleNext={handleNext} />
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

TimelineRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        subject: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
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
