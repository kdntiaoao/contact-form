import { NextPage } from 'next'
import { useRouter } from 'next/router'

import SendIcon from '@mui/icons-material/Send'
import { Box, Button, Container, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import { DefaultLayout } from 'components/template/DefaultLayout'

type FormInputs = {
  name: string
  email: string
  tel: string
  category: string
  contents: string
}

const ContactPage: NextPage = () => {
  const router = useRouter()
  const queryName = router.query.name as string | undefined
  const queryEmail = router.query.email as string | undefined
  const queryTel = router.query.tel as string | undefined
  const queryCategory = router.query.category as string | undefined
  const queryContents = router.query.contents as string | undefined
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormInputs>({
    mode: 'onBlur',
    defaultValues: {
      name: queryName || '',
      email: queryEmail || 'メールアドレス',
      tel: queryTel || '012345689',
      category: queryCategory || 'A001',
      contents: queryContents || 'Hello, world',
    },
  })
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    router.push({ pathname: '/contact/confirm', query: data }, '/contact/confirm')
  }

  return (
    <>
      <DefaultLayout>
        <Container maxWidth="md">
          <Box py={{ xs: 6, sm: 10 }}>
            <Box mb={{ xs: 2, sm: 4 }}>
              <Typography variant={matches ? 'h4' : 'h5'} component="h1">
                お問い合わせ
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" component="p">
                商品に関するお問い合わせは下のフォームよりお願いいたします。
              </Typography>
            </Box>

            <Stack
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              mt={{ xs: 6, sm: 10 }}
              spacing={6}
            >
              <Box>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: '入力してください',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="お名前"
                      variant="standard"
                      error={!!errors.name}
                      helperText={errors?.name?.message}
                      fullWidth
                    />
                  )}
                />
              </Box>
              <Box>
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
              </Box>
              <Box>
                <Controller
                  name="tel"
                  control={control}
                  rules={{
                    required: '入力してください',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="tel"
                      label="電話番号"
                      variant="standard"
                      error={!!errors.tel}
                      helperText={errors?.tel?.message}
                      fullWidth
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="category"
                  control={control}
                  rules={{
                    required: '入力してください',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="tel"
                      label="商品種別"
                      variant="standard"
                      error={!!errors.category}
                      helperText={errors?.category?.message}
                      fullWidth
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="contents"
                  control={control}
                  rules={{
                    required: '入力してください',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="tel"
                      label="お問い合わせ内容"
                      variant="standard"
                      error={!!errors.contents}
                      helperText={errors?.contents?.message}
                      fullWidth
                      multiline
                    />
                  )}
                />
              </Box>

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
          </Box>
        </Container>
      </DefaultLayout>
    </>
  )
}

export default ContactPage
