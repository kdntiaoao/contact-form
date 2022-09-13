import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Box, Container } from '@mui/material'

import { DefaultLayout } from 'components/template/DefaultLayout'

const ContactChatPage: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    console.log(router.query)
  }, [router])

  return (
    <DefaultLayout>
      <Container>
        <Box py={{ xs: 6, sm: 10 }}>hello</Box>
      </Container>
    </DefaultLayout>
  )
}

export default ContactChatPage
