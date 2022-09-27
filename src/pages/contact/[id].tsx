import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useEffect, useState } from 'react'

import { Box, Container, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { format } from 'date-fns'
import { signInAnonymously } from 'firebase/auth'
import { off, onValue, orderByChild, query, ref } from 'firebase/database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { animateScroll as scroll } from 'react-scroll'

import { auth, database } from '../../../firebase/client'
import { adminDatabase, adminDb } from '../../../firebase/server'

import { Chat } from 'components/molecules/Chat'
import { LoadingScreen } from 'components/molecules/LoadingScreen'
import { ChatFormContainer } from 'components/organisms/containers/ChatFormContainer'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { ChatData, ContactInfo, SupporterData } from 'types/data'

type ContactChatPageProps = {
  contactId: string | undefined
  contactInfo: ContactInfo | undefined
  chatData: ChatData | undefined
  supporterDataList: Record<string, SupporterData>
}

// eslint-disable-next-line react/display-name
const ContactChatPage: NextPage<ContactChatPageProps> = memo(
  ({ contactId, contactInfo, chatData: initialChatData, supporterDataList }: ContactChatPageProps) => {
    const router = useRouter()
    const [user, loading] = useAuthState(auth)
    const [chatData, setChatData] = useState<ChatData | undefined>(initialChatData)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'))

    useEffect(() => {
      if (!loading && !user) signInAnonymously(auth)
    }, [loading, user])

    useEffect(() => {
      const chatDataRef = query(ref(database, `chatDataList/${contactId}`), orderByChild('postTime'))

      if (user && contactId) {
        // 現在のチャットデータの取得
        onValue(chatDataRef, (snapshot) => {
          const chatData: ChatData = []
          snapshot.forEach((snap) => {
            const data = snap.val()
            chatData.push(data)
          })
          setChatData(chatData)
          scroll.scrollToBottom()
        })
      } else if (!loading) {
        console.log('user or id not exist')
      }

      const cleanup = () => {
        off(chatDataRef)
      }

      return cleanup
    }, [contactId, loading, user])

    if (router.isFallback || !user) return <LoadingScreen loading />

    return (
      <DefaultLayout>
        <Container maxWidth="md">
          <Box pt={{ xs: 6, sm: 10 }} pb={13}>
            <Box>
              <Typography variant={matches ? 'h4' : 'h5'} component="h1">
                お問い合わせチャット
              </Typography>
            </Box>
            <Box mt={1}>
              <Typography>
                商品についてご不明点やご質問等ございましたら、こちらのチャットにてお気軽にご相談ください。
              </Typography>
            </Box>
            <Stack mt={{ xs: 4, sm: 6 }} spacing={2}>
              {chatData?.map(
                ({ contributor, postTime, contents: { text } }, index) =>
                  typeof text !== 'undefined' &&
                  postTime && (
                    <Chat
                      key={postTime}
                      reverse={contributor === '0'}
                      contributor={
                        contributor === chatData[index - 1]?.contributor
                          ? ''
                          : contributor === '0' && contactInfo
                          ? `${contactInfo.name} 様`
                          : supporterDataList[contributor].name
                      }
                      text={text}
                      postTime={format(postTime, 'H:mm')}
                    />
                  )
              )}
            </Stack>
            {/* 入力エリア */}
            <Stack
              sx={{ bgcolor: '#fff', borderTop: '1px solid #aaa', position: 'fixed', bottom: 0, left: 0, right: 0 }}
            >
              <Container maxWidth="md">
                <Box py={2}>
                  {/* <ChatForm contributor="0" contactId={contactId} /> */}
                  <ChatFormContainer contributor="0" contactId={contactId} />
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
  const contactInfoListSnap = await adminDb.collection('contactInfo').get()
  const contactInfoList: Record<string, ContactInfo> = {}
  contactInfoListSnap.forEach((doc) => {
    const data = doc.data() as ContactInfo
    contactInfoList[doc.id] = data
  })

  const paths: { params: { id: string } }[] = contactInfoList
    ? Object.keys(contactInfoList).map((key) => ({ params: { id: key } }))
    : []

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const contactId = params?.id?.toString()
  if (contactId) {
    const contactInfoSnap = await adminDb.collection('contactInfo').doc(contactId).get()
    const contactInfo = await contactInfoSnap.data() // お問い合わせ情報

    const chatDataSnap = await adminDatabase.ref(`chatDataList/${contactId}`).once('value')
    const chatData: ChatData = [] // チャットデータ
    chatDataSnap.forEach((snap) => {
      chatData.push(snap.val())
    })

    const supporterDataSnap = await adminDb.collection('supporterData').get()
    const supporterDataList: Record<string, SupporterData> = {} // サポーターデータ
    supporterDataSnap.forEach((doc) => {
      const { name, email } = doc.data()
      if (typeof name === 'string' && typeof email === 'string') {
        supporterDataList[doc.id] = { name, email }
      }
    })

    return {
      props: { contactId, contactInfo, chatData, supporterDataList },
      revalidate: 60,
    }
  } else {
    console.log('contactId is empty.')
    return { props: {}, revalidate: 60 }
  }
}

export default ContactChatPage
