import React from 'react'
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default function CardCheckPost({ data }) {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {
          data.map(del => (
            <Grid item key={del.id} xs={12} md={12} lg={12}>
              <Item2>{del.title}</Item2>
            </Grid>
          ))
        }
      </Grid >
    </React.Fragment >
  )
}

const Item2 = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  ...theme.typography.body2,
  textAlign: 'center',
  alignItems: 'center',
  margin: 5,
  padding: 5,
  color: theme.palette.text.secondary,
}));