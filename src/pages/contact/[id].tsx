import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useEffect, useState } from 'react'

import { Backdrop, Box, CircularProgress, Container, Stack, Typography } from '@mui/material'
import { signInAnonymously } from 'firebase/auth'
import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, db } from '../../../firebase/client'
import { adminDb } from '../../../firebase/server'

import { ChatForm } from 'components/organisms/ChatForm'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { getContactInfo } from 'services/getContactData'
import { ChatData, ContactInfo } from 'types/data'

type ContactChatPageProps = {
  contactId: string | undefined
  contactInfo: ContactInfo | undefined
  chatData: ChatData | undefined
}

// eslint-disable-next-line react/display-name
const ContactChatPage: NextPage<ContactChatPageProps> = memo(
  ({ contactId, contactInfo, chatData: initialChatData }: ContactChatPageProps) => {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const [chatData, setChatData] = useState<ChatData | undefined>(initialChatData)

    useEffect(() => {
      if (!user)
        signInAnonymously(auth).then(() => {
          console.log({ user })
        })
    }, [user])

    useEffect(() => {
      let unsub: Unsubscribe | undefined

      if (user && contactId) {
        // お問い合わせ情報の取得
        getContactInfo(contactId).then((contactInfo) => {
          if (contactInfo) {
            // console.log('getContactInfo', ' => ', contactInfo)
          } else {
            console.log('contactInfo not exist')
          }
        })

        // 現在のチャットデータの取得
        unsub = onSnapshot(doc(db, 'chatData', contactId), (doc) => {
          if (doc.exists()) {
            const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server'
            const chatData = doc.data() as ChatData
            console.log(source, ' data: ', doc.data())
            setChatData(chatData)
          } else {
            console.log('chatData not exist')
          }
        })
      } else {
        console.log('user or id not exist')
      }

      const cleanup = () => {
        unsub?.()
      }

      return cleanup
    }, [contactId, user])

    if (router.isFallback) {
      return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )
    }

    return (
      <DefaultLayout>
        <Container>
          <Box py={{ xs: 6, sm: 10 }}>
            ID : {contactId || 'undefined'}
            <Typography variant="h5">お名前：{contactInfo?.name || 'undefined'}</Typography>
            <Typography variant="h5">メール：{contactInfo?.email || 'undefined'}</Typography>
            <Typography variant="h5">電話：{contactInfo?.tel || 'undefined'}</Typography>
            <Typography variant="h5">商品種別：{contactInfo?.category || 'undefined'}</Typography>
            <Typography variant="h5">送信時間：{contactInfo?.submitTime || 'undefined'}</Typography>
            <Box mt={4}>
              <Typography>
                現在の状態：{chatData?.currentStatus !== undefined ? chatData.currentStatus : 'undefined'}
              </Typography>
              {chatData?.chatHistory?.map(({ contributor, postTime, contents: { text, newStatus } }) => (
                <Box key={postTime} mt={4}>
                  <Typography>投稿者 : {contributor || 'undefined'}</Typography>
                  <Typography>投稿日時 : {postTime || 'undefined'}</Typography>
                  <Typography>投稿内容 : {text || newStatus || 'undefined'}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>

        {/* 入力エリア */}
        <Stack sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          <Container sx={{ border: '1px solid #aaa' }}>
            <Box px={4} py={2}>
              <ChatForm contributor="0" contactId={contactId} />
            </Box>
          </Container>
        </Stack>
      </DefaultLayout>
    )
  }
)

export const getStaticPaths: GetStaticPaths = async () => {
  const querySnapshot = await adminDb.collection('contactInfo').get()
  const paths: { params: { id: string } }[] = []
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      paths.push({ params: { id: doc.id } })
    })
  } else {
    console.log('querySnapshot is empty.')
  }

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const contactId: string | undefined = params?.id?.toString()
  const contactInfoDoc = contactId ? await adminDb.collection('contactInfo').doc(contactId).get() : undefined
  const contactInfo = contactInfoDoc?.exists ? contactInfoDoc?.data() : undefined
  const chatDataDoc = contactId ? await adminDb.collection('chatData').doc(contactId).get() : undefined
  const chatData = chatDataDoc?.exists ? chatDataDoc?.data() : undefined

  return {
    props: { contactId, contactInfo, chatData },
    revalidate: 10,
  }
}

export default ContactChatPage
