import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useState } from 'react'

import { Box, Container, Divider, Stack, useMediaQuery, useTheme } from '@mui/material'
import { off, onValue, orderByChild, push, query, ref, set } from 'firebase/database'
import { doc, onSnapshot, Unsubscribe, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { animateScroll as scroll } from 'react-scroll'

import { auth, database, db } from '../../../../firebase/client'
import { adminDatabase, adminDb } from '../../../../firebase/server'

import { ChatList } from 'components/molecules/ChatList'
import { LinkButton } from 'components/molecules/LinkButton'
import { LoadingScreen } from 'components/molecules/LoadingScreen'
import { ChatFormContainer } from 'components/organisms/containers/ChatFormContainer'
import { StatusSelectAreaContainer } from 'components/organisms/containers/StatusSelectAreaContainer'
import { DefaultLayout } from 'components/template/DefaultLayout'
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
        const chatDataRef = ref(database, `chatDataList/${contactId}`)
        const newChatRef = push(chatDataRef)
        await set(newChatRef, chat)
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
          const contactInfoRef = doc(db, 'contactInfo', contactId)
          await updateDoc(contactInfoRef, newContactInfo)
          await postChat(chat)
        }
      },
      [contactId, postChat, user]
    )

    useEffect(() => {
      if (!loading && (!user || !user?.email)) router.push('/')
    }, [loading, router, user])

    useEffect(() => {
      // クリーンアップ用
      const chatDataRef = query(ref(database, `chatDataList/${contactId}`), orderByChild('postTime'))
      let unsub: Unsubscribe

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

        // 現在のお問い合わせ情報を取得
        const contactInfoRef = doc(db, 'contactInfo', contactId)
        unsub = onSnapshot(contactInfoRef, (doc) => {
          const data = doc.data() as ContactInfo
          setContactInfo(data)
        })
      }

      const cleanup = () => {
        off(chatDataRef)
        unsub?.()
      }

      return cleanup
    }, [contactId, loading, user])

    if (router.isFallback || !user) return <LoadingScreen loading />

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
                      <ChatFormContainer admin={true} contributor={user.uid} contactId={contactId} currentStatus={contactInfo?.currentStatus} supporter={contactInfo?.supporter} postChat={postChat} />
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

    const chatDataSnap = await adminDatabase.ref(`chatDataList/${contactId}`).once('value')
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
