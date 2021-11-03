import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

export default function DialogChangegOriginal(props) {
  const { open, handleClose, handleSubmitChangOriginal } = props
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
            ข้อมูลคนไข้ในเงื่อนไข ขอรับการรักษาตามวันนัดหมายเดิม และ พบแพทย์ท่านเดิม และ ยืนยันสถานะ
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmitChangOriginal} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
