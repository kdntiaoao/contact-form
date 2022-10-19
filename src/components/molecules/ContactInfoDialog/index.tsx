import { Fragment, memo } from 'react'

import { Box, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'

type Props = {
  list: { title: string; content: string }[]
  open: boolean
  handleClose: () => void
}

// eslint-disable-next-line react/display-name
export const ContactInfoDialog = memo(({ open, list, handleClose }: Props) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="contact-info-dialog-title">
      <DialogTitle id="contact-info-dialog-title">お客様情報</DialogTitle>
      <DialogContent>
        <Box columnGap={4} component="dl" display="grid" gridTemplateColumns="auto 1fr" rowGap={2}>
          {list.map(({ title, content }, index) => (
            <Fragment key={title}>
              {index !== 0 && <Divider sx={{ gridColumn: '1 / 3' }} />}
              <Typography component="dt" color="primary" fontWeight={600}>
                {title}
              </Typography>
              <Typography component="dd">{content}</Typography>
            </Fragment>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  )
})
