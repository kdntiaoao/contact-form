import { HTMLInputTypeAttribute, memo } from 'react'

import { TextField } from '@mui/material'
import { Control, Controller, FieldError } from 'react-hook-form'

import { ContactFormInputsType } from 'types/input'

type Props = {
  control: Control<ContactFormInputsType>
  error: FieldError | undefined
  fieldReadonly: boolean
  label: string
  maxLength: number
  multiline?: boolean
  name: keyof ContactFormInputsType
  type?: HTMLInputTypeAttribute
}

// eslint-disable-next-line react/display-name
export const ContactTextField = memo(
  ({ control, error, fieldReadonly, label, maxLength, multiline = false, name, type = 'text' }: Props) => {
    const variant = multiline ? 'outlined' : 'standard'

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!error}
            fullWidth
            helperText={error?.message}
            label={label}
            maxRows={10}
            minRows={3}
            multiline={multiline}
            type={type}
            variant={variant}
            inputProps={{ maxLength: maxLength, readOnly: fieldReadonly }}
          />
        )}
      />
    )
  }
)
