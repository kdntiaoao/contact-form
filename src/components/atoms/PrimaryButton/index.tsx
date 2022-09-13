import { ReactNode } from 'react'

import { Button } from '@mui/material'

type Props = {
  backgroundColor: 'primary' | 'secondary'
  children: ReactNode
}

export const PrimaryButton = ({ backgroundColor = 'primary', children }: Props) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: `${backgroundColor}.main`,
        '&:hover': {
          bgcolor: `${backgroundColor}.dark`,
        },
      }}
    >
      {children}
    </Button>
  )
}
