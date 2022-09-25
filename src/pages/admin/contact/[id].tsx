import { NextPage } from 'next'
import { memo } from 'react'

import { Box, Typography } from '@mui/material'

// eslint-disable-next-line react/display-name
const ChatPage: NextPage = memo(() => {
  return (
    <Box>
      <Typography variant="h4">Chat Page</Typography>
    </Box>
  )
})

export default ChatPage
