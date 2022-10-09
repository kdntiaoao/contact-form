import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import SendIcon from '@mui/icons-material/Send'
import { Box, Button, Container, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'

import { LoadingScreen } from 'components/molecules/LoadingScreen'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { addChat } from 'services/chat/addChat'
import { addContactInfo } from 'services/contact/addContactInfo'
import { Chat, ContactInfo } from 'types/data'

// eslint-disable-next-line react/display-name
const ConfirmPage: NextPage = memo(() => {
  const router = useRouter()
  const queryName = router.query.name as string | undefined
  const queryEmail = router.query.email as string | undefined
  const queryTel = router.query.tel as string | undefined
  const queryCategory = router.query.category as string | undefined
  const queryContents = router.query.contents as string | undefined
  const [loading, setLoading] = useState<boolean>(false)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const handleSubmit = useCallback(async () => {
    // 入力データがなければ処理をしない
    if (
      typeof queryName !== 'undefined' &&
      typeof queryEmail !== 'undefined' &&
      typeof queryTel !== 'undefined' &&
      typeof queryCategory !== 'undefined' &&
      typeof queryContents !== 'undefined'
    ) {
      const currentDate = Date.now()
      const contactInfo: ContactInfo = {
        name: queryName,
        email: queryEmail,
        tel: queryTel,
        category: queryCategory,
        contents: queryContents,
        supporter: '0',
        currentStatus: 0,
        submitTime: currentDate,
      }
      const chat: Chat = { contributor: '0', postTime: currentDate, contents: { text: queryContents } }

      try {
        setLoading(true)

        // お問い合わせ情報の保存(Firestore)
        const docId = await addContactInfo(contactInfo)

        console.log({ docId })

        // チャットデータの追加(Realtime Database)
        await addChat(docId, chat)

        // テスト用メールのときはメールを送信しない
        if (queryEmail.indexOf('@example.com') < 0) {
          await fetch('/api/send', {
            body: JSON.stringify({
              name: queryName,
              email: queryEmail,
              tel: queryTel,
              category: queryCategory,
              contents: queryContents,
              chatUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/contact/${docId}`,
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          })
        }

        await router.push(`/contact/${docId}`)
      } finally {
        setLoading(false)
      }
    }
  }, [queryCategory, queryContents, queryEmail, queryName, queryTel, router])

  useEffect(() => {
    // 入力されたデータがないとき、お問い合わせページへ遷移
    if (!queryName || !queryEmail || !queryTel || !queryCategory || !queryContents) router.push('/contact')
  }, [queryCategory, queryContents, queryEmail, queryName, queryTel, router])

  return (
    <DefaultLayout>
      <LoadingScreen loading={loading} />

      <Container maxWidth="md">
        <Box py={{ xs: 6, sm: 10 }}>
          <Box>
            <Typography variant={matches ? 'h4' : 'h5'} component="h1">
              お問い合わせ
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography variant="body1" component="p">
              入力内容をご確認の上「送信する」ボタンを押してください。
            </Typography>
          </Box>

          <Stack mt={{ xs: 4, sm: 6 }} spacing={6}>
            <TextField
              label="お名前"
              variant="standard"
              defaultValue={queryName}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              type="email"
              label="メールアドレス"
              variant="standard"
              defaultValue={queryEmail}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              type="tel"
              label="電話番号"
              variant="standard"
              defaultValue={queryTel}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="商品種別"
              variant="standard"
              defaultValue={queryCategory}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="お問い合わせ内容"
              variant="outlined"
              defaultValue={queryContents}
              fullWidth
              InputProps={{ readOnly: true }}
              multiline
            />

            <Stack
              direction={{ xs: 'column', sm: 'row-reverse' }}
              alignItems="center"
              spacing={2}
              sx={{ pt: { xs: 2, sm: 4 }, alignSelf: 'center', maxWidth: '100%' }}
            >
              <Box sx={{ width: 300 }}>
                <Button
                  type="button"
                  variant="contained"
                  size="large"
                  endIcon={<SendIcon />}
                  disabled={false}
                  onClick={handleSubmit}
                  fullWidth
                >
                  送信する
                </Button>
              </Box>
              <Box sx={{ width: 300 }}>
                <Link href={{ pathname: '/contact', query: router.query }} as="/contact">
                  <Button
                    component="a"
                    variant="outlined"
                    size="large"
                    endIcon={<EditIcon />}
                    disabled={false}
                    fullWidth
                  >
                    修正する
                  </Button>
                </Link>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </DefaultLayout>
  )
})

export default ConfirmPage
