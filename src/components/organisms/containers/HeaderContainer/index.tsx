import { memo, useMemo } from 'react'

import { signOut } from 'firebase/auth'
import { useRecoilValue } from 'recoil'

import { auth } from '../../../../../firebase/client'

import { Header } from 'components/organisms/presentations/Header'
import { useSupporterList } from 'hooks/useSupporterList'
import { userInfoState } from 'states/userInfoState'

type MenuListType = { text: string; url: string; onClick?: () => void }[][]

const logout = () => {
  signOut(auth)
}

// eslint-disable-next-line react/display-name
export const HeaderContainer = memo(() => {
  const userInfo = useRecoilValue(userInfoState)
  const { supporterList } = useSupporterList()

  const menuList = useMemo<MenuListType>(
    () =>
      userInfo?.userId
        ? [
            [
              { text: 'ホーム', url: '/' },
              { text: 'お問い合わせ', url: '/contact' },
            ],
            [
              { text: 'お問い合わせ一覧', url: '/admin/contact' },
              { text: 'ログアウト', url: '/admin/login', onClick: logout },
            ],
          ]
        : [
            [
              { text: 'ホーム', url: '/' },
              { text: 'お問い合わせ', url: '/contact' },
            ],
            [{ text: 'ログイン', url: '/admin/login' }],
          ],
    [userInfo]
  )

  const supporterName = useMemo(() => {
    return userInfo?.userId && supporterList?.[userInfo.userId]?.name
  }, [supporterList, userInfo])

  const supporterColor = useMemo(() => {
    return userInfo?.userId && supporterList?.[userInfo.userId]?.color
  }, [supporterList, userInfo])

  return <Header menuList={menuList} account={supporterName} avatarColor={supporterColor} />
})
