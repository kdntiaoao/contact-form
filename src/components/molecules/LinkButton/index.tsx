import Link from 'next/link'
import { memo, ReactNode } from 'react'

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { Button } from '@mui/material'

type Props = {
  href: string
  fullWidth?: boolean
  reverse?: boolean
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const LinkButton = memo(({ href, fullWidth = false, reverse = false, children }: Props) => {
  return (
    <Link href={href}>
      <Button
        component="a"
        fullWidth={fullWidth}
        variant="text"
        startIcon={reverse && <ArrowBackIosNewRoundedIcon />}
        endIcon={!reverse && <ArrowForwardIosRoundedIcon />}
      >
        {children}
      </Button>
    </Link>
  )
})
