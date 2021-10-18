import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle
} from '@material-ui/core';

export default function DialogLogout(props) {
  const { open, handleClose, handleLogout } = props

  return (
    <>
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"คุณต้องการออกจากระบบ ?"}</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}
