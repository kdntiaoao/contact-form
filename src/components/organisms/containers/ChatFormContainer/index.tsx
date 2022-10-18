import { memo, SyntheticEvent, useCallback, useEffect, useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { ChatForm } from 'components/organisms/presentations/ChatForm'
import { Chat } from 'types/data'
import { ChatFormInputType } from 'types/input'

type Props = {
  admin: boolean
  contributor: string | undefined
  contactId: string | undefined
  currentStatus?: number | undefined
  supporter?: string | undefined // 現在の担当者のID
  // eslint-disable-next-line no-unused-vars
  postChat: (chat: Chat) => Promise<void>
}

// eslint-disable-next-line react/display-name
export const ChatFormContainer = memo(
  ({ admin, contributor, contactId, currentStatus, supporter, postChat }: Props) => {
    const { handleSubmit, control, reset } = useForm<ChatFormInputType>({
      mode: 'onChange',
      defaultValues: {
        text: '',
      },
    })
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>()
    const [disabled, setDisabled] = useState<boolean>(false)

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

          reset()

          await postChat(chat)
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(true)
            setErrorMessage(error.message)
          }
        }
      },
      [contactId, contributor, postChat, reset]
    )

    useEffect(() => {
      if (currentStatus === 1 && supporter === contributor) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }, [contributor, currentStatus, supporter])

    return (
      <ChatForm
        error={error}
        onClose={handleClose}
        errorMessage={errorMessage}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        disabled={admin && disabled}
      />
    )
  }
)
