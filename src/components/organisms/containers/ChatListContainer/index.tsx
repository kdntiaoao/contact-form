import { memo, useCallback, useMemo } from 'react'

import { format, getTime, startOfDay } from 'date-fns'

import { ChatList } from 'components/organisms/presentations/ChatList'
import { ChatData, ContactInfo, SupporterList } from 'types/data'

type Props = {
  admin?: boolean
  chatData: ChatData
  contactInfo: ContactInfo
  supporterList: SupporterList
}

type FormattedChatData = {
  contributor?: string
  contributorName?: string
  formattedPostTime?: string
  postTime: number
  contents: {
    text?: string
    newStatus?: number
    date?: string
  }
}[]

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
    return chatData
      .map((chat, index) => {
        const { contributor, postTime } = chat
        return {
          ...chat,
          contributorName: contributorToName(contributor, index),
          formattedPostTime: format(postTime, 'H:mm'),
        }
      })
      .reduce<FormattedChatData>((array, currentValue, index) => {
        // 0時0分のタイムスタンプ
        const startTimestamp = getTime(startOfDay(currentValue.postTime))
        if (index === 0) {
          return [{ postTime: startTimestamp, contents: { date: format(startTimestamp, 'M月d日') } }, currentValue]
        }
        if (getTime(startOfDay(array[array.length - 1].postTime)) !== getTime(startOfDay(currentValue.postTime))) {
          return [
            ...array,
            { postTime: startTimestamp, contents: { date: format(startTimestamp, 'M月d日') } },
            currentValue,
          ]
        }
        return [...array, currentValue]
      }, [])
  }, [chatData, contributorToName])

  return <ChatList {...props} chatData={formattedChatData} />
})
