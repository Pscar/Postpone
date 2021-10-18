import React from 'react';
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
import ContentModel from './ContentModel';
import moment from 'moment';

export default function TimelineRow(props) {
  const { row, handleNext } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const [openModel, setOpenModel] = React.useState(false);

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
          {row.id}
        </TableCell>
        <TableCell align="center">
          {row.name}
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
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell align="center">
                        {row.name}
                      </TableCell>
                      <TableCell>
                        <Timeline>
                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot variant="outlined" />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>{moment(historyRow.startDate).format('DD-MM-YYYY HH:mm')}</TimelineContent>
                          </TimelineItem>
                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot />
                            </TimelineSeparator>
                            <TimelineContent>{moment(historyRow.endDate).format('DD-MM-YYYY HH:mm')}</TimelineContent>
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
                            <ContentModel row={row} handleNext={handleNext} />
                          </Fade>
                        </Modal>
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
