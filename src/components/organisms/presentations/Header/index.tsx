import Link from 'next/link'
import { memo, ReactElement, useCallback, useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, IconButton, Slide, Toolbar, Typography, useScrollTrigger } from '@mui/material'

import { MenuDrawer } from 'components/molecules/MenuDrawer'

type HideOnScrollProps = {
  children: ReactElement
}

type HeaderProps = {
  menuList: { text: string; url: string }[][]
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
export const Header = memo(({ menuList }: HeaderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const handleDrawerToggle = useCallback(() => {
    // console.log('handle drawer toggle!', isDrawerOpen)
    setIsDrawerOpen((prev) => !prev)
  }, [])

  console.log('rendering Header')

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
      <MenuDrawer menuList={menuList} open={isDrawerOpen} onClose={handleDrawerToggle} />
    </>
  )
})
