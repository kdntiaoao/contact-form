import { memo, useEffect, useState } from 'react'

import { signOut } from 'firebase/auth'

import { auth } from '../../../../../firebase/client'

import { Header } from 'components/organisms/presentations/Header'


// eslint-disable-next-line react/display-name
export const HeaderContainer = memo(() => {
  const [admin, setAdmin] = useState<boolean>(false)

  const logout = () => {
    signOut(auth)
  }

  const menuList = [
    [
      { text: 'ホーム', url: '/' },
      // { text: 'アクセス', url: '/access' },
      // { text: '沿革', url: '/' },
      // { text: 'ビジョン', url: '/vision' },
      // { text: 'サービス', url: '/service' },
      // { text: '実績紹介', url: '/product' },
      // { text: 'セミナー', url: '/seminar' },
      // { text: 'お役立ち情報', url: '/info' },
      // { text: 'IR情報', url: '/ir' },
      // { text: '採用情報', url: '/recruit' },
      { text: 'お問い合わせ', url: '/contact' },
    ],
    [
      { text: 'ログイン', url: '/admin/login' },
      { text: 'ログアウト', url: '/admin/login', onClick: logout },
      { text: 'お問い合わせ一覧', url: '/admin/contact' },
    ],
  ]

  if (admin) {
    menuList.push([
      { text: 'お問い合わせ一覧', url: '/' },
      { text: 'ログアウト', url: '/admin/login', onClick: logout },
    ])
  }

  useEffect(() => {
    setAdmin(false)
  }, [])

  return <Header menuList={menuList} />
})
