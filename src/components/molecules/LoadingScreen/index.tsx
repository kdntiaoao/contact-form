import { memo } from 'react'

import { Backdrop, CircularProgress } from '@mui/material'

type Props = {
  loading: boolean
}

// eslint-disable-next-line react/display-name
export const LoadingScreen = memo(({ loading }: Props) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
})
