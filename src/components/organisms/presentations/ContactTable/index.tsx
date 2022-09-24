import { memo } from 'react'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import { HeadCell } from 'components/organisms/containers/ContactTableContainer'

type Props = {
  headCells: HeadCell[]
  contactInfoArray: {
    name: string
    tel: string
    category: string
    contents: string
    supporter: string
    currentStatus: number
    submitTime: string
    key: string
  }[]
}

// eslint-disable-next-line react/display-name
export const ContactTable = memo(({ headCells, contactInfoArray }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="お問い合わせ一覧表">
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id} align="center">
                <Typography noWrap>{headCell.label}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {contactInfoArray.map(({ currentStatus, name, tel, category, contents, submitTime, supporter, key }) => (
            <TableRow key={key}>
              <TableCell align="center">
                <Typography noWrap>{currentStatus}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography noWrap>{name}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography noWrap>{tel}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography noWrap>{category}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography noWrap>{submitTime}</Typography>
              </TableCell>
              <TableCell sx={{ minWidth: 300 }}>
                <Typography>{contents}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography noWrap>{supporter}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
