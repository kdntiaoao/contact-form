import { useRouter } from 'next/router'
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
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { auth, db } from '../../../../firebase/client'

import { DefaultLayout } from 'components/template/DefaultLayout'
import { Supporter } from 'types/data'

type FormInputs = {
  name: string
  email: string
  password: string
}

// eslint-disable-next-line react/display-name
const SignupPage = memo(() => {
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<FormInputs>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    async (data) => {
      const { name, email, password } = data

      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user
          const supporter: Supporter = { name, email }
          await setDoc(doc(db, 'supporterData', user.uid), supporter)
          console.log('success signin : ', user)
          router.push('/admin/contact')
        })
        .catch((error) => {
          setError('name', {
            type: error.code,
            message: '入力された値は無効です',
          })
          setError('email', {
            type: error.code,
            message: '入力された値は無効です',
          })
          setError('password', {
            type: error.code,
            message: '入力された値は無効です',
          })
        })
    },
    [router, setError]
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
              サインアップ
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
              name="name"
              control={control}
              rules={{
                required: '入力してください',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="name"
                  autoComplete="username"
                  label="メールアドレス"
                  variant="standard"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  fullWidth
                />
              )}
            />
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
                サインアップ
              </Button>
            </Box>
          </Stack>
        </Box>
      </Container>
    </DefaultLayout>
  )
})

export default SignupPage
