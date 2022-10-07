import { memo, useEffect, useState } from 'react'

import { Box, Typography } from '@mui/material'

import { DefaultLayout } from 'components/template/DefaultLayout'

// eslint-disable-next-line react/display-name
const SendGridPage = memo(() => {
  const [hello, setHello] = useState<string>()

  useEffect(() => {
    const fetchHello = async () => {
      const res = await fetch('/api/hello')
      const json = await res.json()
      setHello(json.name)
    }
    fetchHello()
  }, [])

  return (
    <DefaultLayout>
      <Box py={6}>
        <Typography variant="h2" textAlign="center">
          SendGrid
        </Typography>
      </Box>
      <Box py={6}>
        <Typography variant="h2" textAlign="center">
          {hello || 'Error!!!'}
        </Typography>
      </Box>
    </DefaultLayout>
  )
})

export default SendGridPage
