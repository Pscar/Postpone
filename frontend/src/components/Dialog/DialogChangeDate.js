import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
export default function DialogChangeDate(props) {

  const { open, handleClose, handleSubmitChangeDate } = props

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ต้องการแก้ไขข้อมูลหรือไม่"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ข้อมูลคนไข้ในเงื่อนไข ขอพบแพทย์ท่านเดิม เวลาใดก็ได้ และ ยืนยันสถานะ
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmitChangeDate} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}