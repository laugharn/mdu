import "../styles/global.css";

import App, { Container } from "next/app";
import AuthContainer from "~/containers/auth";

const Pecan = ({ Component, pageProps }) => {
  return (
    <Container>
      <AuthContainer.Provider>
        <Component {...pageProps} />
      </AuthContainer.Provider>
    </Container>
  );
};

Pecan.getInitialProps = async context => {
  const props = await App.getInitialProps(context);

  return {
    ...props
  };
};

export default Pecan;
