import React, { useContext } from 'react';
import { StoreContext } from '../Context/Store';
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
import DialogLogout from '../components/Dialog/dialogLogout';

export default function Navbar() {
  let history = useHistory();
  const classes = useStyles();
  const { dataUserNow, setAuth, setDataUserNow } = useContext(StoreContext);

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
    setDataUserNow({});
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
          {dataUserNow.email ?
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
                </IconButton>
                
                {dataUserNow.email}
                <Button color="inherit" onClick={handleClickOpen}>Logout</Button>
                <DialogLogout handleClose={handleClose} handleLogout={handleLogout} open={open} />
              
            </div> : <Button color="inherit" onClick={handlLogin}>ตรวจสอบผลการเลื่อนนัด</Button>
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

