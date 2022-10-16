import { memo, useEffect, useMemo, useState } from 'react'

import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../../../../../firebase/client'

import { Header } from 'components/organisms/presentations/Header'
import { getSupporterList } from 'services/supporter/getSupporterList'
import { SupporterList } from 'types/data'

type MenuListType = { text: string; url: string; onClick?: () => void }[][]

const logout = () => {
  signOut(auth)
}

// eslint-disable-next-line react/display-name
export const HeaderContainer = memo(() => {
  const [user] = useAuthState(auth)
  const [supporterList, setSupporterList] = useState<SupporterList>()

  const menuList = useMemo<MenuListType>(
    () =>
      user?.email
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
    [user]
  )

  const supporterName = useMemo(() => {
    return user?.uid && supporterList?.[user.uid]?.name
  }, [supporterList, user])

  const supporterColor = useMemo(() => {
    return user?.uid && supporterList?.[user.uid]?.color
  }, [supporterList, user])

  useEffect(() => {
    getSupporterList().then((dataList) => dataList && setSupporterList(dataList))
  }, [user])

  return <Header menuList={menuList} account={supporterName} avatarColor={supporterColor} />
})
