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
  Container
} from "@material-ui/core";

import moment from 'moment';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { StoreContext } from '../../Context/Store';
import TimelineRow from './TimelineRow';


export default function TimelineDr(props) {
  const { scheduleDr, ownerDrData } = useContext(StoreContext)
  const { handleNext } = props;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searched, setSearched] = useState("");

  const [dataSearch, setDataSearch] = useState(ownerDrData);


  const createData = (id, name) => {
    return {
      id,
      name,
      history:
        scheduleDr.filter(function (item) {
          return item.OwnerId === id;
        }).map(function (item) {
          return {
            id: item.Id,
            subject: item.Subject,
            startDate: item.StartTime,
            endDate: item.EndTime,

          }
        })
    };
  }
  const rows = dataSearch.map((data) =>
    createData(
      data.Id,
      data.name,
    ));

  const requestSearch = (searchedVal) => {
    const filteredRows = ownerDrData.filter((row) => {
      const filterName = row.name.toLowerCase().includes(searchedVal.toLowerCase());
      return filterName
    });
    setDataSearch(filteredRows);
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

      setDataSearch(filterDateRow);
    } else {
      setDataSearch(ownerDrData);
    }
  };


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
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TimelineRow key={row.id} row={row} handleNext={handleNext} />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
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
