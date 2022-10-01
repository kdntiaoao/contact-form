import { memo } from 'react'

import { Chip, Stack } from '@mui/material'

type Props = {
  direction?: 'row' | 'column'
  currentStatus: number | undefined
  disabled: boolean
  // eslint-disable-next-line no-unused-vars
  onClick: (newStatus: number) => void
}

export const statusList: { label: string; color: 'warning' | 'info' | 'success' }[] = [
  { label: '未対応', color: 'warning' },
  { label: '対応中', color: 'info' },
  { label: '対応完了', color: 'success' },
]

// eslint-disable-next-line react/display-name
export const StatusSelectArea = memo(({ direction = 'row', currentStatus, disabled, onClick }: Props) => {
  return (
    <>
      <Stack direction={direction} spacing={2}>
        {statusList.map(({ label, color }, index) => (
          <Chip
            key={label}
            label={label}
            color={color}
            variant={index === currentStatus ? 'filled' : 'outlined'}
            disabled={disabled}
            onClick={() => onClick(index)}
          />
        ))}
      </Stack>
    </>
  )
})
