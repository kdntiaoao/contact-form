import Head from 'next/head'
import { memo, ReactNode } from 'react'

import styled from '@emotion/styled'
import { Stack } from '@mui/material'

import { HeaderContainer } from 'components/organisms/containers/HeaderContainer'

type Props = {
  title?: string
  children: ReactNode
}

const Main = styled.main`
  flex: 1;
  position: relative;
`

// eslint-disable-next-line react/display-name
export const DefaultLayout = memo(({ title = 'お問合せフォーム', children }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Stack minHeight='100vh'>
        <HeaderContainer />
        <Main>{children}</Main>
      </Stack>
    </>
  )
})
