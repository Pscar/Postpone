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
import moment from 'moment';

export default function PatientAppointmentActualize(props) {
  const { row, patient } = props;

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
        <TableCell align="center">{patient.firstname} - {patient.lastname}</TableCell>
        <TableCell align="center"> {(() => {
          switch (row.status) {
            case 'อยู่ระหว่างดำเนินการ':
              return (
                <Typography style={{ color: 'blue' }}>{row.status}</Typography>
              )
            case 'ยืนยันแบบฟอร์มการเลื่อนนัด':
              return (
                <Typography style={{ color: 'green' }}>{row.status}</Typography>
              )
            case 'ไม่สามารถเลื่อนนัดได้':
              return (
                <Typography style={{ color: 'red' }}>{row.status}</Typography>
              )
            default:
              return null
          }
        })()
        }</TableCell>
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
                        สถานะ
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
                  <TableRow>
                    <TableCell>
                      <Typography variant="body" component="div" align='center'>
                        {row.appointments_id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body" component="div" align='center'>
                        {row.locations}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body" component="div" align='center'>
                        {row.doctor_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body" component="div" align='center'>
                        {moment(row.dateNew).format('DD-MM-YYYY hh:mm')}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {(() => {
                        switch (row.status) {
                          case 'อยู่ระหว่างดำเนินการ':
                            return (
                              <Typography style={{ color: 'blue' }}>{row.status}</Typography>
                            )
                          case 'ยืนยันแบบฟอร์มการเลื่อนนัด':
                            return (
                              <Typography style={{ color: 'green' }}>{row.status}</Typography>
                            )
                          case 'ไม่สามารถเลื่อนนัดได้':
                            return (
                              <Typography style={{ color: 'red' }}>{row.status}</Typography>
                            )
                          default:
                            return null
                        }
                      })()
                      }
                    </TableCell>
                    <TableCell align='center'>
                      {
                        row.status !== 'อยู่ระหว่างดำเนินการ' ? (
                          <Link
                            to={`/detail/${row.appointments_id}`}
                            style={{
                              textDecoration: 'none', color: 'white'
                            }}>
                            <Button variant="outlined" color="primary">
                              <NoteIcon />
                            </Button>
                          </Link>
                        ) :
                          <Button variant="outlined" color="primary" disabled={row.status === 'อยู่ระหว่างดำเนินการ'}>
                            <NoteIcon />
                          </Button>
                      }
                    </TableCell>
                  </TableRow>
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