import Head from 'next/head'
import { memo, ReactNode } from 'react'

import { Stack } from '@mui/material'

import { HeaderContainer } from 'components/organisms/containers/HeaderContainer'

type Props = {
  title?: string
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const DefaultLayout = memo(({ title = 'お問合せフォーム', children }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Stack>
        <HeaderContainer />
        <main>{children}</main>
      </Stack>
    </>
  )
})
