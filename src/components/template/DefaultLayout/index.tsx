import { ReactNode } from 'react'
import Head from 'next/head'
import { Stack } from '@mui/material'

import { HeaderContainer } from 'components/organisms/containers/HeaderContainer'

type Props = {
  title?: string
  children: ReactNode
}

export const DefaultLayout = ({ title = 'お問合せフォーム', children }: Props) => {
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
}
