import { memo } from 'react'

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'

type Props = {
  title: string
  description?: string
}

// eslint-disable-next-line react/display-name
export const PageHeading = memo(({ title, description }: Props) => {
  const matches = useMediaQuery(useTheme().breakpoints.up('sm'))

  return (
    <>
      <Box>
        <Typography variant={matches ? 'h4' : 'h5'} component="h2">
          {title}
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography>{description}</Typography>
      </Box>
    </>
  )
})
