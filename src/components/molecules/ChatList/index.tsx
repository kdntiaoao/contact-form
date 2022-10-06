import { memo, useCallback } from 'react'

import { Chip, Divider, Stack } from '@mui/material'
import { format } from 'date-fns'

import { Chat } from '../Chat'

import { statusList } from 'components/organisms/presentations/StatusSelectArea'
import { ChatData, ContactInfo, SupporterData } from 'types/data'

type Props = {
  admin?: boolean
  chatData: ChatData
  contactInfo: ContactInfo
  supporterDataList: SupporterData
}

// eslint-disable-next-line react/display-name
export const ChatList = memo(({ admin = false, chatData, contactInfo, supporterDataList }: Props) => {
  const contributorToName = useCallback(
    (contributor: string, index: number) => {
      if (chatData?.[index - 1]?.contents.text && contributor === chatData?.[index - 1]?.contributor) {
        return ''
      } else if (contributor === '0' && contactInfo) {
        return `${contactInfo.name} 様`
      } else {
        return supporterDataList[contributor].name
      }
    },
    [chatData, contactInfo, supporterDataList]
  )

  return (
    <Stack spacing={2}>
      {chatData?.map(({ contributor, postTime, contents: { text, newStatus } }, index) =>
        postTime && typeof text !== 'undefined' ? (
          <Chat
            key={postTime}
            reverse={admin ? contributor !== '0' : contributor === '0'}
            contributor={contributorToName(contributor, index)}
            text={text}
            postTime={format(postTime, 'H:mm')}
          />
        ) : (
          admin &&
          typeof newStatus === 'number' && (
            <Divider key={postTime}>
              <Chip label={statusList[newStatus].label} color={statusList[newStatus].color} variant="outlined" />
            </Divider>
          )
        )
      )}
    </Stack>
  )
})
