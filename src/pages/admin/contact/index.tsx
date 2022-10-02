import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useState } from 'react'

import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../../../../firebase/client'

import { LoadingScreen } from 'components/molecules/LoadingScreen'
import { ContactTableContainer } from 'components/organisms/containers/ContactTableContainer'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { getContactInfoList } from 'services/contact/getContactInfoList'
import { getSupporterDataList } from 'services/supporter/getSupporterDataList'
import { ContactInfo, SupporterData } from 'types/data'

// eslint-disable-next-line react/display-name
const ContactListPage: NextPage = memo(() => {
  const router = useRouter()
  const [user, loading] = useAuthState(auth)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const [contactInfoList, setContactInfoList] = useState<Record<string, ContactInfo>>()
  const [supporterDataList, setSupporterDataList] = useState<SupporterData>()

  const fetchData = useCallback(async () => {
    const contactInfoList: Record<string, ContactInfo> | null = await getContactInfoList()
    const supporterDataList: SupporterData | null = await getSupporterDataList()

    contactInfoList && setContactInfoList(contactInfoList)
    supporterDataList && setSupporterDataList(supporterDataList)
  }, [setContactInfoList])

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [fetchData, user])

  useEffect(() => {
    if (!loading && (!user || !user?.email)) router.push('/')
  }, [loading, router, user])

  if (loading || !contactInfoList || !supporterDataList) return <LoadingScreen loading />

  return (
    <DefaultLayout>
      <Container maxWidth="xl">
        <Box py={{ xs: 6, sm: 10 }}>
          <Box>
            <Typography variant={matches ? 'h4' : 'h5'} component="h1">
              お問い合わせ一覧
            </Typography>
          </Box>

          <Box mt={{ xs: 4, sm: 6 }}>
            <ContactTableContainer contactInfoList={contactInfoList} supporterDataList={supporterDataList} />
          </Box>
        </Box>
      </Container>
    </DefaultLayout>
  )
})

export default ContactListPage
