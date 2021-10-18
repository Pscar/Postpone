import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/Store';
import {
  TableCell,
  TableRow,
  Button,
} from "@material-ui/core";
export default function PostPoneNoRow(props) {
  const { dataUser } = useContext(StoreContext);

  const { row } = props

  return (
    <React.Fragment>
      {row.email === dataUser.email && row.password === dataUser.password && row.status !== 'อยู่ระหว่างดำเนินการ' ?
        <TableRow>
          <TableCell align="center">{row.id}</TableCell>
          <TableCell align="center">{row.HN}</TableCell>
          <TableCell align="center">{row.firstName} - {row.lastName}</TableCell>
          <TableCell align="center">{row.status}</TableCell>
          <TableCell align="center">
            <Link to={`/detail/${row.id}`} style={{ textDecoration: 'none', color: 'white' }}>
              <Button variant="outlined" color="primary">รายละเอียด</Button>
            </Link>
          </TableCell>
        </TableRow>
        : null
      }
    </React.Fragment >
  )
}
