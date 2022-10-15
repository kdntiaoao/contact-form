import { BaseSyntheticEvent, Dispatch, memo, SetStateAction, useCallback, useMemo } from 'react'

import EditRoundedIcon from '@mui/icons-material/EditRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { Autocomplete, Box, Button, Stack, TextField } from '@mui/material'
import { Control, Controller, FieldErrorsImpl } from 'react-hook-form'

import { ContactFormInputsType } from 'types/input'

type Props = {
  control: Control<ContactFormInputsType>
  errors: FieldErrorsImpl<ContactFormInputsType>
  fieldReadonly: boolean
  isSubmitting: boolean
  // eslint-disable-next-line no-unused-vars
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>
  setFieldReadonly: Dispatch<SetStateAction<boolean>>
  // eslint-disable-next-line no-unused-vars
  setValue: (key: keyof ContactFormInputsType, value: ContactFormInputsType[typeof key]) => void
}

const categoryOptions = [
  'A001',
  'A002',
  'A003',
  'A004',
  'A005',
  'A006',
  'A007',
  'A008',
  'A009',
  'A010',
  'B001',
  'B002',
  'B003',
  'B004',
]

// eslint-disable-next-line react/display-name
export const ContactForm = memo(
  ({
    control,
    errors,
    fieldReadonly,
    isSubmitting,
    onSubmit,
    setFieldReadonly,
    setValue,
  }: Props) => {
    const submitButtonText = useMemo(() => (!fieldReadonly ? '確認する' : '送信する'), [fieldReadonly])

    const handleClickFixButton = useCallback(() => setFieldReadonly(false), [setFieldReadonly])

    return (
      <Stack component="form" noValidate autoComplete="off" onSubmit={onSubmit} spacing={6}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="お名前"
              variant="standard"
              error={!!errors.name}
              helperText={errors?.name?.message}
              inputProps={{ maxLength: 16, readOnly: fieldReadonly }}
              fullWidth
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              label="メールアドレス"
              variant="standard"
              error={!!errors.email}
              helperText={errors?.email?.message}
              inputProps={{ maxLength: 200, readOnly: fieldReadonly }}
              fullWidth
            />
          )}
        />
        <Controller
          name="tel"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="tel"
              label="電話番号"
              variant="standard"
              error={!!errors.tel}
              helperText={errors?.tel?.message}
              inputProps={{ maxLength: 12, readOnly: fieldReadonly }}
              fullWidth
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field: { name, value, onBlur } }) => (
            <Autocomplete
              autoHighlight
              disableClearable
              readOnly={fieldReadonly}
              options={categoryOptions}
              value={value}
              onChange={(_, newValue) => newValue && setValue('category', newValue)}
              onBlur={onBlur}
              isOptionEqualToValue={(option, value) => value === '' || option === value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name={name}
                  label="商品種別"
                  variant="standard"
                  error={!!errors.category}
                  helperText={errors?.category?.message}
                  fullWidth
                />
              )}
            />
          )}
        />
        <Controller
          name="contents"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="お問い合わせ内容"
              variant="outlined"
              error={!!errors.contents}
              helperText={errors?.contents?.message}
              inputProps={{ maxLength: 2000, readOnly: fieldReadonly }}
              minRows={2}
              fullWidth
              multiline
            />
          )}
        />

        <Stack
          direction={{ xs: 'column', sm: 'row-reverse' }}
          alignItems="center"
          spacing={2}
          sx={{ pt: { xs: 2, sm: 4 }, alignSelf: 'center', maxWidth: '100%' }}
        >
          <Box sx={{ width: 300 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={<SendRoundedIcon />}
              disabled={isSubmitting}
              fullWidth
            >
              {submitButtonText}
            </Button>
          </Box>
          {fieldReadonly && (
            <Box sx={{ width: 300 }}>
              <Button
                fullWidth
                disabled={isSubmitting}
                size="large"
                type="button"
                variant="outlined"
                onClick={handleClickFixButton}
                endIcon={<EditRoundedIcon />}
              >
                修正する
              </Button>
            </Box>
          )}
        </Stack>
      </Stack>
    )
  }
)
