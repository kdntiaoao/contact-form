import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useEffect } from 'react'

import { Box, Container } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../../../../firebase/client'
import { adminDb } from '../../../../firebase/server'

import { LoadingScreen } from 'components/molecules/LoadingScreen'
import { ContactTableContainer } from 'components/organisms/containers/ContactTableContainer'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { useContactInfoList } from 'hooks/useContactInfoList'
import { useSupporterList } from 'hooks/useSupporterList'
import { ContactInfo, ContactInfoList, Supporter, SupporterList } from 'types/data'

type Props = {
  contactInfoList: ContactInfoList | undefined
  supporterList: SupporterList
}

// eslint-disable-next-line react/display-name
const ContactListPage: NextPage<Props> = memo(
  ({ contactInfoList: initialContactInfoList, supporterList: initialSupporterList }: Props) => {
    const router = useRouter()
    const [user, authLoading] = useAuthState(auth)
    const { contactInfoList } = useContactInfoList(initialContactInfoList)
    const { supporterList } = useSupporterList(initialSupporterList)

    useEffect(() => {
      if (!authLoading && (!user || !user?.email)) router.push('/')
    }, [authLoading, router, user])

    if (authLoading || !contactInfoList || !supporterList || !user) return <LoadingScreen loading />

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
  }
)

export const getStaticProps: GetStaticProps = async () => {
  const contactInfoListSnapshot = await adminDb.collection('contactInfoList').get()
  const contactInfoList: ContactInfoList = {}
  const supporterListSnapshot = await adminDb.collection('supporterList').get()
  const supporterList: SupporterList = {}

  if (!contactInfoListSnapshot.empty) {
    contactInfoListSnapshot.forEach((doc) => (contactInfoList[doc.id] = doc.data() as ContactInfo))
  }

  if (!supporterListSnapshot.empty) {
    supporterListSnapshot.forEach((doc) => (supporterList[doc.id] = doc.data() as Supporter))
  }

  return {
    props: {
      contactInfoList: Object.keys(contactInfoList).length > 0 ? contactInfoList : undefined,
      supporterList: Object.keys(supporterList).length > 0 ? supporterList : undefined,
    },
    revalidate: 60,
  }
}

export default ContactListPage
