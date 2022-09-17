import { memo } from 'react'

import { Box, Container } from '@mui/material'

import { DefaultLayout } from 'components/template/DefaultLayout'

// eslint-disable-next-line react/display-name
const HomePage = memo(() => {
  return (
    <DefaultLayout>
      <Container>
        <Box py={{ xs: 6, sm: 10 }}>Top Page</Box>
      </Container>
    </DefaultLayout>
  )
})

export default HomePage
