import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import copy from "copy-to-clipboard";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import NFTList from "../components/NFTList";
import {
  AuthData,
  LogIn,
  LogOut,
} from "../components/types/AuthenticationProvider";
import cards from "../functions/cards";
import getCardsFromAPI, { shortenAddress } from "../functions/getCardsFromAPI";
import { NFT } from "../types/nft";

// const;

function Content(props: ContentProps & { userAddress: string }) {
  return (
    <div className="flex flex-col pb-16">
      <div className="w-full h-64">
        <img
          className="w-full h-full object-cover"
          src="images/memeunity-banner.jpg"
          alt="Banner"
        />
      </div>
      <div className="w-full -mt-24 flex justify-center">
        <div className="rounded-full h-32 w-32 bg-white border-mupurple border-2 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="images/Mia.png"
            alt="Profile Picture"
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="mt-5 text-2xl font-bold font-title">
          Anonymous Address
        </h1>
        <p
          className="mt-3 text-mupurple cursor-pointer hover:text-mupurple-hover"
          onClick={() =>
            copy(props.userAddress)
              ? alert("Successfully copied address")
              : alert("Failed to copy address")
          }
        >
          {shortenAddress(props.userAddress)}{" "}
          <FontAwesomeIcon icon={faCopy} className="ml-1" />
        </p>
        {/* <p className="mx-5 lg:mx-10 mt-5 max-w-md text-center text-secondary">
          When the sea sends the sparrows with thistles and berries, send them
          back to the pyre.
        </p>
        <div className="mt-5 flex items-center text-mupurple font-semibold text-sm">
          <FontAwesomeIcon icon={faTwitter} className="mr-2 text-twitter" />
          <div>memeunity</div>
          <FontAwesomeIcon
            icon={faGlobe}
            className="ml-5 mr-2 text-secondary"
          />
          <div>memeunity.com</div>
        </div>
        <div className="mt-6 flex items-center">
          <div className="cursor-pointer bg-mupurple py-4 px-4 rounded-full text-lg  font-title tracking-wide font-semibold leading-3">
            Follow
          </div>
          <div className="ml-2 rounded-full bg-asidebg h-12 w-12 flex justify-center items-center text-xl">
            <FontAwesomeIcon icon={faShareAlt} className="-ml-px" />
          </div>
          <div className="ml-2 rounded-full bg-asidebg h-12 w-12 flex justify-center items-center text-xl">
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>
        </div> */}
      </div>
      <div className="mx-5 lg:mx-10 w-11/12">
        <div className="mt-10 flex w-full text-secondary font-semibold space-x-4 overflow-x-auto no-scrollbar">
          <div className="border-b-2 text-white border-white h-8">Owned</div>
          <div>On&nbsp;sale</div>
          <div>Created</div>
          <div>Liked</div>
          <div>Activity</div>
          <div>
            Following<span className="ml-1 text-sm mb-2">0</span>
          </div>
          <div>
            Followers<span className="ml-1 text-sm mb-2">1348</span>
          </div>
        </div>
      </div>
      <NFTList
        nftList={props.nftList.filter(
          (nft) =>
            cards.isOwner(nft, props.userAddress) && nft.mints.available > 0
        )}
      />
    </div>
  );
}

type ContentProps = {
  logIn: LogIn;
  logOut: LogOut;
  authData: AuthData;
  hasMetamask: boolean;
  nftList: NFT[];
};

export default function User(props: ContentProps) {
  const router = useRouter();
  const userAddress = router.query.user as string;
  return (
    <div className="App text-white bg-mainbg min-h-screen font-body">
      <NavBar {...props} />
      <Content {...{ ...props, userAddress }} />
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const nftList: NFT[] = await getCardsFromAPI();
  return { props: { nftList } };
};
