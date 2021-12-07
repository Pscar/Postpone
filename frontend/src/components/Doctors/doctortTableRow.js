import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Collapse,
  Box,
  IconButton,
  Typography,
  Button,
  Modal,
  Backdrop,
  Fade
} from "@material-ui/core";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from "@material-ui/lab";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DoctorSelectModel from './doctorSelectModel';
import moment from 'moment';

export default function DoctortTableRow(props) {
  const { row, searched, scheduleDr, handleNext } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  const [openModel, setOpenModel] = useState(false);

  const handleOpen = () => {
    setOpenModel(true);
  };

  const handleClose = () => {
    setOpenModel(false);
  };


  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          {row.doctorId}
        </TableCell>
        <TableCell align="center">
          {searched ? scheduleDr.doctorName : row.doctorName}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Timeline
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ชื่อ - นาสกุล</TableCell>
                    <TableCell align="center">เวลา</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.schedule ? row.schedule.slice(-1).map((historyRow) => (
                    <TableRow key={historyRow.doctorId}>
                      <TableCell align="center">
                        {row.doctorName}
                      </TableCell>
                      <TableCell>
                        <Timeline>
                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot variant="outlined" />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>{moment(historyRow.startTime).format('DD-MM-YYYY HH:mm')}</TimelineContent>
                          </TimelineItem>
                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot />
                            </TimelineSeparator>
                            <TimelineContent>{moment(historyRow.endTime).format('DD-MM-YYYY HH:mm')}</TimelineContent>
                          </TimelineItem>
                        </Timeline>
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="primary" onClick={handleOpen}>
                          เลือกวันนัด
                        </Button>
                        <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          className={classes.modal}
                          open={openModel}
                          onClose={handleClose}
                          closeAfterTransition
                          BackdropComponent={Backdrop}
                          BackdropProps={{
                            timeout: 500,
                          }}
                        >
                          <Fade in={openModel}>
                            <DoctorSelectModel row={row} handleNext={handleNext} />
                          </Fade>
                        </Modal>
                      </TableCell>
                    </TableRow>
                  )) : null}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },

  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
