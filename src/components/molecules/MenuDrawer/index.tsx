import { Fragment, memo } from 'react'
import Link from 'next/link'
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  menuList: { text: string; url: string }[][]
  open: boolean
  onClose: () => void
}

// eslint-disable-next-line react/display-name
export const MenuDrawer = memo(({ menuList, open, onClose }: Props) => {
  console.log('rendering MenuDrawer')

  const drawer = (
    <div>
      <Toolbar>
        <Box ml="auto">
          <IconButton size="large" color="inherit" aria-label="メニューを閉じる" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {menuList.map((list) => (
        <Fragment key={list[0].text}>
          <Divider />
          <List>
            {list.map(({ text, url }) => (
              <ListItem key={text} disablePadding>
                <Link href={url}>
                  <ListItemButton component="a">
                    <ListItemText primary={text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Fragment>
      ))}
    </div>
  )

  return (
    <Box component="nav">
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { xs: '100%', sm: 320 } },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  )
})
