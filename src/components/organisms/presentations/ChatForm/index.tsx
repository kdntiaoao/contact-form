import { BaseSyntheticEvent, memo } from 'react'

import SendIcon from '@mui/icons-material/Send'
import { Alert, Box, Button, Snackbar, Stack, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

import { ChatFormInputType } from 'types/input'

type Props = {
  error: boolean
  onClose: () => void
  errorMessage: string | undefined
  // eslint-disable-next-line no-unused-vars
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>
  control: Control<ChatFormInputType>
  disabled: boolean
}

// eslint-disable-next-line react/display-name
export const ChatForm = memo(({ error, onClose, errorMessage, onSubmit, control, disabled }: Props) => {
  return (
    <>
      {/* エラー表示 */}
      <Snackbar open={error} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage || 'エラーが発生しました'}
        </Alert>
      </Snackbar>

      {/* 入力フォーム */}
      <Stack
        direction="row"
        spacing={4}
        component="form"
        alignItems="flex-end"
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <Controller
          name="text"
          control={control}
          rules={{ required: true, maxLength: 4000 }}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={disabled}
              multiline
              maxRows={3}
              size="small"
              variant="outlined"
              inputProps={{ maxLength: 4000 }}
              sx={{ flex: 1 }}
            />
          )}
        />
        <Box sx={{pb: 0.2}}>
          <Button disabled={disabled} type="submit" variant="contained" endIcon={<SendIcon />}>
            送信
          </Button>
        </Box>
      </Stack>
    </>
  )
})
