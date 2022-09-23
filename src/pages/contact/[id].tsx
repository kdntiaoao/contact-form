import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useEffect, useState } from 'react'

import { Backdrop, Box, CircularProgress, Container, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { format } from 'date-fns'
import { signInAnonymously } from 'firebase/auth'
import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, db } from '../../../firebase/client'

import { Chat } from 'components/molecules/Chat'
import { ChatFormContainer } from 'components/organisms/containers/ChatFormContainer'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { getChatData } from 'services/chat/getChatData'
import { getContactInfo } from 'services/contact/getContactInfo'
import { getContactInfoList } from 'services/contact/getContactInfoList'
import { getSupporterDataList } from 'services/supporter/getSupporterDataList'
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
    const [user] = useAuthState(auth)
    const [chatData, setChatData] = useState<ChatData | undefined>(initialChatData)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'))

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
              {chatData?.chatHistory?.map(
                ({ contributor, postTime, contents: { text } }, index) =>
                  typeof text !== 'undefined' &&
                  postTime && (
                    <Chat
                      key={postTime}
                      reverse={contributor === '0'}
                      contributor={
                        contributor === chatData?.chatHistory[index - 1]?.contributor
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
  const contactInfoList = await getContactInfoList(true)
  const paths: { params: { id: string } }[] = contactInfoList
    ? Object.keys(contactInfoList).map((key) => ({ params: { id: key } }))
    : []

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const contactId = params?.id?.toString()
  if (contactId) {
    const contactInfo = await getContactInfo(contactId, true) // お問い合わせ情報
    const chatData = await getChatData(contactId, true) // チャットデータ
    const supporterDataList = await getSupporterDataList(true) // サポーターデータリスト

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
