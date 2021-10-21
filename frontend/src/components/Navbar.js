import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import AccountCircle from "@material-ui/icons/AccountCircle";
import { StoreContext } from '../Context/Store';
import DialogLogout from './DialogLogout';

export default function Navbar() {
  let history = useHistory();
  const classes = useStyles();
  const { dataUser, setAuth, setDataUser } = useContext(StoreContext);
  const [open, setOpen] = React.useState(false);

  const handlLogin = () => {
    if (Object.keys(dataUser).length === 0) {
      history.push("/login");
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleLogout = () => {
    setDataUser({});
    setAuth(false)
    window.localStorage.removeItem("login");
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
          {/* {Object.keys(dataUser).length > 0 && */}
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          {/* } */}
          {/* <Button color="inherit" onClick={handlLogin}>{Object.keys(dataUser).length > 0 ? `${dataUser.firstName}` : "ตรวจสอบการเลื่อนนัด"}</Button>
          {Object.keys(dataUser).length > 0 ?
            <>
              <Button color="inherit" onClick={handleClickOpen}>Logout</Button>
              <DialogLogout handleClose={handleClose} handleLogout={handleLogout} open={open} />
            </>
            : ""} */}

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

