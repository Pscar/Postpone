import React, { useContext } from 'react'
import { StoreContext } from '../../Context/Store';
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
  Typography
} from "@material-ui/core";

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment'

export default function PostPoneRow(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    historyRow.status !== 'อยู่ระหว่างดำเนินการ' ? (
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
                      </TableRow>
                    ) : null
                  ))}
                </TableBody>
              </Table>
            </Box>

          </Collapse>

        </TableCell>
      </TableRow>
    </React.Fragment >
  );
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});