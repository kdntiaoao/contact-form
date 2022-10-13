import Link from 'next/link'
import { Fragment, memo } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material'

type MenuListProps = {
  account: string | undefined
  menuList: { text: string; url: string; onClick?: () => void }[][]
  onClose: () => void
}

type MenuDrawerProps = {
  account: string | undefined
  menuList: { text: string; url: string; onClick?: () => void }[][]
  open: boolean
  onClose: () => void
}

// eslint-disable-next-line react/display-name
const MenuList = memo(({ account, menuList, onClose }: MenuListProps) => {
  return (
    <div>
      <Toolbar>
        {account !== undefined && (
          <Box>
            <Avatar>{account.slice(0, 1)}</Avatar>
          </Box>
        )}
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
            {list.map(({ text, url, onClick }) => (
              <ListItem key={text} disablePadding>
                <Link href={url}>
                  <ListItemButton
                    component="a"
                    onClick={() => {
                      onClick?.()
                      onClose()
                    }}
                  >
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
})

// eslint-disable-next-line react/display-name
export const MenuDrawer = memo(({ account, menuList, open, onClose }: MenuDrawerProps) => {
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
        <MenuList {...{ account, menuList, onClose }} />
      </Drawer>
    </Box>
  )
})
