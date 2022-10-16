import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useState } from 'react'

import { Box, Container } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../../../../firebase/client'

import { LoadingScreen } from 'components/molecules/LoadingScreen'
import { ContactTableContainer } from 'components/organisms/containers/ContactTableContainer'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { getContactInfoList } from 'services/contact/getContactInfoList'
import { getSupporterList } from 'services/supporter/getSupporterList'
import { ContactInfo, SupporterList } from 'types/data'

// eslint-disable-next-line react/display-name
const ContactListPage: NextPage = memo(() => {
  const router = useRouter()
  const [user, loading] = useAuthState(auth)
  const [contactInfoList, setContactInfoList] = useState<Record<string, ContactInfo>>()
  const [supporterList, setSupporterList] = useState<SupporterList>()

  const fetchData = useCallback(async () => {
    const contactInfoList: Record<string, ContactInfo> | null = await getContactInfoList()
    const supporterList: SupporterList | null = await getSupporterList()

    contactInfoList && setContactInfoList(contactInfoList)
    supporterList && setSupporterList(supporterList)
  }, [setContactInfoList])

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [fetchData, user])

  useEffect(() => {
    if (!loading && (!user || !user?.email)) router.push('/')
  }, [loading, router, user])

  if (loading || !contactInfoList || !supporterList || !user) return <LoadingScreen loading />

  return (
    <DefaultLayout>
      <Container maxWidth="xl">
        <Box py={{ xs: 6, sm: 10 }}>
          <ContactTableContainer
            tableTitle="お問い合わせ一覧"
            contactInfoList={contactInfoList}
            supporterList={supporterList}
            uid={user.uid}
          />
        </Box>
      </Container>
    </DefaultLayout>
  )
})

export default ContactListPage
