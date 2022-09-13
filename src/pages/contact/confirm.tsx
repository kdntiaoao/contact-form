import { Box, Container } from "@mui/material"

import { DefaultLayout } from "components/template/DefaultLayout"

const ConfirmPage = () => {
  return (
    <DefaultLayout>
      <Container>
        <Box py={{ xs: 6, sm: 10 }}>hello</Box>
      </Container>
    </DefaultLayout>
  )
}

export default ConfirmPage