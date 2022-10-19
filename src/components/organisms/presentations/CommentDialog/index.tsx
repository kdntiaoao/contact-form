import { BaseSyntheticEvent, memo } from 'react'

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, styled, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

type Props = {
  control: Control<{ commentContents: string }>
  disabled: boolean
  open: boolean
  handleClose: () => void
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (event: BaseSyntheticEvent) => void
}

const CustomizedDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogActions-root': {
    padding: theme.spacing(3),
  },
}))

// eslint-disable-next-line react/display-name
export const CommentDialog = memo(({ control, disabled, open, handleClose, handleSubmit }: Props) => {
  return (
    <CustomizedDialog fullWidth open={open} onClose={handleClose} aria-labelledby="comment-dialog-title" maxWidth="md">
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle id="comment-dialog-title">コメント</DialogTitle>
        <DialogContent>
          <Controller
            name="commentContents"
            control={control}
            rules={{ required: true, maxLength: 4000 }}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                fullWidth
                multiline
                disabled={disabled}
                margin="dense"
                minRows={3}
                variant="outlined"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose}>
            キャンセル
          </Button>
          <Button disabled={disabled} type="submit" variant="contained">
            送信する
          </Button>
        </DialogActions>
      </Box>
    </CustomizedDialog>
  )
})
