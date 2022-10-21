import { memo } from 'react'

import { Box, Chip, Divider, Stack, Typography } from '@mui/material'

import { Chat } from 'components/molecules'
import { statusList } from 'components/organisms/presentations/StatusSelectArea'

type Props = {
  admin?: boolean
  chatData: {
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
}

// eslint-disable-next-line react/display-name
export const ChatList = memo(({ admin = false, chatData }: Props) => {
  return (
    <Stack spacing={2}>
      {chatData?.map(
        ({ contributor, contributorName, postTime, formattedPostTime, contents: { text, newStatus, date } }, index) => {
          if (formattedPostTime && typeof contributorName !== 'undefined' && typeof text !== 'undefined') {
            return (
              <Chat
                key={`${postTime}-${contributor}`}
                reverse={admin ? contributor !== '0' : contributor === '0'}
                contributor={contributorName}
                text={text}
                postTime={formattedPostTime === chatData[index + 1]?.formattedPostTime ? '' : formattedPostTime}
              />
            )
          }
          if (admin && typeof newStatus === 'number') {
            return (
              <Divider key={`${postTime}-${contributor}`}>
                <Chip label={statusList[newStatus].label} color={statusList[newStatus].color} variant="outlined" />
              </Divider>
            )
          }
          if (date) {
            return (
              <Box key={`${postTime}-${date}`} textAlign="center" pb={2}>
                <Typography color="gray">{date}</Typography>
              </Box>
            )
          }
        }
      )}
    </Stack>
  )
})
