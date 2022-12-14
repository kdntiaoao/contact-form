import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'

import CreateRoundedIcon from '@mui/icons-material/CreateRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { Box, Container, Divider, Stack, useMediaQuery, useTheme } from '@mui/material'
import { animateScroll as scroll } from 'react-scroll'
import { useRecoilValue } from 'recoil'

import { adminDatabase, adminDb } from '../../../../firebase/server'

import { ContactInfoDialog, IconButtonList, LinkButton, LoadingScreen } from 'components/molecules'
import {
  ChatFormContainer,
  ChatListContainer,
  CommentDialogContainer,
  StatusSelectAreaContainer,
} from 'components/organisms'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { useChatData } from 'hooks/useChatData'
import { useContactInfo } from 'hooks/useContactInfo'
import { useSupporterList } from 'hooks/useSupporterList'
import { addChat } from 'services/chat/addChat'
import { updateContactInfo } from 'services/contact/updateContactInfo'
import { userInfoState } from 'states/userInfoState'
import { Chat, ChatData, ContactInfo, ContactInfoList, SupporterList } from 'types/data'

type AdminContactChatPageProps = {
  contactId: string
  contactInfo: ContactInfo | undefined
  chatData: ChatData | undefined
  supporterList: SupporterList
}

// eslint-disable-next-line react/display-name
const AdminContactChatPage: NextPage<AdminContactChatPageProps> = memo(
  ({
    contactId,
    contactInfo: initialContactInfo,
    chatData: initialChatData,
    supporterList: initialSupporterList,
  }: AdminContactChatPageProps) => {
    const router = useRouter()
    const matches = useMediaQuery(useTheme().breakpoints.up('md'))
    const userInfo = useRecoilValue(userInfoState)
    const [commentDialogOpen, setCommentDialogOpen] = useState<boolean>(false)
    const [contactInfoDialogOpen, setContactInfoDialogOpen] = useState<boolean>(false)
    const { contactInfo, mutate: mutateContactInfo } = useContactInfo(contactId, initialContactInfo)
    const { supporterList } = useSupporterList(initialSupporterList)
    const { chatData, mutate: mutateChatData } = useChatData(contactId, initialChatData)

    const disabledComment = useMemo<boolean>(
      () => !(contactInfo?.currentStatus === 1 && contactInfo.supporter === userInfo?.userId),
      [contactInfo, userInfo]
    )

    const contactInfoData = useMemo<{ title: string; content: string }[]>(
      () => [
        { title: '?????????', content: contactInfo?.name || '' },
        { title: '?????????????????????', content: contactInfo?.email || '' },
        { title: '????????????', content: contactInfo?.tel || '' },
        { title: '????????????', content: contactInfo?.category || '' },
        { title: '?????????', content: (contactInfo && supporterList?.[contactInfo.supporter]?.name) || '' },
      ],
      [contactInfo, supporterList]
    )

    // Firebase????????????????????????????????????
    const postChat = useCallback(
      async (chat: Omit<Chat, 'id'>) => {
        if (contactId) {
          // Firebase????????????????????????
          await addChat(contactId, chat)
          // ???????????????????????????????????????????????????
          chatData && mutateChatData([...chatData, chat])
          scroll.scrollToBottom()
        }
      },
      [chatData, contactId, mutateChatData]
    )

    // ?????????????????????????????????
    const changeStatus = useCallback(
      async (newStatus: number, chat: Chat): Promise<void> => {
        // ??????????????????ID?????????????????????ID???????????????return
        if (!contactId || !userInfo?.userId || !contactInfo) return

        // ????????????????????????
        await mutateContactInfo()
        await mutateChatData()
        // ??????????????????????????????return
        if (
          contactInfo.currentStatus === 2 ||
          contactInfo.currentStatus === newStatus ||
          (contactInfo.currentStatus === 1 && contactInfo.supporter !== userInfo.userId)
        )
          return

        // ??????????????????????????????????????????????????????
        const newContactInfo: Partial<ContactInfo> = {
          currentStatus: newStatus,
          supporter: newStatus === 0 ? '0' : userInfo.userId,
        }

        await updateContactInfo(contactId, newContactInfo)
        contactInfo && mutateContactInfo({ ...contactInfo, ...newContactInfo })
        postChat(chat)
      },
      [contactId, contactInfo, mutateChatData, mutateContactInfo, postChat, userInfo]
    )

    // ?????????????????????????????????
    const editComment = useCallback(
      async (commentContents: string) => {
        if (contactId && userInfo?.userId && supporterList && Object.keys(supporterList).length > 0) {
          // ???????????????????????????
          const newComment: Pick<ContactInfo, 'comment'> = {
            comment: {
              name: supporterList[userInfo.userId].name,
              contents: commentContents,
            },
          }

          await updateContactInfo(contactId, newComment)
          contactInfo && mutateContactInfo({ ...contactInfo, ...newComment })
        }
      },
      [contactId, contactInfo, mutateContactInfo, supporterList, userInfo]
    )

    const handleToggleCommentDialog = useCallback(() => {
      setCommentDialogOpen((prev) => !prev)
    }, [])

    const handleToggleContactInfoDialog = useCallback(() => {
      setContactInfoDialogOpen((prev) => !prev)
    }, [])

    useEffect(() => {
      if (userInfo && !userInfo.userId) router.push('/')
    }, [router, userInfo])

    if (router.isFallback || !contactInfo || !supporterList || !userInfo?.userId) return <LoadingScreen loading />

    return (
      <DefaultLayout>
        <Box sx={{ position: 'absolute', inset: 0 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} height="100%">
            <Container maxWidth="md" sx={{ width: { xs: '100%', md: 'fit-content' } }}>
              <Box py={matches ? 4 : 2}>
                <Box mb={matches ? 4 : 2}>
                  <LinkButton href="/admin/contact" fullWidth={matches} reverse>
                    ????????????????????????
                  </LinkButton>
                </Box>

                <Stack
                  alignItems={{ xs: 'flex-start', sm: 'center', md: 'stretch' }}
                  direction={{ xs: 'column', sm: 'row', md: 'column' }}
                  flexWrap={{ xs: 'wrap' }}
                  spacing={{ xs: 2, sm: 6 }}
                >
                  <Box>
                    <StatusSelectAreaContainer
                      direction={matches ? 'column' : 'row'}
                      currentStatus={contactInfo?.currentStatus}
                      supporter={contactInfo?.supporter}
                      uid={userInfo.userId}
                      changeStatus={changeStatus}
                    />
                  </Box>

                  <IconButtonList
                    list={[
                      { text: '??????????????????', icon: <CreateRoundedIcon />, onClick: handleToggleCommentDialog },
                      { text: '???????????????', icon: <InfoRoundedIcon />, onClick: handleToggleContactInfoDialog },
                    ]}
                  />

                  <CommentDialogContainer
                    comment={contactInfo.comment}
                    disabled={disabledComment}
                    open={commentDialogOpen}
                    editComment={editComment}
                    handleClose={handleToggleCommentDialog}
                  />

                  <ContactInfoDialog
                    list={contactInfoData}
                    open={contactInfoDialogOpen}
                    handleClose={handleToggleContactInfoDialog}
                  />
                </Stack>
              </Box>
            </Container>

            <Divider orientation={matches ? 'vertical' : 'horizontal'} flexItem />

            <Container maxWidth="md" sx={{ flex: 1 }}>
              <Box pt={{ xs: 6, md: 4 }} pb={13}>
                {chatData && contactInfo && supporterList && (
                  <ChatListContainer
                    admin={true}
                    chatData={chatData}
                    contactInfo={contactInfo}
                    supporterList={supporterList}
                  />
                )}

                {/* ??????????????? */}
                <Stack
                  sx={{ bgcolor: '#fff', borderTop: '1px solid #aaa', position: 'fixed', bottom: 0, left: 0, right: 0 }}
                >
                  <Container maxWidth="md">
                    <Box py={2}>
                      <ChatFormContainer
                        admin={true}
                        contributor={userInfo.userId}
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
    const contactInfo = await contactInfoSnap.data() // ????????????????????????

    const chatDataSnap = await adminDatabase.ref(`chatDataList/${contactId}`).orderByChild('postTime').once('value')
    const chatData: ChatData = [] // ?????????????????????
    chatDataSnap.forEach((snap) => {
      chatData.push(snap.val())
    })

    const supporterListSnap = await adminDb.collection('supporterList').get()
    const supporterList: SupporterList = {} // ????????????????????????
    supporterListSnap.forEach((doc) => {
      const { name, email, color } = doc.data()
      if (typeof name === 'string' && typeof email === 'string' && color === 'string') {
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

export default AdminContactChatPage
