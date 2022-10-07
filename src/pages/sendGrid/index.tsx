import { memo, useCallback, useEffect, useState } from 'react'

import { Box, Button, Typography } from '@mui/material'

import { DefaultLayout } from 'components/template/DefaultLayout'

// eslint-disable-next-line react/display-name
const SendGridPage = memo(() => {
  const [hello, setHello] = useState<string>()

  const sendMail = useCallback(async () => {
    await fetch('/api/send', {
      body: JSON.stringify({
        name: 'aaa',
        email: 'swim.free.nthm@gmail.com',
        tel: '080xxxxxxxx',
        category: 'A001',
        contents: 'aaaaa',
        chatUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }, [])

  const handleClick = useCallback(() => {
    sendMail()
  }, [sendMail])

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
      <Box py={6}>
        <Button onClick={handleClick}>Send Mail</Button>
      </Box>
    </DefaultLayout>
  )
})

export default SendGridPage
