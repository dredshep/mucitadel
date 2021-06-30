// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
    faDiscord,
    faLinkedinIn,
    faRedditAlien,
    faTelegramPlane,
    faTwitter,
    faYoutube
} from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ErrorMessage, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import Button from '../styled/Button'
import Link from '../styled/Link'

function MainLogo() {
  return <img src="/images/mucitadel-white.png" className="object-cover" alt="MemeUnity Logo" />
}

function Logo() {
  return (
    <div className="flex flex-row items-center w-48 mx-auto sm:mx-0 mb-2 mt-px">
      <MainLogo />
      {/* <div className="font-title text-xl font-bold tracking-wider">
        MU&nbsp;Citadel
      </div> */}
    </div>
  )
}

function SubFooter() {
  return (
    <div className="pt-px sm:pt-0 h-5 text-xs sm:text-sm text-secondary" style={{ backgroundColor: 'rgba(20, 16, 23' }}>
      <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <div className="flex justify-around sm:justify-between ">
          <div>Copyright 2021 ©️ MemeUnity</div>
          <a href="/legal/privacy-policy">Privacy Policy</a>
          <a href="/legal/terms-of-service">Terms of Service</a>
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  function Title(props) {
    return <h1 className="text-2xl pb-4 font-bold font-title tracking-wide">{props.children}</h1>
  }

  function FooterElement(props) {
    return <div className="m-0 my-5 mx-10 sm:m-5 sm:w-72 flex flex-col box-border font-body">{props.children}</div>
  }

  const initialValues = {
    name: '',
    email: '',
  }

  return (
    <>
      <div className="sm:px-0 lg:px-10 xl:px-32 bg-asidebg">
        <div className="flex flex-col sm:max-w-2xl lg:max-w-max mx-auto sm:flex-row flex-wrap lg:flex-nowrap -m-5 pt-5 pb-10 text-center sm:text-left ">
          <FooterElement>
            {/* <Title>Dank</Title> */}
            <div className="mb-3 flex flex-row">
              <Logo />
            </div>
            <p>This will be the beginning of something awesome and full of memes.</p>
          </FooterElement>
          <FooterElement>
            <Title>Additional Links</Title>
            <ul className="text-mupurple">
              <li>
                <Link href="https://memeunity.com/#roadmap" target="_blank">
                  <FontAwesomeIcon icon={faLink} className="mr-3" />
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="https://docs.google.com/document/d/1hzSz46MQm8Bn4ytWL4Op-LPDWfV7w_NYDMOxTYqFYSs/edit?usp=sharing"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faLink} className="mr-3" />
                  Tokenomics
                </Link>
                ?
              </li>
              <li>
                <Link
                  href="https://docs.google.com/document/d/1-GLSxMDTp29buL8rljzrCB7k6lw8mU4FcIrTpcu_pYM/edit?usp=sharing"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faLink} className="mr-3" />
                  Whitepaper
                </Link>
                ?
              </li>
              <li>
                <Link href="https://www.phantasma.io/wallets" target="_blank">
                  <FontAwesomeIcon icon={faLink} className="mr-3" />
                  Phantasma&nbsp;Wallet
                </Link>
              </li>
            </ul>
          </FooterElement>
          <FooterElement>
            <Title>Contact us</Title>
            <p>Contact us and the community on Telegram or Discord.</p>
            <div className="flex flex-row items-center h-10 mt-3 text-mupurple">
              <a
                className="w-10 text-2xl"
                href="https://www.youtube.com/channel/UCVg0VFYQMFY3EkVMTcyXocQ"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  // style={{ color: "#f70000" }}
                />
              </a>
              <a className="w-10 text-2xl ml-4" href="https://twitter.com/thememeunity" target="_blank">
                <FontAwesomeIcon
                  icon={faTwitter}
                  // style={{ color: "#1ca6d6" }}
                />
              </a>
              <a className="w-10 text-2xl ml-4" href="https://t.me/memeunityontg" target="_blank">
                <FontAwesomeIcon
                  icon={faTelegramPlane}
                  // style={{ color: "#2a9ed0" }}
                />
              </a>
              <a className="w-10 text-2xl ml-4" href="https://discord.gg/XFXsFfX" target="_blank">
                <FontAwesomeIcon
                  icon={faDiscord}
                  // style={{ color: "#6e85d3" }}
                />
              </a>
              <a className="w-10 text-2xl ml-4" href="https://www.reddit.com/r/memeunityonreddit/" target="_blank">
                <FontAwesomeIcon
                  icon={faRedditAlien}
                  // style={{ color: "#f74300" }}
                />
              </a>
              <a className="w-10 text-2xl ml-4" href="https://www.linkedin.com/company/memeunity" target="_blank">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  // style={{ color: "#0270ad" }}
                />
              </a>
            </div>
          </FooterElement>
          <FooterElement>
            <Title>A wild newsletter</Title>
            {/* <p>Listen to our tales of woe and glory and stay in touch with the latest memes! Your info will remain safe. ☺️ </p> */}
            <Formik
              initialValues={initialValues}
              validationSchema={() =>
                Yup.object().shape({
                  name: Yup.string()
                    .trim()
                    .matches(
                      /[\w\s]$/,
                      'Name can only contain letters, and cannot include any special characters, punctionations or start with a space',
                    )
                    .required('Name is required'),
                  email: Yup.string().email().required('Email address is required'),
                })
              }
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)

                setSubmitting(false)
              }}
            >
              {(props) => {
                const { handleSubmit, values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting } =
                  props

                return (
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                      <input
                        className="bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover focus:outline-none transition-colors duration-75 px-4 py-2 rounded-lg shadow-md mt-2"
                        type="text"
                        name="name"
                        placeholder="name"
                        onChange={(e)=>{
                            setFieldValue('name', e.target.value)
                        }}
                      />
                      <ErrorMessage name="name">
                        {(msg) => <span className="text-xs text-red">{msg}</span>}
                      </ErrorMessage>
                      
                      <input
                        className="bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover focus:outline-none transition-colors duration-75 px-4 py-2 rounded-lg shadow-md mt-2"
                        type="email"
                        name="email"
                        placeholder="email"
                        onChange={(e)=>{
                            setFieldValue('email', e.target.value)
                        }}
                      />
                      <ErrorMessage name="email">
                        {(msg) => <span className="text-xs text-red">{msg}</span>}
                      </ErrorMessage>

                      <Button className="mt-2 w-full">Stay in the loop</Button>
                    </div>
                  </form>
                )
              }}
            </Formik>
          </FooterElement>
        </div>
      </div>
      <SubFooter />
    </>
  )
}
