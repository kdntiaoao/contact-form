import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useCallback } from 'react'

import { Box, Container, Stack } from '@mui/material'
import { animateScroll as scroll } from 'react-scroll'

import { adminDatabase, adminDb } from '../../../firebase/server'

import { ChatList, LoadingScreen, PageHeading } from 'components/molecules'
import { ChatFormContainer } from 'components/organisms'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { useChatData } from 'hooks/useChatData'
import { addChat } from 'services/chat/addChat'
import { Chat, ChatData, ContactInfo, ContactInfoList, SupporterList } from 'types/data'

type ContactChatPageProps = {
  contactId: string
  contactInfo: ContactInfo | undefined
  chatData: ChatData | undefined
  supporterList: SupporterList
}

// eslint-disable-next-line react/display-name
const ContactChatPage: NextPage<ContactChatPageProps> = memo(
  ({ contactId, contactInfo, chatData: initialChatData, supporterList }: ContactChatPageProps) => {
    const router = useRouter()
    const { chatData, mutate } = useChatData(contactId, initialChatData)

    // Firebaseにチャットを保存する関数
    const postChat = useCallback(
      async (chat: Chat) => {
        if (contactId) {
          // Firebaseにチャットを追加
          await addChat(contactId, chat)
          // ローカルにあるチャットデータを更新
          chatData && mutate([...chatData, chat])
          scroll.scrollToBottom()
        }
      },
      [chatData, contactId, mutate]
    )

    if (router.isFallback) return <LoadingScreen loading />

    return (
      <DefaultLayout>
        <Container maxWidth="md">
          <Box pt={{ xs: 6, sm: 10 }} pb={13}>
            <PageHeading
              title="お問い合わせチャット"
              description="商品についてご不明点やご質問等ございましたら、こちらのチャットにてお気軽にご相談ください。"
            />

            <Box mt={{ xs: 4, sm: 6 }}>
              {chatData && contactInfo && supporterList && <ChatList {...{ chatData, contactInfo, supporterList }} />}
            </Box>

            {/* 入力エリア */}
            <Stack
              sx={{ bgcolor: '#fff', borderTop: '1px solid #aaa', position: 'fixed', bottom: 0, left: 0, right: 0 }}
            >
              <Container maxWidth="md">
                <Box py={2}>
                  <ChatFormContainer admin={false} contributor="0" contactId={contactId} postChat={postChat} />
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
  const contactInfoListSnap = await adminDb.collection('contactInfoList').get()
  const contactInfoList: ContactInfoList = {}
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
    const contactInfoSnap = await adminDb.collection('contactInfoList').doc(contactId).get()
    const contactInfo = await contactInfoSnap.data() // お問い合わせ情報

    const chatDataSnap = await adminDatabase.ref(`chatDataList/${contactId}`).orderByChild('postTime').once('value')
    const chatData: ChatData = [] // チャットデータ
    chatDataSnap.forEach((snap) => {
      chatData.push(snap.val())
    })

    const supporterListSnap = await adminDb.collection('supporterList').get()
    const supporterList: SupporterList = {} // サポーターデータ
    supporterListSnap.forEach((doc) => {
      const { name, email, color } = doc.data()
      if (typeof name === 'string' && typeof email === 'string' && typeof color === 'string') {
        supporterList[doc.id] = { name, email, color }
      }
    })

    return {
      props: { contactId, contactInfo, chatData, supporterList },
      revalidate: 60,
    }
  } else {
    return { props: {}, revalidate: 60 }
  }
}

export default ContactChatPage
