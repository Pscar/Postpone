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
import { getPostPoneAll } from '../../services/postpone-redux';



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
  const [orderBy] = useState('postpone_id');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const postpones = useSelector(state => state.postpones);
  const dispatch = useDispatch();

  const getPostPonesAll = useCallback(() => {
    dispatch(getPostPoneAll());
  }, [dispatch])

  useEffect(() => {
    getPostPonesAll()
  }, [getPostPonesAll])

  const dataPostPone = () => {
    const rows = postpones.length > 0 && postpones.map((data) => {
      const historys = {
        id: data.postpone_id,
        user_id: data.user_id,
        hn: data.hn,
        firstname: data.firstname,
        lastname: data.lastname,
        status: data.status,
        locations: data.locations,
        appointments: data.appointments,
        dateOld: data.dateOld,
        dateNew: data.dateNew,
        course: data.course,
        email: data.email,
        phone: data.phone
      }
      return historys
    })
    return rows
  }

  const data = dataPostPone();


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
      const newSelecteds = data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Paper className={classes.paper}>
          <TableToolBar
            numSelected={selected.length}
            data={data}
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
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const isItemSelected = isSelected(row[1].id);
                    const labelId = `enhanced-table-checkbox-${row[1].id}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row[1].id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row[1].id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell align="center" component="th" id={labelId} scope="row" padding="none">
                          {row[1].id}
                        </TableCell>
                        <TableCell align="center">{row[1].firstname}-{row[1].lastname}</TableCell>
                        <TableCell align="center">{row[1].course}</TableCell>
                        <TableCell align="center">{row[1].phone}</TableCell>
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
                          {(() => {
                            switch (row[1].course) {
                              case 'ขอพบแพทย์ท่านเดิม วันเวลาใดก็ได้':
                                return (
                                  <Link to={`/change_date/${row[1].id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                    <Fab color="primary" aria-label="edit" size="small">
                                      <EditIcon />
                                    </Fab>
                                  </Link>

                                )
                              case 'เลือกตามวันเวลาเป็นหลัก พบแพทย์ท่านใดก็ได้':
                                return (
                                  <Link to={`/change_dr/${row[1].id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                    <Fab color="primary" aria-label="edit" size="small">
                                      <EditIcon id={row[1].id} />
                                    </Fab>
                                  </Link>
                                )
                              case 'ขอรับการรักษาตามวันนัดหมายเดิม และ พบแพทย์ท่านเดิม':
                                return (
                                  <Link to={`/original/${row[1].id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                    <Fab color="primary" aria-label="edit" size="small">
                                      <EditIcon id={row[1].id} />
                                    </Fab>
                                  </Link>
                                )
                              default:
                                return null
                            }
                          })()
                          }
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
            count={data.length}
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

