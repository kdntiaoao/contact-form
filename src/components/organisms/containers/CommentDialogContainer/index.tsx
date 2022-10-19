import { memo, useCallback } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { CommentDialog } from 'components/organisms/presentations/CommentDialog'
import { Comment } from 'types/data'

type Props = {
  comment: Comment
  disabled: boolean
  open: boolean
  // eslint-disable-next-line no-unused-vars
  editComment: (commentContents: string) => void
  handleClose: () => void
}

// eslint-disable-next-line react/display-name
export const CommentDialogContainer = memo(({ comment, disabled, open, editComment, handleClose }: Props) => {
  const { control, handleSubmit } = useForm<{ commentContents: string }>({
    defaultValues: { commentContents: comment?.contents || '' },
  })

  const onSubmit: SubmitHandler<{ commentContents: string }> = useCallback(({ commentContents }) => {
    handleClose()
    editComment(commentContents)
  }, [editComment, handleClose])

  return (
    <CommentDialog
      control={control}
      disabled={disabled}
      open={open}
      handleClose={handleClose}
      handleSubmit={handleSubmit(onSubmit)}
    />
  )
})
