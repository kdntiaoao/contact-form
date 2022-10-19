import { memo, useCallback, useMemo } from 'react'

import { format } from 'date-fns'

import { ChatList } from 'components/organisms/presentations/ChatList'
import { statusList } from 'components/organisms/presentations/StatusSelectArea'
import { ChatData, ContactInfo, SupporterList } from 'types/data'

type Props = {
  admin?: boolean
  chatData: ChatData
  contactInfo: ContactInfo
  supporterList: SupporterList
}

// eslint-disable-next-line react/display-name
export const ChatListContainer = memo((props: Props) => {
  const { chatData, contactInfo, supporterList } = props

  const contributorToName = useCallback(
    (contributor: string, index: number) => {
      // 同じ人が連続で発言している時は空文字
      if (
        (chatData?.[index - 1]?.contents.text && contributor === chatData?.[index - 1]?.contributor) ||
        Object.keys(supporterList).length === 0
      ) {
        return ''
      } else if (contributor === '0' && contactInfo) {
        return `${contactInfo.name} 様`
      } else {
        return supporterList[contributor].name
      }
    },
    [chatData, contactInfo, supporterList]
  )

  const formattedChatData = useMemo(() => {
    return chatData.map((chat, index) => {
      const { contributor, postTime, contents } = chat
      return {
        ...chat,
        contents: {
          ...contents,
          statusColor: typeof contents.newStatus !== 'undefined' ? statusList[contents.newStatus].color : undefined,
          statusLabel: typeof contents.newStatus !== 'undefined' ? statusList[contents.newStatus].label : undefined,
        },
        contributorName: contributorToName(contributor, index),
        formattedPostTime: format(postTime, 'H:mm'),
      }
    })
  }, [chatData, contributorToName])

  return <ChatList {...props} chatData={formattedChatData} />
})
