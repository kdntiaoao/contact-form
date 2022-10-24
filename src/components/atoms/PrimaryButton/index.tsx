import { ReactNode } from 'react'

import { Button } from '@mui/material'

type Props = {
  backgroundColor: 'primary' | 'secondary'
  onClick: () => void
  children: ReactNode
}

export const PrimaryButton = ({ backgroundColor = 'primary', onClick, children }: Props) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
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
