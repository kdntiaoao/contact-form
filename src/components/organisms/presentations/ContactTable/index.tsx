import Link from 'next/link'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'

import {
  Chip,
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

import { TableToolBar } from 'components/molecules/TableToolBar'
import { ContactInfo } from 'types/data'

type Data = Omit<ContactInfo, 'email'>

type HeadCell = {
  id: keyof Data
  label: string
}

type Props = {
  tableTitle: string
  contactInfoArray: (Data & {
    currentStatusInfo: {
      label: '未対応' | '対応中' | '対応完了'
      color: 'warning' | 'info' | 'success'
    }
    key: string
  })[]
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
export const ContactTable = memo(({ tableTitle, contactInfoArray }: Props) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const [filteredStatusList, setFilteredStatusList] = useState<{ text: string; visible: boolean }[]>([
    { text: '未対応', visible: true },
    { text: '対応中', visible: true },
    { text: '対応完了', visible: true },
  ])
  const [filteredContactInfoArray, setFilteredContactInfoArray] =
    useState<
      {
        name: string
        tel: string
        category: string
        contents: string
        formattedContents: string
        supporter: string
        currentStatus: number
        submitTime: string
        currentStatusInfo: {
          label: '未対応' | '対応中' | '対応完了'
          color: 'warning' | 'info' | 'success'
        }
        key: string
      }[]
    >()

  const formatLimitText = useCallback(
    (text: string) => {
      if (matches && text.length > 100) {
        return text.slice(0, 100) + '...'
      } else if (!matches && text.length > 50) {
        return text.slice(0, 50) + '...'
      } else {
        return text
      }
    },
    [matches]
  )

  const changeFilteredStatus = useCallback((target: number) => {
    setFilteredStatusList((prev) => {
      const newList = [...prev]
      newList[target].visible = !newList[target].visible
      return newList
    })
  }, [])

  const initialArray = useMemo(() => (
    contactInfoArray.map(
      ({ name, tel, category, contents, supporter, currentStatus, submitTime, currentStatusInfo, key }) => {
        return {
          name,
          tel,
          category,
          contents,
          formattedContents: formatLimitText(contents),
          supporter,
          currentStatus,
          submitTime: format(submitTime, matches ? 'M月d日 H:mm' : 'M/d'),
          currentStatusInfo,
          key,
        }
      }
    )
  ), [contactInfoArray, formatLimitText, matches])

  useEffect(() => {
    setFilteredContactInfoArray(initialArray)
  }, [contactInfoArray, formatLimitText, initialArray, matches])

  useEffect(() => {
    setFilteredContactInfoArray(
      [...initialArray].filter(({ currentStatus }) => filteredStatusList[currentStatus].visible)
    )
  }, [filteredStatusList, initialArray])

  return (
    <>
      <TableToolBar
        tableTitle={tableTitle}
        filteredStatusList={filteredStatusList}
        changeFilteredStatus={changeFilteredStatus}
      />

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
            {filteredContactInfoArray?.map(
              ({ name, tel, category, contents, formattedContents, submitTime, supporter, currentStatusInfo, key }) => (
                <Link key={key} href={`/admin/contact/${key}`}>
                  <TableRow tabIndex={0} role="link" hover sx={{ cursor: 'pointer' }}>
                    <TableCell align="center">
                      <Chip label={currentStatusInfo.label} color={currentStatusInfo.color} variant="outlined" />
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
    </>
  )
})
