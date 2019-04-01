import Head from 'next/head'

export default ({ follow = true, index = true }) => {
  return (
    <Head>
      <meta
        name="robots"
        content={
          process.env.BRANCH === 'master'
            ? `${Boolean(index) ? 'index' : 'noindex'},${
                Boolean(follow) ? 'follow' : 'nofollow'
              }`
            : 'noindex,nofollow'
        }
      />
    </Head>
  )
}
