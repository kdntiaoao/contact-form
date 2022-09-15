import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Backdrop, Box, CircularProgress, Container, Typography } from '@mui/material'
import { signInAnonymously } from 'firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth'

import { auth } from '../../../firebase/client'
import { adminDb } from '../../../firebase/server'

import { DefaultLayout } from 'components/template/DefaultLayout'
import {  getContactInfo } from 'services/getContactData'
import { ChatData, ContactInfo } from 'types/data'

type ContactChatPageProps = {
  id: string | undefined
  contactInfo: ContactInfo | undefined
  chatData: ChatData | undefined
}

const ContactChatPage: NextPage<ContactChatPageProps> = ({ id, contactInfo, chatData }: ContactChatPageProps) => {
  const router = useRouter()
  const [user] = useAuthState(auth)
  // const { contactData } = useContactData(id, initialData)
  // const {
  //   contactInfo: { name },
  //   chatData,
  // } = contactData

  // useEffect(() => {
  //   console.log('contactData : ', contactData)
  // }, [contactData])

  useEffect(() => {
    if (!user) signInAnonymously(auth).then(() => {
      console.log({user})
    })
  }, [user])

  useEffect(() => {
    if (!user && id) {
      getContactInfo(id)
    }
  }, [id, user])

  if (router.isFallback) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  return (
    <DefaultLayout>
      <Container>
        <Box py={{ xs: 6, sm: 10 }}>
          ID : {id || 'undefined'}
          <Typography variant="h5">お名前：{contactInfo?.name || 'undefined'}</Typography>
          <Typography variant="h5">メール：{contactInfo?.email || 'undefined'}</Typography>
          <Typography variant="h5">電話：{contactInfo?.tel || 'undefined'}</Typography>
          <Typography variant="h5">商品種別：{contactInfo?.category || 'undefined'}</Typography>
          <Typography variant="h5">送信時間：{contactInfo?.submitTime || 'undefined'}</Typography>
          <Box mt={4}>
            <Typography>現在の状態：{chatData?.currentStatus || 'undefined'}</Typography>
            {
              chatData?.chatHistory?.map(({ contributor, postTime, contents: { text, newStatus } }) => (
                <Box key={postTime} mt={4}>
                  <Typography>投稿者 : {contributor || 'undefined'}</Typography>
                  <Typography>投稿日時 : {postTime || 'undefined'}</Typography>
                  <Typography>投稿内容 : {text || newStatus || 'undefined'}</Typography>
                </Box>
              ))}
          </Box>
        </Box>
      </Container>
    </DefaultLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const querySnapshot = await adminDb.collection('contactData').get()
  const paths: { params: { id: string } }[] = []
  querySnapshot.forEach((doc) => {
    paths.push({ params: { id: doc.id } })
  })
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const contactId: string | undefined = params?.id?.toString()
  const contactInfoDoc = contactId ? await adminDb.collection('contactInfo').doc(contactId).get() : undefined
  const contactInfo = contactInfoDoc?.exists ? contactInfoDoc?.data() : undefined
  const chatDataDoc = contactId ? await adminDb.collection('chatData').doc(contactId).get() : undefined
  const chatData = chatDataDoc?.exists ? chatDataDoc?.data() : undefined

  return {
    props: { id: contactId, contactInfo, chatData },
    revalidate: 10,
  }
}

export default ContactChatPage
