import { GetStaticProps, NextPage } from 'next'
import { memo, useEffect, useState } from 'react'

import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material'
import { format } from 'date-fns'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, db } from '../../../../firebase/client'

import { DefaultLayout } from 'components/template/DefaultLayout'
import { getChatDataList } from 'services/chat/getChatDataList'
import { getContactInfoList } from 'services/contact/getContactInfoList'
import { ChatData, ContactInfo } from 'types/data'

type ContactPageProps = {
  contactInfoList: Record<string, ContactInfo>
  chatDataList: Record<string, ChatData>
}

// eslint-disable-next-line react/display-name
const ContactListPage: NextPage<ContactPageProps> = memo(
  ({ contactInfoList: initialContactInfoList, chatDataList: initialChatDataList }: ContactPageProps) => {
    const [user] = useAuthState(auth)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'))
    const [contactInfoList, setContactInfoList] = useState<Record<string, ContactInfo>>(initialContactInfoList)
    const [chatDataList, setChatDataList] = useState<Record<string, ChatData>>(initialChatDataList)

    useEffect(() => {
      const fetchData = async () => {
        if (user) {
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
        }
      }
      fetchData()
    }, [user])

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
              {Object.keys(contactInfoList).map((key) => {
                const { name, email, tel, category, submitTime } = contactInfoList[key]
                return (
                  <Box key={key} mt={2}>
                    <Typography variant="h5">{key}</Typography>
                    <Typography>name : {name}</Typography>
                    <Typography>email : {email}</Typography>
                    <Typography>tel : {tel}</Typography>
                    <Typography>category : {category}</Typography>
                    <Typography>submitTime : {format(submitTime, 'M月d日 H:mm')}</Typography>
                    <Typography>currentStatus : {chatDataList[key].currentStatus}</Typography>
                    <Typography>supporterId : {chatDataList[key].supporter}</Typography>
                  </Box>
                )
              })}
            </Box>
          </Box>
        </Container>
      </DefaultLayout>
    )
  }
)

export const getStaticProps: GetStaticProps = async () => {
  const contactInfoList = await getContactInfoList(true)
  const chatDataList = await getChatDataList(true)

  return { props: { contactInfoList, chatDataList }, revalidate: 60 }
}

export default ContactListPage
