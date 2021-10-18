import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  Typography
} from '@material-ui/core';
export default function CardCondition({ data }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>{
        data.map(del => (
          <Typography key={del.id}>{del.id}. {del.title}</Typography>
        ))
      }
      </Grid>
    </Grid >
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.h1,
    display: 'flex',
    justifyContent: 'center'
  },
}));