import Link from 'next/link'
import { memo, ReactElement, useCallback, useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, IconButton, Slide, Toolbar, Typography, useScrollTrigger } from '@mui/material'

import { MenuDrawer } from 'components/molecules/MenuDrawer'

type HideOnScrollProps = {
  children: ReactElement
}

type HeaderProps = {
  account: string | undefined
  menuList: { text: string; url: string; onClick?: () => void }[][]
}

// eslint-disable-next-line react/display-name
const HideOnScroll = memo(({ children }: HideOnScrollProps) => {
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
})

// eslint-disable-next-line react/display-name
export const Header = memo(({ account, menuList }: HeaderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const handleDrawerToggle = useCallback(() => {
    setIsDrawerOpen((prev) => !prev)
  }, [])

  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Link href="/">
                <Typography variant="h6" component="h1">
                  Company
                </Typography>
              </Link>
            </Box>
            <IconButton size="large" color="inherit" aria-label="メニューを開く" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <MenuDrawer account={account} menuList={menuList} open={isDrawerOpen} onClose={handleDrawerToggle} />
    </>
  )
})
