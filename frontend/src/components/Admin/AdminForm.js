import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StoreContext } from '../../Context/Store';
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
  Container
} from '@material-ui/core';

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

export default function AdminForm() {
  const classes = useStyles();
  const { informations } = useContext(StoreContext);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
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

  const createData = (id, HN, firstName, lastName, locations, status, phone, MUIPickerNew, MUIPickerOld, appointments, course) => {
    return { id, HN, firstName, lastName, locations, status, phone, MUIPickerNew, MUIPickerOld, appointments, course };
  }

  const rows = informations.map((data) => createData(
    data.id,
    data.HN,
    data.firstName,
    data.lastName,
    data.locations,
    data.status,
    data.phone,
    data.MUIPickerNew,
    data.MUIPickerOld,
    data.appointments,
    data.course,
  ))

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} rows={rows} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell align="center" component="th" id={labelId} scope="row" padding="none">
                          {row.id}
                        </TableCell>
                        <TableCell align="center">{row.firstName}-{row.lastName}</TableCell>
                        <TableCell align="center">{row.course}</TableCell>
                        <TableCell align="center">{row.phone}</TableCell>
                        {row.status === "อยู่ระหว่างดำเนินการ"
                          ?
                          <TableCell align="center" style={{ color: 'blue' }}>
                            <Typography>{row.status}</Typography>
                          </TableCell>
                          : row.status === "ยืนยันแบบฟอร์มการเลื่อนนัด"
                            ?
                            <TableCell align="center" style={{ color: 'green' }}>
                              <Typography>{row.status}</Typography>
                            </TableCell>
                            : row.status === "ไม่สามารถเลื่อนนัดได้"
                              ?
                              <TableCell align="center" style={{ color: 'red' }}>
                                <Typography>{row.status}</Typography>
                              </TableCell>
                              : null
                        }
                        <TableCell align="center">
                          {row.course === "ขอพบแพทย์ท่านเดิม วันเวลาใดก็ได้"
                            ?
                            <Link to={`/change_date/${row.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                              <Fab color="primary" aria-label="edit" size="small">
                                <EditIcon />
                              </Fab>
                            </Link>
                            : row.course === "เลือกตามวันเวลาเป็นหลัก พบแพทย์ท่านใดก็ได้" ?
                              <Link to={`/change_dr/${row.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                <Fab color="primary" aria-label="edit" size="small">
                                  <EditIcon />
                                </Fab>
                              </Link>
                              : row.course === "ขอรับการรักษาตามวันนัดหมายเดิม และ พบแพทย์ท่านเดิม" ?
                                <Link to={`/original/${row.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                  <Fab color="primary" aria-label="edit" size="small">
                                    <EditIcon />
                                  </Fab>
                                </Link>
                                : null
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
            count={rows.length}
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
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
{/* {row.course === "ขอพบแพทย์ท่านเดิม วันเวลาใดก็ได้"
                              ?
                              <Link to={`/change_date/${row.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                <EditIcon />
                              </Link>
                              : row.course === "เลือกตามวันเวลาเป็นหลัก พบแพทย์ท่านใดก็ได้" ?
                                <Link to={`/change_dr/${row.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                  <EditIcon />
                                </Link>
                                : row.course === "ขอรับการรักษาตามวันนัดหมายเดิม และ พบแพทย์ท่านเดิม" ?
                                  <Link to={`/original/${row.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                    <EditIcon />
                                  </Link>
                                  : null
                            } */}