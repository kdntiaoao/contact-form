import { memo, useCallback, useEffect, useState } from 'react'

import { AlertDialog } from 'components/molecules'
import { StatusSelectArea } from 'components/organisms/presentations/StatusSelectArea'
import { Chat } from 'types/data'

type Props = {
  direction?: 'row' | 'column'
  currentStatus: number | undefined
  supporter: string | undefined
  uid: string
  // eslint-disable-next-line no-unused-vars
  changeStatus: (newStatus: number, chat: Chat) => void
}

// eslint-disable-next-line react/display-name
export const StatusSelectAreaContainer = memo(
  ({ direction = 'row', currentStatus, supporter, uid, changeStatus }: Props) => {
    const [disabled, setDisabaled] = useState<boolean>(false)
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    const handleDialogClose = useCallback((selectOption: 0 | 1) => {
      setDialogOpen(false)

      if (selectOption === 0) return

      setDialogOpen(false)
      const chat: Chat = { contributor: uid, postTime: Date.now(), contents: { newStatus: 2 } }
      changeStatus(2, chat)
    }, [changeStatus, uid])

    const handleClick = useCallback(
      (newStatus: number) => {
        // すでに選択されている状態を選択した場合は処理を実行しない
        if (newStatus === currentStatus) return

        if (newStatus === 2) {
          setDialogOpen(true)
          return
        }

        const chat: Chat = { contributor: uid, postTime: Date.now(), contents: { newStatus } }
        changeStatus(newStatus, chat)
      },
      [changeStatus, currentStatus, uid]
    )

    useEffect(() => {
      if (currentStatus === 2 || (currentStatus === 1 && supporter !== '0' && uid !== supporter)) {
        setDisabaled(true)
      } else {
        setDisabaled(false)
      }
    }, [supporter, currentStatus, uid])

    return (
      <>
        <StatusSelectArea
          direction={direction}
          currentStatus={currentStatus}
          disabled={disabled}
          onClick={handleClick}
        />
        <AlertDialog title="対応を完了しますか？" options={['キャンセル', '完了する']} open={dialogOpen} onClose={handleDialogClose} />
      </>
    )
  }
)
