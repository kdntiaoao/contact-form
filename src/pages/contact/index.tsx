import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useCallback } from 'react'

import SendIcon from '@mui/icons-material/Send'
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import { DefaultLayout } from 'components/template/DefaultLayout'

type FormInputs = {
  name: string
  email: string
  tel: string
  category: string
  contents: string
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
const ContactPage: NextPage = memo(() => {
  const router = useRouter()
  const queryName = router.query.name?.toString()
  const queryEmail = router.query.email?.toString()
  const queryTel = router.query.tel?.toString()
  const queryCategory = router.query.category?.toString()
  const queryContents = router.query.contents?.toString()
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormInputs>({
    mode: 'onBlur',
    defaultValues: {
      // name: queryName,
      // email: queryEmail,
      // tel: queryTel,
      // category: queryCategory,
      // contents: queryContents,
      name: queryName || '田中太郎',
      email: queryEmail || 'sample@example.com',
      tel: queryTel || '08000121234',
      category: queryCategory || 'A001',
      contents:
        queryContents ||
        '私は当時しばしばどんな講演院というのの以上と信じうです。けっして生涯を落第者はよほどその修養あるただけとするばみますのは意味するだないが、あくまでには退けなかっましたない。個人に明らめでつもりはまあ今日にまあましありた。正しく向さんが関係道少し手続きに散らかすう各人その廃墟私か影響がという今品評ならたですんて、このたくさんもあなたか一般本にたべが、岡田さんの事に肉のそれにとにかくご想像としがあなた骨とご撲殺が甘んじように断然お運動をいでなけれと、たといよし運動が掴むたばくれたものが減っでだ。もっともそれから大力で賑わすのはそう窮屈としなて、その角度にはありなてという世の中を認めば来ですます。',
    },
  })
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    (data) => {
      router.push({ pathname: '/contact/confirm', query: data }, '/contact/confirm')
    },
    [router]
  )

  return (
    <>
      <DefaultLayout>
        <Container maxWidth="md">
          <Box py={{ xs: 6, sm: 10 }}>
            <Box>
              <Typography variant={matches ? 'h4' : 'h5'} component="h1">
                お問い合わせ
              </Typography>
            </Box>
            <Box mt={1}>
              <Typography variant="body1" component="p">
                商品に関するお問い合わせは下のフォームよりお願いいたします。
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
                render={({ field: {name, value} }) => (
                  <Autocomplete
                    autoHighlight
                    disableClearable
                    value={value}
                    onChange={(_, newValue) => newValue && setValue('category', newValue)}
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
          </Box>
        </Container>
      </DefaultLayout>
    </>
  )
})

export default ContactPage
