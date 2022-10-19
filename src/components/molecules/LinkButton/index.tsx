import Link from 'next/link'
import { memo } from 'react'

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { Button } from '@mui/material'

type Props = {
  href: string
  children: string
}

// eslint-disable-next-line react/display-name
export const LinkButton = memo(({ href, children }: Props) => {
  return (
    <Link href={href}>
      <Button component="a" fullWidth variant="text" endIcon={<ArrowForwardIosRoundedIcon />}>
        {children}
      </Button>
    </Link>
  )
})
