import { memo } from 'react'

import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material'

import { DefaultLayout } from 'components/template/DefaultLayout'

// eslint-disable-next-line react/display-name
const ContactListPage = memo(() => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <DefaultLayout>
      <Container>
        <Box py={{ xs: 6, sm: 10 }}>
          <Box>
            <Typography variant={matches ? 'h4' : 'h5'} component="h1">
              お問い合わせ一覧
            </Typography>
          </Box>

          <Box mt={{ xs: 4, sm: 6 }}>
            aaaaa aaaaa aaaaa aaaa aaaa aaaa aaaaa aaaaaaaaa aaaaaaaa a aaa aaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaa aaaaaa
            aaaaaaaaaa aaaaaaa aaa aa aaaa aaa aaaaa aaaaa aaaaa aaaa aaaa aaaa aaaaa aaaaaaaaa aaaaaaaa a aaa
            aaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaa aaaaaa aaaaaaaaaa aaaaaaa aaa aa aaaa aaa aaaaa aaaaa aaaaa aaaa aaaa
            aaaa aaaaa aaaaaaaaa aaaaaaaa a aaa aaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaa aaaaaa aaaaaaaaaa aaaaaaa aaa aa aaaa
            aaa aaaaa aaaaa aaaaa aaaa aaaa aaaa aaaaa aaaaaaaaa aaaaaaaa a aaa aaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaa
            aaaaaa aaaaaaaaaa aaaaaaa aaa aa aaaa aaa aaaaa aaaaa aaaaa aaaa aaaa aaaa aaaaa aaaaaaaaa aaaaaaaa a aaa
            aaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaa aaaaaa aaaaaaaaaa aaaaaaa aaa aa aaaa aaa aaaaa aaaaa aaaaa aaaa aaaa
            aaaa aaaaa aaaaaaaaa aaaaaaaa a aaa aaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaa aaaaaa aaaaaaaaaa aaaaaaa aaa aa aaaa
            aaa
          </Box>
        </Box>
      </Container>
    </DefaultLayout>
  )
})

export default ContactListPage
