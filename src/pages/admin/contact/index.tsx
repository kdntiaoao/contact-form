import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useState } from 'react'

import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, db } from '../../../../firebase/client'

import { LoadingScreen } from 'components/molecules/LoadingScreen'
import { ContactTableContainer } from 'components/organisms/containers/ContactTableContainer'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { ChatData, ContactInfo } from 'types/data'

// eslint-disable-next-line react/display-name
const ContactListPage: NextPage = memo(() => {
  const router = useRouter()
  const [user, loading] = useAuthState(auth)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const [contactInfoList, setContactInfoList] = useState<Record<string, ContactInfo>>()
  const [chatDataList, setChatDataList] = useState<Record<string, ChatData>>()

  const fetchData = useCallback(async () => {
    const contactInfoSnapshot = await getDocs(collection(db, 'contactInfo'))
    const contactInfoList: Record<string, ContactInfo> = {}
    const chatDataSnapshot = await getDocs(collection(db, 'chatData'))
    const chatDataList: Record<string, ChatData> = {}

    contactInfoSnapshot.forEach((doc) => {
      const data = doc.data() as ContactInfo
      contactInfoList[doc.id] = data
    })

    chatDataSnapshot.forEach((doc) => {
      const data = doc.data() as ChatData
      chatDataList[doc.id] = data
    })

    setContactInfoList(contactInfoList)
    setChatDataList(chatDataList)
  }, [setContactInfoList, setChatDataList])

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [fetchData, user])

  useEffect(() => {
    if (!loading && (!user || !user?.email)) router.push('/')
  }, [loading, router, user])

  if (loading || !contactInfoList || !chatDataList) return <LoadingScreen loading />

  return (
    <DefaultLayout>
      <Container>
        <Box py={{ xs: 6, sm: 10 }}>
          <Box>
            <Typography variant={matches ? 'h4' : 'h5'} component="h1">
              お問い合わせ一覧
            </Typography>
          </Box>

          <Box mt={{ xs: 4, sm: 6 }}>
            <ContactTableContainer contactInfoList={contactInfoList} />
          </Box>
        </Box>
      </Container>
    </DefaultLayout>
  )
})

export default ContactListPage
