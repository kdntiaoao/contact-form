import { memo, useCallback, useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
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
    setError,
  } = useForm<FormInputs>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    (data) => {
      try {
        console.log('submit : ', data)
        // throw new Error('IDまたはパスワードが無効です')
      } catch (error) {
        if (error instanceof Error) {
          setError('email', {
            type: 'invalid',
            message: error.message,
          })
          setError('password', {
            type: 'invalid',
            message: error.message,
          })
        }
      }
    },
    [setError]
  )

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

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
                  autoComplete="username"
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
                <FormControl variant="standard">
                  <InputLabel htmlFor="password" error={!!errors.password}>
                    パスワード
                  </InputLabel>
                  <Input
                    {...field}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    error={!!errors.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    fullWidth
                  />
                  <FormHelperText id="password" error={!!errors.password}>
                    {errors?.password?.message}
                  </FormHelperText>
                </FormControl>
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
