import { BaseSyntheticEvent, memo, useCallback, useState } from 'react'

import CreateRoundedIcon from '@mui/icons-material/CreateRounded'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

type Props = {
  control: Control<{ commentContents: string }>
  disabled: boolean
  // eslint-disable-next-line no-unused-vars
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>
}

// eslint-disable-next-line react/display-name
export const CommentArea = memo(({ control, disabled, onSubmit }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleDialogClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleSubmit = useCallback(
    (event: BaseSyntheticEvent) => {
      setOpen(false)
      onSubmit(event)
    },
    [onSubmit]
  )

  return (
    <>
      <Button onClick={handleClickOpen} endIcon={<CreateRoundedIcon />}>
        コメントする
      </Button>

      {/* コメントを入力するダイアログボックス */}
      <Dialog fullWidth open={open} onClose={handleDialogClose} aria-labelledby="comment-dialog-title" maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle id="comment-dialog-title">コメント</DialogTitle>
          <DialogContent>
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
              <Button type="button" onClick={handleDialogClose}>
                キャンセル
              </Button>
              <Button disabled={disabled} type="submit" variant="contained">
                送信する
              </Button>
            </DialogActions>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  )
})
