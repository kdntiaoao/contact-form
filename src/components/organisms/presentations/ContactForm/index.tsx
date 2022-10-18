import { BaseSyntheticEvent, Dispatch, memo, SetStateAction, useCallback, useMemo } from 'react'

import EditRoundedIcon from '@mui/icons-material/EditRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { Autocomplete, Box, Button, Stack, TextField } from '@mui/material'
import { Control, Controller, FieldErrorsImpl } from 'react-hook-form'

import { ContactTextField } from 'components/molecules'
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
  ({ control, errors, fieldReadonly, isSubmitting, onSubmit, setFieldReadonly, setValue }: Props) => {
    const submitButtonText = useMemo(() => (!fieldReadonly ? '確認する' : '送信する'), [fieldReadonly])

    const handleClickFixButton = useCallback(() => setFieldReadonly(false), [setFieldReadonly])

    return (
      <Stack component="form" noValidate autoComplete="off" onSubmit={onSubmit} spacing={6}>
        <ContactTextField
          control={control}
          error={errors?.name}
          fieldReadonly={fieldReadonly}
          label="お名前"
          maxLength={16}
          name="name"
        />
        <ContactTextField
          control={control}
          error={errors?.email}
          fieldReadonly={fieldReadonly}
          label="メールアドレス"
          maxLength={200}
          name="email"
          type="email"
        />
        <ContactTextField
          control={control}
          error={errors?.tel}
          fieldReadonly={fieldReadonly}
          label="電話番号"
          maxLength={12}
          name="tel"
          type="tel"
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
              onChange={(_, newValue) => setValue('category', newValue)}
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
        <ContactTextField
          control={control}
          error={errors?.contents}
          fieldReadonly={fieldReadonly}
          label="お問い合わせ内容"
          maxLength={2000}
          multiline
          name="contents"
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
