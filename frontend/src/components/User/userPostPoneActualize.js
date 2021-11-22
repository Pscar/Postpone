import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Box,
  Collapse,
  IconButton,
  Button,
  Typography
} from "@material-ui/core";

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import NoteIcon from '@material-ui/icons/Note';
import UserPostPoneSucceed from './userPostPoneSucceed';

export default function UserPostPoneActualize(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.hn}
        </TableCell>
        <TableCell align="center">{row.firstname} - {row.lastname}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                รายละเอียด
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" gutterBottom component="div" align='center'>
                        ลำดับ
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" gutterBottom component="div" align='center'>
                        สถานที่ตรวจ
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" gutterBottom component="div" align='center'>
                        แพทย์ที่ตรวจ
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" gutterBottom component="div" align='center'>
                        วันที่นัดล่าสุด
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" gutterBottom component="div" align='center'>
                        รายละเอียด
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow>
                      <TableCell>
                        <Typography variant="body" component="div" align='center'>
                          {historyRow.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body" component="div" align='center'>
                          {historyRow.locations}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body" component="div" align='center'>
                          {historyRow.appointments}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body" component="div" align='center'>
                          {historyRow.dateNew}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        {
                          historyRow.status !== 'อยู่ระหว่างดำเนินการ' ? (
                            <Link
                              to={`/detail/${row.postpone_id}`}
                              style={{
                                textDecoration: 'none', color: 'white'
                              }}>
                              <Button variant="outlined" color="primary">
                                <NoteIcon />
                              </Button>
                            </Link>
                          ) :
                            <Button variant="outlined" color="primary" disabled={historyRow.status === 'อยู่ระหว่างดำเนินการ'}>
                              <NoteIcon />
                            </Button>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});