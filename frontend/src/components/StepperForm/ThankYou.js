import React, { useContext } from 'react'
import { StoreContext } from '../../Context/Store';
import { makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  Grid,
  Paper,
  Container,
  Fab,

} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';

export default function ThankYou() {
  const classes = useStyles();

  const { informations } = useContext(StoreContext)

  const datas = informations.slice(-1);

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Paper className={classes.paper} variant="outlined">
          {datas.map((data) => (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Fab size="small" aria-label="check" className={classes.MuiFab}>
                    <CheckIcon />
                  </Fab>
                  <Typography variant="h5" className={classes.item}>
                    <b>บันทึกข้อมูลการเลื่อนนัดเรียบร้อย</b>
                  </Typography>
                  <Typography variant="h5">
                    ระบบจะตอบกลับ คุณ {data.firstName} ภายใน 1 วันทำการ
                  </Typography>
                </Grid>
              </Grid>
            </>
          ))}
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