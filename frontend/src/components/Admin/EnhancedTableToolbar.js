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
import FilterListIcon from '@material-ui/icons/FilterList';
import { deletePostPonesById } from '../../services/postpone-serveice';
import DialogDelete from '../Dialog/DialogDelete';

export default function EnhancedTableToolbar(props) {

  const classes = useToolbarStyles();
  const { numSelected, selected } = props;
  const [open, setOpen] = useState(false);
  console.log("🚀 ~ file: EnhancedTableToolbar.js ~ line 21 ~ EnhancedTableToolbar ~ open", open)


  const handleDeleteClick = () => {
    setOpen(true);
  }

  const DeletePostPone = () => {
    deletePostPonesById(selected)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
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
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
          ตารางรายชื่อคนไข้
        </Typography>
      )}

      {numSelected > 0 ? (
        <React.Fragment>
          <Tooltip title="Delete" disableFocusListener={true}>
            <IconButton aria-label="delete">
              <DeleteIcon onClick={handleDeleteClick} />
            </IconButton>
          </Tooltip>
          <DialogDelete handleClose={handleClose} handleSubmit={handleSubmit} open={open} />
        </React.Fragment>


      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

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