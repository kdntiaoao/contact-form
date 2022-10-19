import { memo, useCallback, useMemo, useState } from 'react'

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
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    const handleDialogClose = useCallback(
      (selectOption: 0 | 1) => {
        setDialogOpen(false)
        // ダイアログで「キャンセル」を選択
        if (selectOption === 0) return
        // ダイアログで「完了する」を選択
        const chat: Chat = { contributor: uid, postTime: Date.now(), contents: { newStatus: 2 } }
        changeStatus(2, chat)
      },
      [changeStatus, uid]
    )

    const disabled = useMemo(
      // 対応状況が「対応完了」または他の担当が「対応中」の時、非活性
      () => (currentStatus === 2 || (currentStatus === 1 && uid !== supporter) ? true : false),
      [currentStatus, supporter, uid]
    )

    const handleClick = useCallback(
      (newStatus: number) => {
        // すでに選択されている状態を選択した場合は処理を実行しない
        if (newStatus === currentStatus) return

        // 対応完了をクリックした時は確認のダイアログを表示
        if (newStatus === 2) {
          setDialogOpen(true)
          return
        }

        const chat: Chat = { contributor: uid, postTime: Date.now(), contents: { newStatus } }
        changeStatus(newStatus, chat)
      },
      [changeStatus, currentStatus, uid]
    )

    return (
      <StatusSelectArea
        dialogOpen={dialogOpen}
        direction={direction}
        disabled={disabled}
        currentStatus={currentStatus}
        handleDialogClose={handleDialogClose}
        onClick={handleClick}
      />
    )
  }
)
