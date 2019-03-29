import Head from 'next/head';

export default ({ title }) => {
  return (
    <Head>
      <title>
        {title
          ? `${title} | ${process.env.SITE_TITLE}`
          : process.env.SITE_TITLE}
      </title>
    </Head>
  );
};
