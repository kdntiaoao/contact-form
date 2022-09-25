import Link from 'next/link'
import { memo } from 'react'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { format } from 'date-fns'

import { ContactInfo } from 'types/data'

type Data = Omit<ContactInfo, 'email'>

type HeadCell = {
  id: keyof Data
  label: string
}

type Props = {
  contactInfoArray: {
    name: string
    tel: string
    category: string
    contents: string
    supporter: string
    currentStatus: number
    submitTime: number
    key: string
  }[]
}

const headCells: HeadCell[] = [
  { id: 'currentStatus', label: '状況' },
  { id: 'name', label: '氏名' },
  { id: 'tel', label: '電話番号' },
  { id: 'category', label: '製品' },
  { id: 'submitTime', label: '日時' },
  { id: 'contents', label: 'お問い合わせ内容' },
  { id: 'supporter', label: '担当' },
]

// eslint-disable-next-line react/display-name
export const ContactTable = memo(({ contactInfoArray }: Props) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const newContactInfoArray = contactInfoArray.map(
    ({ name, tel, category, contents, supporter, currentStatus, submitTime, key }) => {
      return {
        name,
        tel,
        category,
        contents,
        formattedContents:
          matches && contents.length > 100
            ? contents.slice(0, 100) + '...'
            : !matches && contents.length > 50
            ? contents.slice(0, 50) + '...'
            : contents,
        supporter,
        currentStatus,
        submitTime: format(submitTime, matches ? 'M月d日 H:mm' : 'M/d'),
        key,
      }
    }
  )

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
          {newContactInfoArray.map(
            ({ currentStatus, name, tel, category, contents, formattedContents, submitTime, supporter, key }) => (
              <Link key={key} href={`/admin/contact/${key}`}>
                <TableRow tabIndex={0} role="link" hover sx={{ cursor: 'pointer' }}>
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
                    {/* 文字数が多い場合はもとの文章をツールチップで表示 */}
                    {contents === formattedContents ? (
                      <Typography>{formattedContents}</Typography>
                    ) : (
                      <Tooltip title={contents} arrow>
                        <Typography>{formattedContents}</Typography>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Typography noWrap>{supporter}</Typography>
                  </TableCell>
                </TableRow>
              </Link>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
