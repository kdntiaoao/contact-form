import { memo } from 'react'

import { Toolbar, Typography } from '@mui/material'

import { FilteredListButton } from '../FilteredListButton'

import { FilteredListType } from 'components/organisms/presentations/ContactTable'

type TableToolBarProps = {
  tableTitle?: string
  filteredList: FilteredListType
  // eslint-disable-next-line no-unused-vars
  changeFilteredStatus: (target: [number, number]) => void
}

// eslint-disable-next-line react/display-name
export const TableToolBar = memo(({ tableTitle, filteredList, changeFilteredStatus }: TableToolBarProps) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        {tableTitle}
      </Typography>

      <FilteredListButton filteredList={filteredList} changeFilteredStatus={changeFilteredStatus} />
    </Toolbar>
  )
})
