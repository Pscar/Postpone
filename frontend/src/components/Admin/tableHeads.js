import React from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from '@material-ui/core';

export default function TableHeads(props) {
  const {  onSelectAllClick,  numSelected, rowCount } = props;

  const headCells = [
    { id: 'postpone_id', numeric: false, disablePadding: true, label: 'ลำดับ' },
    { id: 'firstName', numeric: false, disablePadding: false, label: 'รายชื่อคนไข้' },
    { id: 'course', numeric: false, disablePadding: false, label: 'เงื่อนไขของคนไข้' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'เบอร์ติดต่อคนไข้' },
    { id: 'status', numeric: false, disablePadding: false, label: 'สถานะใบเลื่อนนัด' },
    { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
  ];
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
