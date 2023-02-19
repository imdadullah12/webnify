import "../styles/globals.css";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>WebLab</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
