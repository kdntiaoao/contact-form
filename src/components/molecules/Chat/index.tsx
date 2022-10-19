import { memo } from 'react'

import PersonIcon from '@mui/icons-material/Person'
import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

type Props = {
  reverse?: boolean
  text: string
  contributor: string
  postTime: string
}

// eslint-disable-next-line react/display-name
export const Chat = memo(({ reverse, text, contributor, postTime }: Props) => {
  return (
    <Stack direction={reverse ? 'row-reverse' : 'row'} spacing={2}>
      <Avatar
        alt={contributor}
        sx={{ bgcolor: reverse ? 'primary.300' : grey[400], visibility: contributor === '' ? 'hidden' : 'visible' }}
      >
        <PersonIcon />
      </Avatar>
      <Stack alignItems={reverse ? 'flex-end' : 'flex-start'} maxWidth="100%" flex={1}>
        <Box mb={1}>
          <Typography>{contributor}</Typography>
        </Box>
        <Paper elevation={0} sx={{ bgcolor: reverse ? 'primary.200' : grey[100], px: 2, py: 1, maxWidth: '80%' }}>
          <Typography whiteSpace="pre-wrap" sx={{ overflowWrap: 'break-word' }}>
            {text}
          </Typography>
        </Paper>
        <Box mt={1}>
          <Typography>{postTime}</Typography>
        </Box>
      </Stack>
    </Stack>
  )
})
