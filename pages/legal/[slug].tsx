import Head from "next/head";
// import { useRouter } from "next/router";
import React from "react";
import PrivacyPolicy from "../../components/Content/PrivacyPolicy";
import TermsOfService from "../../components/Content/TermsOfService";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
// import "../../styles/purehtml.scss";

export default function Legal(props) {
  // const router = useRouter();
  // const { slug } = router.query;

  function DefaultElements(props) {
    const isHTML = props.isHTML;
    return (
      <>
        <div className="App text-white bg-mainbg min-h-screen overflow-y-hidden font-body">
          <Head>
            <title>MU Citadel - the tree where memes grow</title>
          </Head>
          <NavBar {...props} />
          {props.children}
          <Footer />
        </div>
      </>
    );
  }

  // const [initialized, initialize] = useState(false);

  // useEffect(() => {
  //   initialize(true);
  // }, []);

  switch (props.slug) {
    case "privacy-policy":
      return (
        <DefaultElements isHTML>
          <PrivacyPolicy />
        </DefaultElements>
      );
    case "terms-of-service":
      return (
        <DefaultElements isHTML>
          <TermsOfService />
        </DefaultElements>
      );
    default:
      // if (initialized) {
      return (
        <DefaultElements>
          <div className="w-full">
            <h1 className="text-4xl text-center font-extrabold">
              404 - You took a wrong turn. This page does not exist.
            </h1>
            <p className="mx-auto text-secondary">
              If it should exist, please notify us.
            </p>
          </div>
        </DefaultElements>
      );
    // } else return <p>gay</p>;
  }
}

export async function getServerSideProps(context) {
  return { props: { slug: context.params.slug } };
}
