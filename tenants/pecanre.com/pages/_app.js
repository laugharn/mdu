import 'shared/styles/global.css'
import 'shared/styles/graphik.css'
import 'shared/styles/lyon.css'

import App, { Container } from 'next/app'
import AccountContainer from '~/containers/account'
import Head from 'shared/components/seo/head'
import { LayoutDefault } from '~/components/layouts'
import QA from '~/components/qa'
import useHotkeys from 'shared/utils/hooks/useHotkeys'
import { useState } from 'react'

const Pecan = ({ Component, pageProps }) => {
  const [showQA, setShowQA] = useState(false)

  useHotkeys('alt+q+a', () => {
    if (process.env.BRANCH !== 'master') {
      setShowQA(!showQA)
    }
  })

  return (
    <AccountContainer.Provider>
      <Container>
        {showQA && <QA />}
        <LayoutDefault>
          <Head />
          <Component {...pageProps} />
        </LayoutDefault>
      </Container>
    </AccountContainer.Provider>
  )
}

Pecan.getInitialProps = async context => {
  const props = await App.getInitialProps(context)

  return {
    ...props,
  }
}

export default Pecan
