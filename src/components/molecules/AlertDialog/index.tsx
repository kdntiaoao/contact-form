import { memo } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

type Props = {
  title?: string
  description?: string
  options: [string, string]
  open: boolean
  // eslint-disable-next-line no-unused-vars
  onClose: (selectOption: 0 | 1) => void
}

// eslint-disable-next-line react/display-name
export const AlertDialog = memo(({ title, description, options, open, onClose }: Props) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => onClose(0)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(0)} autoFocus>
            {options[0]}
          </Button>
          <Button onClick={() => onClose(1)}>{options[1]}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
})
