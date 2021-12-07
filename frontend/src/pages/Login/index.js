import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import bcrypt from 'bcryptjs'
import {
  CssBaseline,
  Avatar,
  Button,
  TextField,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { loginSuccess } from '../../slices/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientAll } from '../../services/patientService';

function LoginsForm() {

  let history = useHistory();
  const classes = useStyles();

  const [stateEvent, setStateEvent] = useState({ email: '', password: '' });
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  const patients = useSelector((state) => state.patients);
  const dispatch = useDispatch()

  const returnGetPatientAll = React.useCallback(() => {
    dispatch(getPatientAll());
  }, [dispatch])

  React.useEffect(() => {
    returnGetPatientAll()
  }, [returnGetPatientAll])


  const handleClick = () => {
    if (isLogin === true) {
      history.push("/create");
    }
  }
  const handleChange = event => {
    setStateEvent({
      ...stateEvent, [event.target.name]: event.target.value
    })
  }

  const submitUser = (event) => {
    event.preventDefault();
    for (const item of patients) {

      const hashedPassword = bcrypt.hashSync(stateEvent.password, item.password)

      if (stateEvent.email === item.email && hashedPassword === item.password) {
        setIsLogin(true)
        dispatch(loginSuccess(item))
      }
      if (stateEvent.email === 'admin@admin.com' && hashedPassword === item.password) {
        setIsLogin(true)
        history.push("/admin");
      }
      if (stateEvent.email !== item.email) {
        setTimeout(() => {
          setAlert(false)
          setAlertContent("")
        }, 1000)
        setAlert(true)
        setAlertContent("กรุณากรอก email ใหม่")
      }
      if (hashedPassword === item.password) {
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
          <Grid container>
            <Grid item>
              <Link to={`/register`} className={classes.link}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default LoginsForm;

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
  link: {
    textDecoration: 'none',
    color: 'blue'
  }
}));