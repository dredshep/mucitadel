import "@fortawesome/fontawesome-svg-core/styles.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import AuthenticationProvider from "../components/AuthenticationProvider";
import CookieModal from "../components/CookieModal";
import "../styles/globals.css";

TimeAgo.addLocale(en);

// prettier-ignore
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script src="/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      </Head>
      <AuthenticationProvider>
        <Component {...pageProps} />
      </AuthenticationProvider>
      <CookieModal />
      <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
      <noscript><img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt=""/></noscript>
    </>
  );
}

export default MyApp;
