import React from 'react';


import { StoreContext } from '../../Context/Store';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';

import {
  Typography,
  Grid,
  Paper,
  Container,
  Fab,
} from "@material-ui/core";

import CheckIcon from '@material-ui/icons/Check';

export default function UserThankYou() {
  const classes = useStyles();
  const { postPoneEdit } = React.useContext(StoreContext)
  const { postpones } = useSelector((state) => state.postpones);

  React.useEffect(() => {
    setInterval(() => {
      window.location.reload(true);
    }, 5000);
  }, []);
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Paper className={classes.paper} variant="outlined">
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Fab size="small" aria-label="check" className={classes.MuiFab}>
                <CheckIcon />
              </Fab>
              <Typography variant="h5" className={classes.item}>
                <b>บันทึกข้อมูลการเลื่อนนัดเรียบร้อย</b>
              </Typography>
              {postpones && postpones.map((item) => (
                <Typography variant="h5">
                  ระบบจะตอบกลับคุณ {postPoneEdit ? postPoneEdit.meta.arg.firstname : item.firstname} ภายใน 1 วันทำการ
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '1rem',
  },
  paper: {
    textAlign: 'center',
    padding: theme.spacing(2),
    color: theme.palette.text.black,
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  item: {
    margin: '1rem',
  },
  MuiFab: {
    backgroundColor: 'green',
    color: '#ffffff',
  }
}));