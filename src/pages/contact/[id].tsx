import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useEffect, useState } from 'react'

import { Backdrop, Box, CircularProgress, Container, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import { signInAnonymously } from 'firebase/auth'
import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, db } from '../../../firebase/client'
import { adminDb } from '../../../firebase/server'

import { Chat } from 'components/molecules/Chat'
import { ChatForm } from 'components/organisms/ChatForm'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { ChatData, ContactInfo, SupporterData } from 'types/data'

type ContactChatPageProps = {
  contactId: string | undefined
  contactInfo: ContactInfo | undefined
  chatData: ChatData | undefined
  supporterData: SupporterData
}

// eslint-disable-next-line react/display-name
const ContactChatPage: NextPage<ContactChatPageProps> = memo(
  ({ contactId, contactInfo, chatData: initialChatData, supporterData }: ContactChatPageProps) => {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const [chatData, setChatData] = useState<ChatData | undefined>(initialChatData)

    useEffect(() => {
      if (!user) signInAnonymously(auth)
    }, [user])

    useEffect(() => {
      let unsub: Unsubscribe | undefined

      if (user && contactId) {
        // 現在のチャットデータの取得
        unsub = onSnapshot(doc(db, 'chatData', contactId), (doc) => {
          if (doc.exists()) {
            const chatData = doc.data() as ChatData
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
        <Container maxWidth="md">
          <Box pt={{ xs: 6, sm: 10 }} pb={13}>
            <Typography variant="h5">お問い合わせチャット</Typography>
            <Box mt={1}>
              <Typography>
                商品についてご不明点やご質問等ございましたら、こちらのチャットにてお気軽にご相談ください。
              </Typography>
            </Box>
            <Box mt={4}>
              <Stack spacing={2}>
                {chatData?.chatHistory?.map(
                  ({ contributor, postTime, contents: { text } }, index) =>
                    typeof text !== 'undefined' &&
                    postTime && (
                      <Chat
                        reverse={contributor === '0'}
                        contributor={
                          contributor === chatData?.chatHistory[index - 1]?.contributor
                            ? ''
                            : contributor === '0' && contactInfo
                            ? `${contactInfo.name} 様`
                            : supporterData[contributor].name
                        }
                        text={text}
                        postTime={format(postTime, 'H:mm')}
                      />
                    )
                )}
              </Stack>
            </Box>
            {/* 入力エリア */}
            <Stack
              sx={{ bgcolor: '#fff', borderTop: '1px solid #aaa', position: 'fixed', bottom: 0, left: 0, right: 0 }}
            >
              <Container maxWidth="md">
                <Box py={2}>
                  <ChatForm contributor="0" contactId={contactId} />
                </Box>
              </Container>
            </Stack>
          </Box>
        </Container>
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
  const contactInfo = contactInfoDoc?.exists ? contactInfoDoc?.data() : undefined // お問い合わせ情報
  const chatDataDoc = contactId ? await adminDb.collection('chatData').doc(contactId).get() : undefined
  const chatData = chatDataDoc?.exists ? chatDataDoc?.data() : undefined // チャットデータ
  const supporterDataSnapshot = await adminDb.collection('supporterData').get()
  const supporterData: SupporterData = {} // サポーターデータ
  supporterDataSnapshot.forEach((doc) => {
    const { name, email } = doc.data()
    if (typeof name === 'string' && typeof email === 'string') {
      supporterData[doc.id] = { name, email }
    }
  })

  return {
    props: { contactId, contactInfo, chatData, supporterData },
    revalidate: 10,
  }
}

export default ContactChatPage
