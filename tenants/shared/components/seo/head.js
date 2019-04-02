import Head from 'next/head'
import Robots from './robots'
import Title from './title'

export default ({ children }) => (
  <Head>
    <meta charSet="utf-8" />
    <meta name="sha" content={process.env.SHA} />

    <Robots />

    <Title />

    <link
      href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
      rel="icon"
      type="image/x-icon"
    />

    {children}
  </Head>
)
