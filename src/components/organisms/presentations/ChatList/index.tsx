import { Fragment, memo } from 'react'

import { Chip, Divider, Stack } from '@mui/material'

import { Chat } from 'components/molecules'
import { statusList } from 'components/organisms/presentations/StatusSelectArea'
import { Chat as ChatType } from 'types/data'

type Props = {
  admin?: boolean
  chatData: (ChatType & {
    contributorName: string
    formattedPostTime: string
  })[]
}

// eslint-disable-next-line react/display-name
export const ChatList = memo(({ admin = false, chatData }: Props) => {
  return (
    <Stack spacing={2}>
      {chatData?.map(({ contributor, contributorName, postTime, formattedPostTime, contents: { text, newStatus } }) => (
        <Fragment key={`${postTime}-${contributor}`}>
          {typeof text !== 'undefined' ? (
            <Chat
              reverse={admin ? contributor !== '0' : contributor === '0'}
              contributor={contributorName}
              text={text}
              postTime={formattedPostTime}
            />
          ) : (
            admin &&
            typeof newStatus === 'number' && (
              <Divider>
                <Chip label={statusList[newStatus].label} color={statusList[newStatus].color} variant="outlined" />
              </Divider>
            )
          )}
        </Fragment>
      ))}
    </Stack>
  )
})
