import { memo, ReactNode } from 'react'

import {
  alpha,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
} from '@mui/material'

type Props = {
  horizontal?: boolean
  list: {
    text: string
    icon: ReactNode
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
    marginRight: 10,
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
export const IconButtonList = memo(({ horizontal = true, list }: Props) => {
  return horizontal ? (
    <Stack direction="row" spacing={1}>
      {list.map(({ icon, text, onClick }) => (
        <IconButton key={text} color="primary" size="large" onClick={onClick}>
          {icon}
        </IconButton>
      ))}
    </Stack>
  ) : (
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
