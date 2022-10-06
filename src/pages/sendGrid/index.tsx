import { memo } from 'react'

import { Box, Typography } from '@mui/material'

import { DefaultLayout } from 'components/template/DefaultLayout'

// eslint-disable-next-line react/display-name
const SendGridPage = memo(() => {
  return (
    <DefaultLayout>
      <Box sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Typography variant="h2" textAlign="center">
          SendGrid
        </Typography>
      </Box>
    </DefaultLayout>
  )
})

export default SendGridPage
