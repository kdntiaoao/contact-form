import { NextPage } from 'next'

import { Box, Container } from '@mui/material'

import { DefaultLayout } from 'components/template/DefaultLayout'


const ContactChatPage: NextPage = () => {
  return (
    <DefaultLayout>
      <Container>
        <Box py={{ xs: 6, sm: 10 }}>hello, world</Box>
      </Container>
    </DefaultLayout>
  )
}

export default ContactChatPage
