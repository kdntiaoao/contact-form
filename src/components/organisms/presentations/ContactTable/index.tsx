import Link from 'next/link'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'

import {
  Avatar,
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

type Data = Omit<ContactInfo, 'email' | 'comment'>

type HeadCell = {
  id: keyof Data
  label: string
}

type Props = {
  tableTitle: string
  contactInfoArray: (Data & {
    supporterId: string
    supporterColor: string
    currentStatusInfo: {
      label: '未対応' | '対応中' | '対応完了'
      color: 'warning' | 'info' | 'success'
    }
    key: string
  })[]
  uid: string
}

export type FilteredListType = {
  text: string
  visible?: boolean
  checked?: boolean
}[][]

const headCells: HeadCell[] = [
  { id: 'currentStatus', label: '状況' },
  { id: 'name', label: '氏名' },
  { id: 'tel', label: '電話番号' },
  { id: 'category', label: '製品' },
  { id: 'submitTime', label: '日付' },
  { id: 'contents', label: 'お問い合わせ内容' },
  { id: 'supporter', label: '担当' },
]

const formatLimitText = (letterCount: number, text: string) => {
  // 与えられた文字列が指定された文字数以上の場合
  if (text.length > letterCount) {
    return text.slice(0, letterCount) + '...'
  } else {
    return text
  }
}

const getInitialLetter = (text: string) => {
  const initialLetter = text.slice(0, 1)
  return initialLetter
}

// eslint-disable-next-line react/display-name
export const ContactTable = memo(({ tableTitle, contactInfoArray, uid }: Props) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('lg'))
  const [filteredList, setFilteredList] = useState<FilteredListType>([
    [
      { text: '未対応', visible: true },
      { text: '対応中', visible: true },
      { text: '対応完了', visible: true },
    ],
    [{ text: '担当のみ表示', checked: false }],
  ])
  const [filteredContactInfoArray, setFilteredContactInfoArray] =
    useState<
      {
        name: string
        tel: string
        category: string
        contents: string
        formattedContents: string
        supporterId: string
        supporter: string
        supporterColor: string
        currentStatus: number
        submitTime: string
        currentStatusInfo: {
          label: '未対応' | '対応中' | '対応完了'
          color: 'warning' | 'info' | 'success'
        }
        key: string
      }[]
    >()

  const changeFilteredStatus = useCallback((target: [number, number]) => {
    setFilteredList((prev) => {
      const newList = [...prev]
      if (typeof newList[target[0]][target[1]].visible !== 'undefined') {
        newList[target[0]][target[1]].visible = !newList[target[0]][target[1]].visible
      }
      if (typeof newList[target[0]][target[1]].checked !== 'undefined') {
        newList[target[0]][target[1]].checked = !newList[target[0]][target[1]].checked
      }
      return newList
    })
  }, [])

  const initialArray = useMemo(
    () =>
      contactInfoArray.map(
        ({
          name,
          tel,
          category,
          contents,
          supporter,
          supporterId,
          supporterColor,
          currentStatus,
          submitTime,
          currentStatusInfo,
          key,
        }) => {
          return {
            name,
            tel,
            category,
            contents,
            formattedContents: formatLimitText(matches ? 100 : 50, contents),
            supporter,
            supporterId,
            supporterColor,
            currentStatus,
            submitTime: format(submitTime, matches ? 'M月d日 H:mm' : 'MM/dd'),
            currentStatusInfo,
            key,
          }
        }
      ),
    [contactInfoArray, matches]
  )

  useEffect(() => {
    setFilteredContactInfoArray(initialArray)
  }, [initialArray])

  useEffect(() => {
    setFilteredContactInfoArray(
      [...initialArray]
        .filter(({ currentStatus }) => filteredList[0][currentStatus].visible)
        .filter(({ supporterId }) => !filteredList[1][0].checked || supporterId === uid)
    )
  }, [filteredList, initialArray, uid])

  return (
    <>
      <TableToolBar tableTitle={tableTitle} filteredList={filteredList} changeFilteredStatus={changeFilteredStatus} />

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
              ({ name, tel, category, contents, formattedContents, submitTime, supporter, supporterColor, currentStatusInfo, key }) => (
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
                      {supporter === '-' || matches ? (
                        <Typography noWrap>{supporter}</Typography>
                      ) : (
                        <Avatar sx={{bgcolor: supporterColor}}>{getInitialLetter(supporter)}</Avatar>
                      )}
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
