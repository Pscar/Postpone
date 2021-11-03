import React, { useState, useContext } from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Container,
  Grid
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SearchBar from "material-ui-search-bar";
import { StoreContext } from '../Context/Store';
import UserPostPoneActualize from '../components/User/userPostPoneActualize';
import UserPostPoneSucceed from '../components/User/userPostPoneSucceed';

export default function PostPoneShow(props) {
  const { dataUserNow } = props;
  const classes = useStyles();
  const { postPoneAll } = useContext(StoreContext);
  const [searched, setSearched] = useState("");
  const [displaySearch, setDisplaySearch] = useState([])

  const dataPostPone = () => {
    const rows = displaySearch.map((data) => {
      const historys = {
        postpone_id: data.postpone_id,
        user_id: data.user_id,
        hn: data.hn,
        firstname: data.firstname,
        lastname: data.lastname,
        status: data.status,
        history:
          displaySearch.filter(function (item) {
            return item.user_id === data.user_id;
          }).map(function (item) {
            return {
              id: item.postpone_id,
              user_id: item.user_id,
              locations: item.locations,
              appointments: data.appointments,
              status: item.status,
              dateOld: item.dateOld,
              dateNew: item.dateNew,
            }
          })
      }
      return historys
    })
    return rows
  }

  const data = dataPostPone();

  const requestSearch = (searchedVal) => {
    if (searchedVal) {
      const filteredRows = data.filter((row) => {
        return row.firstname.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setDisplaySearch(filteredRows);
    } else {
      setDisplaySearch(postPoneAll);

    }
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  //แสดงผลหลังจาก get api 
  React.useEffect(() => {
    setDisplaySearch([...postPoneAll])
  }, [postPoneAll])

  return (
    <Container maxWidth="md">
      <Grid container className={classes.root}>
        <Grid item xs={12} md={12}>
          <TableContainer component={Paper}>
            <SearchBar
              value={searched}
              onChange={(newValue) => (requestSearch(newValue))}
              onCancelSearch={() => cancelSearch()}
            />
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ลำดับ</TableCell>
                  <TableCell align="center">เลขบัตรรพ</TableCell>
                  <TableCell align="center">ชื่อ - นามสกุล</TableCell>
                  <TableCell align="center">สถานะใบนัด</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              {data.map((row) => (row.user_id === dataUserNow.user_id && row.status === 'อยู่ระหว่างดำเนินการ' ? (
                <TableBody>
                  <UserPostPoneActualize key={row.postpone_id} row={row} dataUserNow={dataUserNow} />
                </TableBody>
              ) : <UserPostPoneSucceed key={row.postpone_id} row={row} dataUserNow={dataUserNow} />
              ))}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

    </Container>
  );
}

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
    padding: '1rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
UserPostPoneActualize.propTypes = {
  row: PropTypes.shape({
    postpone_id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    hn: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired, 
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        locations: PropTypes.string.isRequired,
        appointments: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired, 
        dateOld: PropTypes.instanceOf(Date).isRequired,
        dateNew: PropTypes.instanceOf(Date).isRequired,
      }),
    ).isRequired,
  }).isRequired,
};
