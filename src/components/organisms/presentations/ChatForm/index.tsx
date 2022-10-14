import { BaseSyntheticEvent, memo } from 'react'

import SendIcon from '@mui/icons-material/Send'
import { Alert, Button, Snackbar, Stack, TextField, useMediaQuery, useTheme } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

import { ChatFormInputType } from 'components/organisms/containers/ChatFormContainer'

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
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <>
      {/* エラー表示 */}
      <Snackbar open={error} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage || 'エラーが発生しました'}
        </Alert>
      </Snackbar>

      {/* 入力フォーム */}
      <Stack direction="row" spacing={4} component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
        <Controller
          name="text"
          control={control}
          rules={{ required: true, maxLength: 4000 }}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              maxRows={3}
              size={matches ? 'medium' : 'small'}
              variant="outlined"
              disabled={disabled}
              sx={{ flex: 1 }}
              inputProps={{ maxLength: 4000 }}
            />
          )}
        />
        <Button type="submit" variant="contained" disabled={disabled} endIcon={<SendIcon />}>
          送信
        </Button>
      </Stack>
    </>
  )
})
