import Head from 'next/head'
import Title from './title'

export default ({ children }) => (
  <Head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="sha" content={process.env.SHA} />

    <Title />

    <link
      href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAG0lEQVR42mP8v3//fwYKAOOoAaMGjBowXAwAAPQRN9FruvVPAAAAAElFTkSuQmCC"
      rel="icon"
      type="image/x-icon"
    />

    {children}
  </Head>
)
