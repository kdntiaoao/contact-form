import { Header } from 'components/organisms/presentations/Header'
import { useState } from 'react'

export const HeaderContainer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const menuList = [
    [
      { text: 'ホーム', url: '/' },
      { text: 'アクセス', url: '/access' },
      { text: '沿革', url: '/' },
      { text: 'ビジョン', url: '/vision' },
      { text: 'サービス', url: '/service' },
      { text: '実績紹介', url: '/product' },
      { text: 'セミナー', url: '/seminar' },
      { text: 'お役立ち情報', url: '/info' },
      { text: 'IR情報', url: '/ir' },
      { text: '採用情報', url: '/recruit' },
      { text: 'お問い合わせ', url: '/contact' },
      {
        text: 'ああああああああああああああああああああああああああああああああああああああああああああああああああああ',
        url: '/',
      },
      { text: 'Item1', url: '/' },
      { text: 'Item2', url: '/' },
      { text: 'Item3', url: '/' },
      { text: 'Item4', url: '/' },
      { text: 'Item5', url: '/' },
    ],
    [
      { text: 'お問い合わせ一覧', url: '/' },
      { text: 'ログアウト', url: '/' },
    ],
  ]

  const handleDrawerToggle = () => {
    // console.log('handle drawer toggle!', isDrawerOpen)
    setIsDrawerOpen((prev) => !prev)
  }

  return <Header menuList={menuList} isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
}
