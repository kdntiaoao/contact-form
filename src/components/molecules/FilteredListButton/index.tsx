import React, { Fragment, memo, MouseEvent, useCallback, useState } from 'react'

import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { Divider, IconButton, ListItem, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

import { FilteredListType } from 'components/organisms/presentations/ContactTable'

type Props = {
  filteredList: FilteredListType
  // eslint-disable-next-line no-unused-vars
  changeFilteredStatus: (target: [number, number]) => void
}

// eslint-disable-next-line react/display-name
export const FilteredListButton = memo(({ filteredList, changeFilteredStatus }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleButtonClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleMenuClose = useCallback(() => {
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
          onClick={handleButtonClick}
        >
          <FilterListRoundedIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="filter-list-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
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
        {filteredList.map((list, index) => [
          index > 0 && <Divider />,
          list.map(({ text, visible, checked }, childIndex) => (
            <MenuItem key={text} onClick={() => changeFilteredStatus([index, childIndex])}>
              <ListItemText>{text}</ListItemText>
              <IconButton>
                {typeof visible !== 'undefined' && (visible ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />)}
                {typeof checked !== 'undefined' &&
                  (checked ? <CheckBoxRoundedIcon /> : <CheckBoxOutlineBlankRoundedIcon />)}
              </IconButton>
            </MenuItem>
          )),
        ])}
      </Menu>
    </>
  )
})
