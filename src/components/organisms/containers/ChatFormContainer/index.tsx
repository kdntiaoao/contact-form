import { memo, SyntheticEvent, useCallback, useState } from 'react'

import { push, ref, set } from 'firebase/database'
import { SubmitHandler, useForm } from 'react-hook-form'

import { database } from '../../../../../firebase/client'

import { ChatForm } from 'components/organisms/presentations/ChatForm'
import { Chat } from 'types/data'

type Props = {
  contributor: string | undefined
  contactId: string | undefined
}

export type ChatFormInputType = {
  text: string
}

// eslint-disable-next-line react/display-name
export const ChatFormContainer = memo(({ contributor, contactId }: Props) => {
  const { handleSubmit, control, reset } = useForm<ChatFormInputType>({
    mode: 'onChange',
    defaultValues: {
      text: '',
    },
  })
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const handleClose = useCallback((event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setError(false)
  }, [])

  const onSubmit: SubmitHandler<ChatFormInputType> = useCallback(
    async ({ text }) => {
      try {
        if (text === '') throw new Error('input is empty.')
        if (typeof contributor === 'undefined') throw new Error('contributor is undefined.')
        if (typeof contactId === 'undefined') throw new Error('contactId is undefined.')

        const chat: Chat = { contributor, postTime: Date.now(), contents: { text } }
        const chatDataRef = ref(database, `chatDataList/${contactId}`)
        const newChatRef = push(chatDataRef)
        await set(newChatRef, chat)

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
    <ChatForm
      error={error}
      onClose={handleClose}
      errorMessage={errorMessage}
      onSubmit={handleSubmit(onSubmit)}
      control={control}
    />
  )
})
