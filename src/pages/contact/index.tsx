import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useCallback } from 'react'

import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { SubmitHandler } from 'react-hook-form'

import { ContactFormContainer } from 'components/organisms/containers/ContactFormContainer'
import { DefaultLayout } from 'components/template/DefaultLayout'

type FormInputs = {
  name: string
  email: string
  tel: string
  category: string
  contents: string
}

// eslint-disable-next-line react/display-name
const ContactPage: NextPage = memo(() => {
  const router = useRouter()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    (data) => {
      router.push({ pathname: '/contact/confirm', query: data }, '/contact/confirm')
    },
    [router]
  )

  return (
    <>
      <DefaultLayout>
        <Container maxWidth="md">
          <Box py={{ xs: 6, sm: 10 }}>
            <Box>
              <Typography variant={matches ? 'h4' : 'h5'} component="h1">
                お問い合わせ
              </Typography>
            </Box>
            <Box mt={1}>
              <Typography variant="body1" component="p">
                商品に関するお問い合わせは下のフォームよりお願いいたします。
              </Typography>
            </Box>

            <Box>
              <ContactFormContainer onSubmit={onSubmit} />
            </Box>
          </Box>
        </Container>
      </DefaultLayout>
    </>
  )
})

export default ContactPage
