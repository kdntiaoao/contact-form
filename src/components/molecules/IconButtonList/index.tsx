import { memo, ReactNode } from 'react'

import { alpha, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material'

type Props = {
  list: {
    icon: ReactNode
    text: string
    onClick: () => void
  }[]
}

const CustomizedList = styled(List)(({ theme }) => ({
  '& .MuiListItemButton-root': {
    ...theme.shape,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
    color: theme.palette.primary.main,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
    color: 'primary.main',
  },
  '& .MuiTypography-root': {
    ...theme.typography.button,
  },
}))

// eslint-disable-next-line react/display-name
export const IconButtonList = memo(({ list }: Props) => {
  return (
    <CustomizedList>
      {list.map(({ icon, text, onClick }) => (
        <ListItem disablePadding dense key={text}>
          <ListItemButton onClick={onClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </CustomizedList>
  )
})
