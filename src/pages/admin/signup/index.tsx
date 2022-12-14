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
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { auth } from '../../../../firebase/client'

import { DefaultLayout } from 'components/template/DefaultLayout'
import { addSupporter } from 'services/supporter/addSupporter'
import { Supporter } from 'types/data'
import { generateRandomColor } from 'utils/generateRandomColor'

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
          const color = generateRandomColor()

          const supporter: Supporter = { name, email, color }
          await addSupporter(user.uid, supporter)

          await router.push('/admin/contact')
        })
        .catch((error) => {
          console.log(error)
          setError('name', {
            type: error.code,
            message: '?????????????????????????????????',
          })
          setError('email', {
            type: error.code,
            message: '?????????????????????????????????',
          })
          setError('password', {
            type: error.code,
            message: '?????????????????????????????????',
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
              ??????????????????
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
                required: '????????????????????????',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="name"
                  autoComplete="username"
                  label="?????????"
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
                required: '????????????????????????',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="email"
                  autoComplete="username"
                  label="?????????????????????"
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
                required: '????????????????????????',
              }}
              render={({ field }) => (
                <FormControl variant="standard">
                  <InputLabel htmlFor="password" error={!!errors.password}>
                    ???????????????
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
                ??????????????????
              </Button>
            </Box>
          </Stack>
        </Box>
      </Container>
    </DefaultLayout>
  )
})

export default SignupPage
