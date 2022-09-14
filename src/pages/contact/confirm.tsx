import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import SendIcon from '@mui/icons-material/Send'
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { signInAnonymously } from 'firebase/auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, db } from '../../../firebase/client'

import { DefaultLayout } from 'components/template/DefaultLayout'
import { Chat, ChatData, ContactInfo } from 'types/data'

const ConfirmPage = () => {
  const router = useRouter()
  const queryName = router.query.name as string | undefined
  const queryEmail = router.query.email as string | undefined
  const queryTel = router.query.tel as string | undefined
  const queryCategory = router.query.category as string | undefined
  const queryContents = router.query.contents as string | undefined
  const [loading, setLoading] = useState<boolean>(false)
  const [user] = useAuthState(auth)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const handleSubmit = async () => {
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
        submitTime: currentDate,
      }
      const chat: Chat = { contributor: '0', postTime: currentDate, contents: { text: queryContents } }
      const chatData: ChatData = { chatHistory: [chat], currentStatus: 0 }

      try {
        setLoading(true)
        if (!user) await signInAnonymously(auth)
        const docRef = await addDoc(collection(db, 'contactInfo'), contactInfo)
        await setDoc(doc(db, 'chatData', docRef.id), chatData)
        router.push(`/contact/${docRef.id}`)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEdit = () => {
    router.push({ pathname: '/contact', query: router.query }, '/contact')
  }

  useEffect(() => {
    // 入力されたデータがないとき、お問い合わせページへ遷移
    if (!queryName) router.push('/contact')
  }, [queryName, router])

  return (
    <DefaultLayout>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container>
        <Box py={{ xs: 6, sm: 10 }}>
          <Box mb={{ xs: 2, sm: 4 }}>
            <Typography variant={matches ? 'h4' : 'h5'} component="h1">
              お問い合わせ
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" component="p">
              入力内容をご確認の上「送信する」ボタンを押してください。
            </Typography>
          </Box>

          <Stack mt={{ xs: 6, sm: 10 }} spacing={6}>
            <Box>
              <TextField
                label="お名前"
                variant="standard"
                defaultValue={queryName}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Box>
            <Box>
              <TextField
                type="email"
                label="メールアドレス"
                variant="standard"
                defaultValue={queryEmail}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Box>
            <Box>
              <TextField
                type="tel"
                label="電話番号"
                variant="standard"
                defaultValue={queryTel}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Box>
            <Box>
              <TextField
                label="商品種別"
                variant="standard"
                defaultValue={queryCategory}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Box>
            <Box>
              <TextField
                label="お問い合わせ内容"
                variant="standard"
                defaultValue={queryContents}
                fullWidth
                InputProps={{ readOnly: true }}
                multiline
              />
            </Box>

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
                <Button
                  type="button"
                  variant="outlined"
                  size="large"
                  endIcon={<EditIcon />}
                  disabled={false}
                  onClick={handleEdit}
                  fullWidth
                >
                  修正する
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </DefaultLayout>
  )
}

export default ConfirmPage
