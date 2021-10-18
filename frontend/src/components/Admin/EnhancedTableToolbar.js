import React from 'react';
import { StoreContext } from '../../Context/Store';

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

export default function EnhancedTableToolbar(props) {

  const classes = useToolbarStyles();
  const { numSelected, rows } = props;
  const { setInformation } = React.useContext(StoreContext);

  const handleDeleteClick = () => {
    const removeItem = rows.filter((row) => {
      return row.id !== rows.id
    })
    setInformation(removeItem);
  }

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
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon onClick={handleDeleteClick} />
          </IconButton>
        </Tooltip>
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