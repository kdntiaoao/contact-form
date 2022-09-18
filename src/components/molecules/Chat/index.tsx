import { Box, Paper, Stack, Typography } from '@mui/material'

type Props = {
  reverse?: boolean
  text: string
  contributor: string
  postTime: string
}

export const Chat = ({ reverse, text, contributor, postTime }: Props) => {
  return (
    <Stack alignItems={reverse ? 'flex-end' : 'flex-start'}>
      <Box mb={1}>
        <Typography>投稿者 : {contributor}</Typography>
      </Box>
      <Paper sx={{ bgcolor: 'primary.light', px: 2, py: 1, maxWidth: '80%' }}>
        <Typography sx={{ overflowWrap: 'break-word' }}>{text}</Typography>
      </Paper>
      <Box mt={1}>
        <Typography>{postTime}</Typography>
      </Box>
    </Stack>
  )
}
