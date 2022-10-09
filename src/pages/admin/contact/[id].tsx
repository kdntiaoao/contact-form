import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useState } from 'react'

import { Box, Container, Divider, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import { animateScroll as scroll } from 'react-scroll'

import { auth } from '../../../../firebase/client'
import { adminDatabase, adminDb } from '../../../../firebase/server'

import { ChatList } from 'components/molecules/ChatList'
import { LinkButton } from 'components/molecules/LinkButton'
import { LoadingScreen } from 'components/molecules/LoadingScreen'
import { ChatFormContainer } from 'components/organisms/containers/ChatFormContainer'
import { StatusSelectAreaContainer } from 'components/organisms/containers/StatusSelectAreaContainer'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { addChat } from 'services/chat/addChat'
import { getChatData } from 'services/chat/getChatData'
import { getContactInfo } from 'services/contact/getContactInfo'
import { Chat, ChatData, ContactInfo, SupporterData } from 'types/data'

type AdminContactChatPageProps = {
  contactId: string | undefined
  contactInfo: ContactInfo | undefined
  chatData: ChatData | undefined
  supporterDataList: SupporterData
}

// eslint-disable-next-line react/display-name
const AdminContactChatPage: NextPage<AdminContactChatPageProps> = memo(
  ({
    contactId,
    contactInfo: initialContactInfo,
    chatData: initialChatData,
    supporterDataList,
  }: AdminContactChatPageProps) => {
    const router = useRouter()
    const [user, loading] = useAuthState(auth)
    const [chatData, setChatData] = useState<ChatData | undefined>(initialChatData)
    const [contactInfo, setContactInfo] = useState<ContactInfo | undefined>(initialContactInfo)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'))

    // Firebaseにチャットを保存する関数
    const postChat = useCallback(
      async (chat: Chat) => {
        if (contactId) {
          await addChat(contactId, chat)

          const chatData = await getChatData(contactId)

          if (chatData) {
            setChatData(chatData)
            scroll.scrollToBottom()
          }
        }
      },
      [contactId]
    )

    // 対応状況を変更する関数
    const changeStatus = useCallback(
      async (newStatus: number, chat: Chat): Promise<void> => {
        if (contactId && user) {
          // 更新される部分だけのお問い合わせ情報
          const newContactInfo: Partial<ContactInfo> = {
            currentStatus: newStatus,
            supporter: newStatus === 0 ? '0' : user.uid,
          }
          setContactInfo((contactInfo) => contactInfo && { ...contactInfo, ...newContactInfo })
          await fetch(`/api/contact/${contactId}`, {
            body: JSON.stringify({ newContactInfo }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          })
          await postChat(chat)
        }
      },
      [contactId, postChat, user]
    )

    useEffect(() => {
      if (!loading && (!user || !user?.email)) router.push('/')
    }, [loading, router, user])

    useEffect(() => {
      if (contactId) {
        getContactInfo(contactId).then((contactInfo) => {
          setContactInfo(contactInfo)
        })

        getChatData(contactId).then((chatData) => {
          setChatData(chatData)
          scroll.scrollToBottom()
        })
      }
    }, [contactId])

    if (router.isFallback || loading || !user) return <LoadingScreen loading />

    return (
      <DefaultLayout>
        <Box sx={{ position: 'absolute', inset: 0 }}>
          <Stack direction={matches ? 'row' : 'column'} height="100%">
            <Container maxWidth="md" sx={{ width: { xs: '100%', md: 'fit-content' } }}>
              <Box py={matches ? 4 : 2}>
                <Box mb={matches ? 4 : 2}>
                  <LinkButton href="/admin/contact">お問い合わせ一覧</LinkButton>
                </Box>

                <StatusSelectAreaContainer
                  direction={matches ? 'column' : 'row'}
                  currentStatus={contactInfo?.currentStatus}
                  supporter={contactInfo?.supporter}
                  uid={user.uid}
                  changeStatus={changeStatus}
                />
              </Box>
            </Container>

            <Divider orientation={matches ? 'vertical' : 'horizontal'} flexItem />

            <Container maxWidth="md" sx={{ flex: 1 }}>
              <Box pt={{ xs: 6, md: 4 }} pb={13}>
                {chatData && contactInfo && supporterDataList && (
                  <ChatList
                    admin={true}
                    chatData={chatData}
                    contactInfo={contactInfo}
                    supporterDataList={supporterDataList}
                  />
                )}

                {/* 入力エリア */}
                <Stack
                  sx={{ bgcolor: '#fff', borderTop: '1px solid #aaa', position: 'fixed', bottom: 0, left: 0, right: 0 }}
                >
                  <Container maxWidth="md">
                    <Box py={2}>
                      <ChatFormContainer
                        admin={true}
                        contributor={user.uid}
                        contactId={contactId}
                        currentStatus={contactInfo?.currentStatus}
                        supporter={contactInfo?.supporter}
                        postChat={postChat}
                      />
                    </Box>
                  </Container>
                </Stack>
              </Box>
            </Container>
          </Stack>
        </Box>
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

    const chatDataSnap = await adminDatabase.ref(`chatDataList/${contactId}`).orderByChild('postTime').once('value')
    const chatData: ChatData = [] // チャットデータ
    chatDataSnap.forEach((snap) => {
      chatData.push(snap.val())
    })

    const supporterDataSnap = await adminDb.collection('supporterData').get()
    const supporterDataList: SupporterData = {} // サポーターデータ
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
    return { props: {}, revalidate: 60 }
  }
}

export default AdminContactChatPage
