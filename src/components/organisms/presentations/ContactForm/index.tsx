import { BaseSyntheticEvent, memo } from 'react'

import SendIcon from '@mui/icons-material/Send'
import { Autocomplete, Box, Button, Stack, TextField } from '@mui/material'
import { Control, Controller, FieldErrorsImpl } from 'react-hook-form'

import { ContactFormInputsType } from 'types/input'

type Props = {
  control: Control<ContactFormInputsType>
  errors: FieldErrorsImpl<ContactFormInputsType>
  isSubmitting: boolean
  isSubmitSuccessful: boolean
  // eslint-disable-next-line no-unused-vars
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>
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
export const ContactForm = memo(({ control, errors, isSubmitting, isSubmitSuccessful, onSubmit, setValue }: Props) => {
  return (
    <Stack
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      // mt={{ xs: 4, sm: 6 }}
      spacing={6}
    >
      <Controller
        name="name"
        control={control}
        rules={{
          required: '入力してください',
          maxLength: { value: 16, message: '16文字以内にしてください' },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="お名前"
            variant="standard"
            error={!!errors.name}
            helperText={errors?.name?.message}
            inputProps={{ maxLength: 16 }}
            fullWidth
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: '入力してください',
          maxLength: { value: 200, message: '200文字以内にしてください' },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="email"
            label="メールアドレス"
            variant="standard"
            error={!!errors.email}
            helperText={errors?.email?.message}
            inputProps={{ maxLength: 200 }}
            fullWidth
          />
        )}
      />
      <Controller
        name="tel"
        control={control}
        rules={{
          required: '入力してください',
          maxLength: { value: 12, message: '12文字以内にしてください' },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="tel"
            label="電話番号"
            variant="standard"
            error={!!errors.tel}
            helperText={errors?.tel?.message}
            inputProps={{ maxLength: 12 }}
            fullWidth
          />
        )}
      />
      <Controller
        name="category"
        control={control}
        rules={{
          required: '入力してください',
        }}
        render={({ field: { name, value, onBlur } }) => (
          <Autocomplete
            autoHighlight
            disableClearable
            value={value}
            onChange={(_, newValue) => newValue && setValue('category', newValue)}
            onBlur={onBlur}
            options={categoryOptions}
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
        rules={{
          required: '入力してください',
          maxLength: { value: 2000, message: '2000文字以内にしてください' },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="お問い合わせ内容"
            variant="outlined"
            error={!!errors.contents}
            helperText={errors?.contents?.message}
            inputProps={{ maxLength: 2000 }}
            minRows={2}
            fullWidth
            multiline
          />
        )}
      />

      <Box sx={{ width: 300, pt: { xs: 2, sm: 4 }, alignSelf: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          endIcon={<SendIcon />}
          disabled={isSubmitting || isSubmitSuccessful}
          fullWidth
        >
          確認する
        </Button>
      </Box>
    </Stack>
  )
})
