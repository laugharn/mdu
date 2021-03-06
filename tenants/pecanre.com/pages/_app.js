import 'shared/styles/global.css'

import App, { Container } from 'next/app'
import AccountContainer from '~/containers/account'
import Head from 'shared/components/seo/head'
import useHotkeys from 'shared/utils/hooks/useHotkeys'

const Pecan = ({ Component, pageProps }) => {
  useHotkeys('alt+q+a', () => {
    if (process.env.BRANCH !== 'master') {
      alert('Entering QA debug mode!')
    }
  })

  return (
    <AccountContainer.Provider>
      <Container>
        <Head />
        <Component {...pageProps} />
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
