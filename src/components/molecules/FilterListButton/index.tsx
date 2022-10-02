import { memo, MouseEvent, useCallback, useState } from 'react'

import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { IconButton, ListItem, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

type Props = {
  filterStatusList: { text: string; visible: boolean }[]
  // eslint-disable-next-line no-unused-vars
  changeFilterStatus: (target: number) => void
}

// eslint-disable-next-line react/display-name
export const FilterListButton = memo(({ filterStatusList, changeFilterStatus }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      <Tooltip title="フィルターリスト">
        <IconButton
          id="filter-list-button"
          aria-controls={open ? 'filter-list-button' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <FilterListRoundedIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="filter-list-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'filter-list-button' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          style: {
            width: 'min(400px, 60vw)',
          },
        }}
      >
        <ListItem>
          <Typography color={grey[400]}>フィルター</Typography>
        </ListItem>
        {filterStatusList.map(({ text, visible }, index) => (
          <MenuItem key={text} onClick={() => changeFilterStatus(index)}>
            <ListItemText>{text}</ListItemText>
            <IconButton>{visible ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}</IconButton>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
})
