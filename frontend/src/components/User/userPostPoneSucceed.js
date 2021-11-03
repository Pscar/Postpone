import React  from 'react';
import { Link } from 'react-router-dom';
import {
  TableCell,
  TableRow,
  Button,
} from "@material-ui/core";
export default function PostPoneNoRow(props) {

  const { row, dataUserNow } = props

  return (
    <React.Fragment>
      {row.user_id === dataUserNow.user_id && row.status !== 'อยู่ระหว่างดำเนินการ' ?
        <TableRow>
          <TableCell align="center">{row.postpone_id}</TableCell>
          <TableCell align="center">{row.hn}</TableCell>
          <TableCell align="center">{row.firstname} - {row.lastname}</TableCell>
          <TableCell align="center">{row.status}</TableCell>
          <TableCell align="center">
            <Link to={`/detail/${row.postpone_id}`} style={{ textDecoration: 'none', color: 'white' }}>
              <Button variant="outlined" color="primary">รายละเอียด</Button>
            </Link>
          </TableCell>
        </TableRow>
        : null
      }
    </React.Fragment >
  )
}
