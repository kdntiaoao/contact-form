import { memo, useCallback } from 'react'

import { StatusSelectArea } from 'components/organisms/presentations/StatusSelectArea'
import { Chat } from 'types/data'

type Props = {
  direction?: 'row' | 'column'
  currentStatus: number | undefined
  contributor: string
  // eslint-disable-next-line no-unused-vars
  changeStatus: (newStatus: number, chat: Chat) => void
}

// eslint-disable-next-line react/display-name
export const StatusSelectAreaContainer = memo(
  ({ direction = 'row', currentStatus, contributor, changeStatus }: Props) => {
    const handleClick = useCallback(
      (newStatus: number) => {
        const chat: Chat = { contributor, postTime: Date.now(), contents: { newStatus } }
        changeStatus(newStatus, chat)
      },
      [changeStatus, contributor]
    )

    return <StatusSelectArea direction={direction} currentStatus={currentStatus} onClick={handleClick} />
  }
)
