import { memo } from 'react'

import { Chip, Container, Divider, Stack } from '@mui/material'

type Props = {
  currentStatus: number | undefined
  // eslint-disable-next-line no-unused-vars
  changeStatus: (newStatus: number) => void
}

const statusList: { label: string; color: 'warning' | 'info' | 'success' }[] = [
  { label: '未対応', color: 'warning' },
  { label: '対応中', color: 'info' },
  { label: '対応完了', color: 'success' },
]

// eslint-disable-next-line react/display-name
export const StatusSelectArea = memo(({ currentStatus, changeStatus }: Props) => {
  return (
    <>
      <Container maxWidth="md">
        <Stack direction="row" spacing={2} py={2}>
          {statusList.map(({ label, color }, index) => (
            <Chip
              key={label}
              label={label}
              color={color}
              variant={index === currentStatus ? 'filled' : 'outlined'}
              onClick={() => changeStatus(index)}
            />
          ))}
        </Stack>
      </Container>
      <Divider />
    </>
  )
})
