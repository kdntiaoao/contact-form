import { memo, ReactElement, useState } from 'react'
import { AppBar, Box, IconButton, Slide, Toolbar, Typography, useScrollTrigger } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { MenuDrawer } from 'components/molecules/MenuDrawer'

type HideOnScrollProps = {
  children: ReactElement
}

type HeaderProps = {
  menuList: { text: string; url: string }[][]
}

const HideOnScroll = ({ children }: HideOnScrollProps) => {
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

// eslint-disable-next-line react/display-name
export const Header = memo(({menuList}: HeaderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const handleDrawerToggle = () => {
    // console.log('handle drawer toggle!', isDrawerOpen)
    setIsDrawerOpen((prev) => !prev)
  }

  console.log('rendering Header')

  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div">
                Company
              </Typography>
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
