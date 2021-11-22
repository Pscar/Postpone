import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Avatar,
  Button,
  TextField,
  Container,
  Typography,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { loginSuccess } from '../slices/userLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAll } from '../services/user-redux';
export default function LoginsForm() {

  let history = useHistory();
  const classes = useStyles();

  const [stateEvent, setStateEvent] = useState({ email: '', password: '' });
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch()

  const getUsersAll = React.useCallback(() => {
    dispatch(getUserAll());
  }, [dispatch])

  React.useEffect(() => {
    getUsersAll()
  }, [getUsersAll])


  const handleClick = () => {
    if (isLogin === true) {
      history.push("/postpone");
    }
  }
  const handleChange = event => {
    setStateEvent({
      ...stateEvent, [event.target.name]: event.target.value
    })
  }

  const submitUser = (event) => {
    event.preventDefault();
    for (let i = 0; i < users.data.length; i++) {
      if (stateEvent.email === users.data[i].email && stateEvent.password === users.data[i].password) {
        setIsLogin(true)
        dispatch(loginSuccess(users.data[i]))
      }
      else if (stateEvent.email === 'admin@admin.com' && stateEvent.password === '147258369') {
        setIsLogin(true)
        history.push("/admin");
      } else if (stateEvent.email !== users.data[i].email) {
        setAlert(true)
        setAlertContent("กรุณากรอก email ใหม่")
      } else if (stateEvent.password !== users.data[i].password) {
        setAlert(true)
        setAlertContent("กรุณากรอก password ใหม่")
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ตรวจสอบผลการเลื่อนนัด
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitUser}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            name="email"
            onChange={handleChange} />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            name="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            ตรวจสอบ
          </Button>
          {alert ? <Alert variant="filled" severity="error">{alertContent}</Alert> : <></>}

        </form>
      </div>
    </Container>
  )
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));