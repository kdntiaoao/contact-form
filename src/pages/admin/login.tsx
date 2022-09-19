import { memo, useCallback } from 'react'

import { Box, Button, Container, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { DefaultLayout } from 'components/template/DefaultLayout'

type FormInputs = {
  email: string
  password: string
}

// eslint-disable-next-line react/display-name
const LoginPage = memo(() => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormInputs>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const onSubmit: SubmitHandler<FormInputs> = useCallback((data) => {
    console.log('submit : ', data)
  }, [])

  return (
    <DefaultLayout>
      <Container maxWidth="md">
        <Box py={{ xs: 6, sm: 10 }}>
          <Box>
            <Typography variant={matches ? 'h4' : 'h5'} component="h1">
              ログイン
            </Typography>
          </Box>

          <Stack
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            mt={{ xs: 4, sm: 6 }}
            spacing={6}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: '入力してください',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="email"
                  label="メールアドレス"
                  variant="standard"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: '入力してください',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  autoComplete="current-password"
                  label="パスワード"
                  variant="standard"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  fullWidth
                />
              )}
            />

            <Box sx={{ width: 300, pt: { xs: 2, sm: 4 }, alignSelf: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting || isSubmitSuccessful}
                fullWidth
              >
                ログイン
              </Button>
            </Box>
          </Stack>
        </Box>
      </Container>
    </DefaultLayout>
  )
})

export default LoginPage
