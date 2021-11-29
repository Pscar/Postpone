import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle
} from "@material-ui/core";

export default function DialogEditAppointment(props) {
  const { open, handleClose, handleSubmitChangDr } = props

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ต้องการแก้ไขข้อมูลหรือไม่"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmitChangDr} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
