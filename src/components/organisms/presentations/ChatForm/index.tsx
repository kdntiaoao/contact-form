import { memo } from 'react'

import SendIcon from '@mui/icons-material/Send'
import { Alert, Button, Snackbar, Stack, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

import { ChatFormInputType } from 'components/organisms/containers/ChatFormContainer'


type Props = {
  error: boolean
  onClose: () => void
  errorMessage: string | undefined
  onSubmit: () => void
  control: Control<ChatFormInputType>
}

// eslint-disable-next-line react/display-name
export const ChatForm = memo(({ error, onClose, errorMessage, onSubmit, control }: Props) => {
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
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} variant="outlined" sx={{ flex: 1 }} />}
        />
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          送信
        </Button>
      </Stack>
    </>
  )
})
