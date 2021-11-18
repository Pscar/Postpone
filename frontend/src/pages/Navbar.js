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
import { logoutSuccess } from '../slices/userLoginSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Navbar() {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.users);

  let history = useHistory();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handlLogin = () => {
    history.push("/login");
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
    history.push("/");
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ระบบเลื่อนนัดออนไลน์
          </Typography>
          {users ?
            <React.Fragment>
              {users.role === 'admin' &&
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

              {users ? users.email : ""}
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

