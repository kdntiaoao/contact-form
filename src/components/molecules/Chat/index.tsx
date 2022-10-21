import { memo, useMemo } from 'react'

import PersonIcon from '@mui/icons-material/Person'
import { Avatar, Box, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors'

type ContributorAvatarProps = {
  contributor: string
  reverse: boolean
  size?: 'small' | 'medium'
}

type Props = {
  reverse?: boolean
  text: string
  contributor: string
  postTime: string
}

// eslint-disable-next-line react/display-name
const ContributorAvatar = memo(({ contributor, reverse, size = 'medium' }: ContributorAvatarProps) => {
  const sizeNumber = useMemo(() => {
    if (size === 'small') {
      return 24
    } else {
      return undefined
    }
  }, [size])

  return (
    <Avatar
      alt={contributor}
      sx={{
        width: sizeNumber,
        height: sizeNumber,
        bgcolor: reverse ? 'primary.300' : grey[400],
        visibility: contributor === '' ? 'hidden' : 'visible',
      }}
    >
      <PersonIcon fontSize={size} />
    </Avatar>
  )
})

// eslint-disable-next-line react/display-name
export const Chat = memo(({ reverse = false, text, contributor, postTime }: Props) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Stack direction={reverse ? 'row-reverse' : 'row'} spacing={2}>
      {matches && <ContributorAvatar contributor={contributor} reverse={reverse} />}
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
