import { memo, SyntheticEvent, useCallback, useState } from 'react'

import SendIcon from '@mui/icons-material/Send'
import { Alert, Button, Snackbar, Stack, TextField } from '@mui/material'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { db } from '../../../../firebase/client'

import { Chat } from 'types/data'

type Props = {
  contributor: string | undefined
  contactId: string | undefined
}

type FormInput = {
  text: string
}

// eslint-disable-next-line react/display-name
export const ChatForm = memo(({ contributor, contactId }: Props) => {
  const { handleSubmit, control, reset } = useForm<FormInput>({
    mode: 'onChange',
    defaultValues: {
      text: '',
    },
  })
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setError(false);
  }

  const onSubmit: SubmitHandler<FormInput> = useCallback(
    async ({ text }) => {
      try {
        if (text === '') throw new Error('input is empty.')
        if (typeof contributor === 'undefined') throw new Error('contributor is undefined.')
        if (typeof contactId === 'undefined') throw new Error('contactId is undefined.')

        console.log(text)
        const chat: Chat = { contributor, postTime: Date.now(), contents: { text } }
        const docRef = doc(db, 'chatData', contactId)
        await updateDoc(docRef, { chatHistory: arrayUnion(chat) })

        reset()
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message)
          setError(true)
          setErrorMessage(error.message)
        }
      }
    },
    [contactId, contributor, reset]
  )

  return (
    <>
      {/* エラー表示 */}
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage || 'エラーが発生しました'}
        </Alert>
      </Snackbar>

      {/* 入力フォーム */}
      <Stack
        direction="row"
        spacing={4}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
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
