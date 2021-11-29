import React from 'react';

import {
  Grid,
  Typography
} from '@material-ui/core';

export default function PatientCondition({ data }) {

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
