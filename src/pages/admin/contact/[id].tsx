import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useState } from 'react'

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { Box, Button, Container, Divider, Stack, useMediaQuery, useTheme } from '@mui/material'
import { format } from 'date-fns'
import { off, onValue, orderByChild, query, ref } from 'firebase/database'
import { doc, onSnapshot, Unsubscribe, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { animateScroll as scroll } from 'react-scroll'

import { auth, database, db } from '../../../../firebase/client'
import { adminDatabase, adminDb } from '../../../../firebase/server'

import { Chat } from 'components/molecules/Chat'
import { LoadingScreen } from 'components/molecules/LoadingScreen'
import { StatusSelectArea } from 'components/molecules/StatusSelectArea'
import { ChatFormContainer } from 'components/organisms/containers/ChatFormContainer'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { ChatData, ContactInfo, SupporterData } from 'types/data'

type AdminContactChatPageProps = {
  contactId: string | undefined
  contactInfo: ContactInfo | undefined
  chatData: ChatData | undefined
  supporterDataList: Record<string, SupporterData>
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
    const [currentStatus, setCurrentStatus] = useState<number | undefined>(initialContactInfo?.currentStatus)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'))

    const changeStatus = useCallback(
      async (newStatus: number): Promise<void> => {
        if (contactId && user) {
          setCurrentStatus(newStatus)
          const contactInfoRef = doc(db, 'contactInfo', contactId)
          await updateDoc(contactInfoRef, { currentStatus: newStatus })
        }
      },
      [contactId, user]
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
          setCurrentStatus(data.currentStatus)
        })
      } else if (!loading) {
        console.log('user or id not exist')
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
                  <Link href="/admin/contact">
                    <Button component="a" variant="text" endIcon={<ArrowForwardIosRoundedIcon />}>
                      お問い合わせ一覧
                    </Button>
                  </Link>
                </Box>

                <StatusSelectArea
                  direction={matches ? 'column' : 'row'}
                  currentStatus={currentStatus}
                  changeStatus={changeStatus}
                />
              </Box>
            </Container>

            <Divider orientation={matches ? 'vertical' : 'horizontal'} flexItem />

            <Container maxWidth="md" sx={{ flex: 1 }}>
              <Box pt={{ xs: 6, md: 4 }} pb={13}>
                <Stack spacing={2}>
                  {chatData?.map(
                    ({ contributor, postTime, contents: { text } }, index) =>
                      typeof text !== 'undefined' &&
                      postTime && (
                        <Chat
                          key={postTime}
                          reverse={contributor !== '0'}
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
                      <ChatFormContainer contributor={user.uid} contactId={contactId} />
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

export default AdminContactChatPage
