import { memo } from 'react'

import { Toolbar, Typography } from '@mui/material'

import { FilterListButton } from '../FilterListButton'

type TableToolBarProps = {
  tableTitle?: string
  filteredStatusList: { text: string; visible: boolean }[]
  // eslint-disable-next-line no-unused-vars
  changeFilteredStatus: (target: number) => void
}

// eslint-disable-next-line react/display-name
export const TableToolBar = memo(({ tableTitle, filteredStatusList, changeFilteredStatus }: TableToolBarProps) => {
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

      <FilterListButton filterStatusList={filteredStatusList} changeFilterStatus={changeFilteredStatus} />
    </Toolbar>
  )
})
