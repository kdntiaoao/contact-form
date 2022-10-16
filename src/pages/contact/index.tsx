import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useCallback, useMemo, useState } from 'react'

import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material'
import { SubmitHandler } from 'react-hook-form'

import { LoadingScreen } from 'components/molecules/LoadingScreen'
import { ContactFormContainer } from 'components/organisms/containers/ContactFormContainer'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { addChat } from 'services/chat/addChat'
import { addContactInfo } from 'services/contact/addContactInfo'
import { sendMail } from 'services/sendMail'
import { ContactFormInputsType } from 'types/input'

// eslint-disable-next-line react/display-name
const ContactPage: NextPage = memo(() => {
  const router = useRouter()
  const matches = useMediaQuery(useTheme().breakpoints.up('sm'))
  const [fieldsReadonly, setFieldReadonly] = useState<boolean>(false) // 入力フィールドのリードオンリーフラグ(確認時はtrue)
  const [loading, setLoading] = useState<boolean>(false)

  const formDescription = useMemo(
    () =>
      !fieldsReadonly
        ? '商品に関するお問い合わせは下のフォームよりお願いいたします。' // 入力時の説明
        : '入力内容をご確認の上「送信する」ボタンを押してください。', // 確認時の説明
    [fieldsReadonly]
  )

  const onSubmit: SubmitHandler<ContactFormInputsType> = useCallback(
    async (data) => {
      // 確認時
      if (fieldsReadonly) {
        const currentDate: number = Date.now()

        try {
          setLoading(true)

          // お問い合わせ情報の保存(Firestore)
          const docId = await addContactInfo({
            ...data,
            supporter: '0',
            currentStatus: 0,
            submitTime: currentDate,
            comment: { name: '', contents: '' },
          })
          // チャットデータの追加(Realtime Database)
          await addChat(docId, { contributor: '0', postTime: currentDate, contents: { text: data.contents } })
          // テスト用メールのときはメールを送信しない
          if (data.email.indexOf('@example.com') < 0) {
            await sendMail(data, docId)
          }

          await router.push(`/contact/${docId}`)
        } finally {
          setLoading(false)
        }
      } else {
        // 入力時
        setFieldReadonly(true)
      }
    },
    [fieldsReadonly, router]
  )

  return (
    <>
      <DefaultLayout>
        <LoadingScreen loading={loading} />

        <Container maxWidth="md">
          <Box py={{ xs: 6, sm: 10 }}>
            <Box>
              <Typography variant={matches ? 'h4' : 'h5'} component="h2">
                お問い合わせ
              </Typography>
            </Box>
            <Box mt={1}>
              <Typography variant="body1" component="p">
                {formDescription}
              </Typography>
            </Box>

            <Box mt={{ xs: 4, sm: 6 }}>
              <ContactFormContainer
                fieldReadonly={fieldsReadonly}
                onSubmit={onSubmit}
                setFieldReadonly={setFieldReadonly}
              />
            </Box>
          </Box>
        </Container>
      </DefaultLayout>
    </>
  )
})

export default ContactPage
