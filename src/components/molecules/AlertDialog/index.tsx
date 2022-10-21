import { memo } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from '@mui/material'

type Props = {
  title?: string
  description?: string
  options: [string, string]
  open: boolean
  // eslint-disable-next-line no-unused-vars
  onClose: (selectOption: 0 | 1) => void
}

const CustomizedDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogActions-root': {
    padding: theme.spacing(3),
  },
}))

// eslint-disable-next-line react/display-name
export const AlertDialog = memo(({ title, description, options, open, onClose }: Props) => {
  return (
    <div>
      <CustomizedDialog
        open={open}
        onClose={() => onClose(0)}
        fullWidth
        maxWidth="xs"
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
          <Button variant="contained" onClick={() => onClose(1)}>
            {options[1]}
          </Button>
        </DialogActions>
      </CustomizedDialog>
    </div>
  )
})
