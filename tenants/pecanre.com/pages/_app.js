import 'shared/styles/global.css'

import App, { Container } from 'next/app'
import AuthContainer from '~/containers/auth'
import Head from 'shared/components/seo/head'
import useHotkeys from 'shared/utils/hooks/useHotkeys'

const Pecan = ({ Component, pageProps }) => {
  useHotkeys('alt+q+a', () => {
    if (process.env.BRANCH !== 'master') {
      alert('Entering QA debug mode!')
    }
  })

  return (
    <Container>
      <Head />
      <AuthContainer.Provider>
        <Component {...pageProps} />
      </AuthContainer.Provider>
    </Container>
  )
}

Pecan.getInitialProps = async context => {
  const props = await App.getInitialProps(context)

  return {
    ...props,
  }
}

export default Pecan