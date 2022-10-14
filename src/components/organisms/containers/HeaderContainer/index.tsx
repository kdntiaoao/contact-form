import { memo, useEffect, useMemo, useState } from 'react'

import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../../../../../firebase/client'

import { Header } from 'components/organisms/presentations/Header'
import { getSupporterDataList } from 'services/supporter/getSupporterDataList'
import { SupporterData } from 'types/data'

const logout = () => {
  signOut(auth)
}

// eslint-disable-next-line react/display-name
export const HeaderContainer = memo(() => {
  const [user] = useAuthState(auth)
  const [supporterDataList, setSupporterDataList] = useState<SupporterData>()

  const menuList = [
    [
      { text: 'ホーム', url: '/' },
      { text: 'お問い合わせ', url: '/contact' },
    ],
    [
      { text: 'ログイン', url: '/admin/login' },
      { text: 'ログアウト', url: '/admin/login', onClick: logout },
      { text: 'お問い合わせ一覧', url: '/admin/contact' },
    ],
  ]

  if (user?.email) {
    menuList.push([
      { text: 'お問い合わせ一覧', url: '/' },
      { text: 'ログアウト', url: '/admin/login', onClick: logout },
    ])
  }

  const supporterName = useMemo(() => {
    return user?.uid && supporterDataList?.[user.uid]?.name
  }, [supporterDataList, user])

  const supporterColor = useMemo(() => {
    return user?.uid && supporterDataList?.[user.uid]?.color
  }, [supporterDataList, user])

  useEffect(() => {
    getSupporterDataList().then((dataList) => dataList && setSupporterDataList(dataList))
  }, [user])

  return <Header menuList={menuList} account={supporterName} avatarColor={supporterColor} />
})
