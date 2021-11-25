import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import AccountCircle from "@material-ui/icons/AccountCircle";
import DialogLogout from '../components/Dialog/dialogLogout';
import { logoutSuccess } from '../slices/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Navbar() {
  const dispatch = useDispatch()
  const logins = useSelector((state) => state.logins.login);

  let history = useHistory();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handlLogin = () => {
    history.push("/");
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await dispatch(logoutSuccess());
    await history.push("/");
    await window.location.reload(true);
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ color: '#ffffff', textDecoration: 'none' }}>
              ระบบเลื่อนนัดออนไลน์
            </Link>
          </Typography>

          {logins ?
            <React.Fragment>
              {logins.role === 'admin' &&
                <Link to="/doctor" style={{ color: '#ffffff', textDecoration: 'none' }}>
                  <Button color="inherit">ตารางเวลาหมอ</Button>
                </Link>
              }

              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              {logins.role === 'admin' ? (
                <Link to="/admin" style={{ color: '#ffffff', textDecoration: 'none' }}>
                  <Button color="inherit">{logins.email}</Button>
                </Link>

              ) :
                <Link to="/postpone" style={{ color: '#ffffff', textDecoration: 'none' }}>
                  <Button color="inherit">{logins.email}</Button>
                </Link>
              }
              <Button color="inherit" onClick={handleClickOpen}>Logout</Button>
              <DialogLogout handleClose={handleClose} handleLogout={handleLogout} open={open} />
            </React.Fragment>
            : <Button color="inherit" onClick={handlLogin}>ตรวจสอบผลการเลื่อนนัด</Button>
          }
        </Toolbar>
      </AppBar>
    </div>

  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

