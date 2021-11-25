import React, { useState } from 'react';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
} from '@material-ui/core';

import { makeStyles, lighten } from '@material-ui/core/styles';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogDelete from '../Dialog/dialogDelete';
import { useDispatch } from "react-redux";
import { deleteAppointmentById } from '../../services/appointmentService';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    margin: '1rem',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
    textAlign: 'center',
    margin: '1rem',
    padding: theme.spacing(2)
  },
}));

export default function TableToolBar(props) {

  const classes = useToolbarStyles();
  const { numSelected, selected } = props;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();


  const handleDeleteClick = () => {
    setOpen(true);
  }

  const DeletePostPone = async () => {
    await dispatch(deleteAppointmentById(selected))
  }

  const handleSubmit = async () => {
    await DeletePostPone();
    await setOpen(false);
    await window.location.reload(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <React.Fragment>
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
          <Tooltip title="Delete" disableFocusListener={true}>
            <IconButton aria-label="delete">
              <DeleteIcon onClick={handleDeleteClick} />
            </IconButton>
          </Tooltip>
          <DialogDelete handleClose={handleClose} handleSubmit={handleSubmit} open={open} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
            ตารางรายชื่อคนไข้
          </Typography>
        </React.Fragment>
      )}
    </Toolbar>
  );
}
