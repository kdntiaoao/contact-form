import { Backdrop, CircularProgress } from '@mui/material'

type Props = {
  loading: boolean
}

export const LoadingScreen = ({ loading }: Props) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
