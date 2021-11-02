import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

export default function DialogChangeDr(props) {
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
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ข้อมูลคนไข้ในเงื่อนไข เลือกตามวันเวลาเป็นหลัก พบแพทย์ท่านใดก็ได้ และ ยืนยันสถานะ
          </DialogContentText>
        </DialogContent>
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
