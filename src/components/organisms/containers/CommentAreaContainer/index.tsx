import { memo, useCallback, useEffect, useMemo } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { CommentArea } from 'components/organisms/presentations/CommentArea'
import { Comment } from 'types/data'

type Props = {
  comment: Comment | undefined
  contributor: string | undefined
  currentStatus: number | undefined
  supporter: string | undefined // 現在の担当者ID
  // eslint-disable-next-line no-unused-vars
  editComment: (commentContents: string) => void
}

type CommentFormType = {
  commentContents: string
}

// eslint-disable-next-line react/display-name
export const CommentAreaContainer = memo(({ comment, contributor, currentStatus, supporter, editComment }: Props) => {
  const { control, handleSubmit, setValue } = useForm<CommentFormType>({
    mode: 'onChange',
    defaultValues: {
      commentContents: comment?.contents || '',
    },
  })

  const disabled = useMemo<boolean>(() => {
    if (currentStatus === 1 && supporter === contributor) {
      return false
    } else {
      return true
    }
  }, [contributor, currentStatus, supporter])

  const onSubmit: SubmitHandler<CommentFormType> = useCallback(
    ({ commentContents }) => {
      editComment(commentContents)
    },
    [editComment]
  )

  useEffect(() => {
    if (comment) {
      setValue('commentContents', comment?.contents)
    }
  }, [comment, setValue])

  return (
    <>
      <CommentArea control={control} disabled={disabled} onSubmit={handleSubmit(onSubmit)} />
    </>
  )
})
