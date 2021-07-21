// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import NavBar from 'components/NavBar'
import { AuthData, LogIn, LogOut } from 'components/types/AuthenticationProvider'
import { ErrorMessage, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { NFT } from 'types/nft'
import { toastify } from 'utils/toastify'
import * as Yup from 'yup'
import Button from '../components/styled/Button'

function MainLogo() {
  return <img src="/images/mucitadel-beta.svg" className="object-cover" alt="MemeUnity Logo" />
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

function GenericTextField(props: {
  setFieldValue: (key: string, value: string) => any
  identifier: string
  placeholder: string
  textarea: boolean
  username: boolean
  discord: boolean
}) {
  const className =
    'bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover focus:outline-none transition-colors duration-75 px-4 py-2 rounded-lg shadow-md mt-2'
  const type = 'text'
  const name = props.identifier
  const placeholder = props.placeholder + ''
  const onChange = (e) => {
    props.setFieldValue(props.identifier, e.target.value)
  }
  const inputProps = { className, type, name, placeholder, onChange }

  const field = (() => {
    if (props.username)
      return (
        <div className="flex">
          <div className="rounded-l-md flex justify-center items-center w-10 bg-mainbg mt-2 font-bold font-title text-secondary shadow-md">
            @
          </div>
          <input
            type={type}
            name={props.identifier}
            placeholder={props.placeholder}
            onChange={onChange}
            className="bg-inputbg  focus:bg-inputbg-focus hover:bg-inputbg-hover focus:outline-none transition-colors duration-75 px-4 py-2 rounded-r-lg shadow-md mt-2 w-full"
          />
        </div>
      )
    if (props.discord) {
      return <input {...inputProps} />
    } else if (props.textarea) {
      return <textarea {...inputProps} />
    }
    return <input {...inputProps} />
    // return <textarea {...inputProps} placeholder={props.textarea} />
  })()

  return (
    <>
      {/* {props.textarea
      ? <textarea {...inputProps} />
      : props.username ?
        <input {...inputProps} />} */}
      {field}
      <ErrorMessage name={props.identifier}>{(msg) => <span className="text-xs text-red">{msg}</span>}</ErrorMessage>
    </>
  )
}

function Content(props: ContentProps) {
  function Title(props) {
    return <h1 className="text-2xl pb-4 font-bold font-title tracking-wide">{props.children}</h1>
  }

  function FooterElement(props) {
    return <div className="m-0 my-5 mx-10 sm:m-5 sm:w-72 flex flex-col box-border font-body">{props.children}</div>
  }

  const initialValues = {
    displayName: '',
    banner: '',
    profilePicture: '',
    email: '',
    username: '',
    twitter: '',
    telegram: '',
    discord: '',
    tiktok: '',
    website: '',
  }

  const websiteValidation = Yup.string()
    .trim()
    .url("Website must be a valid link (don't forget the https part)")
    .optional()

  const nameValidation = Yup.string()
    .min(5, 'Must be at least 5 characters long')
    .max(50, 'Must be 50 characters long or shorter.')
    .optional()

  const usernameValidation = Yup.string()
    .min(3, 'Use at least 5 characters')
    .max(16, 'Use no more than 16 characters.')
    .matches(
      /^[a-z](-[a-z0-9](-[a-z0-9])*)?(-[a-z0-9]|[a-z0-9])*(?:\.[a-z](-[a-z0-9](-[a-z0-9])*)?(-[a-z0-9]|[a-z0-9])*)*$/,
      'Invalid format.',
    )
    .optional()
  // .required()

  const discordValidation = Yup.string()
    .matches(/^((?!(discordtag|everyone|here)#)((?!@|#|:|```).{2,32})#\d{4})/, 'Invalid Discord username')
    .optional()

  return (
    <>
      <div className="sm:px-0 lg:px-10 xl:px-32 bg-asidebg">
        <div className="flex flex-col sm:max-w-2xl lg:max-w-max mx-auto sm:flex-row flex-wrap lg:flex-nowrap -m-5 pt-5 pb-10 text-center sm:text-left ">
          <FooterElement>
            <Title>Edit your profile</Title>
            {/* <p>All fields are optional.</p> */}
            {/* <p>Listen to our tales of woe and glory and stay in touch with the latest memes! Your info will remain safe. ☺️ </p> */}
            <Formik
              initialValues={initialValues}
              validationSchema={() =>
                Yup.object().shape({
                  displayName: nameValidation,
                  email: Yup.string().email().optional(),
                  banner: websiteValidation,
                  profilePicture: websiteValidation,
                  username: usernameValidation,
                  twitter: websiteValidation,
                  telegram: nameValidation,
                  discord: websiteValidation,
                  tiktok: websiteValidation,
                  website: websiteValidation,
                })
              }
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
                const entryPoint = baseUrl + '/v1/users/editprofile'

                var myHeaders = new Headers()
                myHeaders.append('Accept-Language', 'sl-SI')
                myHeaders.append('Authorization', 'Token: ' + 'await sign message')

                var urlencoded = new URLSearchParams()
                // typeof values.name && values.name.length && urlencoded.append('name', values.name)
                // urlencoded.append('email', values.email)
                // console.log(entryPoint, values)
                const myValues: [keyof typeof values, string][] =
                  'displayName,email,username,twitter,telegram,discord,tiktok,website'
                    .split(',')
                    .map((val) => [val, values[val]] as [keyof typeof values, string])
                    .filter((x) => typeof x[1] === 'string' && x[1].length)

                myValues.forEach((valTuple) => urlencoded.append(valTuple[0], valTuple[1]))

                var requestOptions: RequestInit = {
                  method: 'POST',
                  headers: myHeaders,
                  body: urlencoded,
                  redirect: 'follow' as 'follow',
                }

                fetch(entryPoint, requestOptions)
                  .then((response) => response.text())
                  .then((result) => (console.log(result), toastify('Altered profile successfully!')))
                  .catch((error) => console.log('error', error))
                setSubmitting(false)
              }}
            >
              {(props) => {
                const { handleSubmit, values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting } =
                  props

                return (
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                      {[
                        ['username', 'username', 'username'],
                        ['displayName', 'display name'],
                        // ['profilePicture', 'profile picture url'],
                        // ['banner', 'banner picture url'],
                        // ['email', 'email address'],
                        ['bio', 'about me', 'textarea'],
                        ['discord', 'discord username', 'newline', 'discord'],
                        ['twitter', 'twitter profile url', 'username'],
                        ['tiktok', 'tiktok profile url', 'username'],
                        ['telegram', 'telegram username', 'username'],
                        ['website', 'website url'],
                      ].map((pair) => (
                        // console.log(pair),
                        <>
                          <h2 className={(pair[2] === 'newline' ? 'mt-10' : 'mt-2') + ' text-lg'}>{pair[1]}</h2>
                          <GenericTextField
                            identifier={pair[0]}
                            placeholder=""
                            setFieldValue={setFieldValue}
                            key={pair[0]}
                            textarea={pair[2] === 'textarea'}
                            username={pair.includes('username')}
                            discord={pair.includes('discord')}
                          />
                        </>
                      ))}

                      {/* Email */}
                      <h2 className={'mt-10' + ' text-lg'}>email</h2>
                      <input
                        className="bg-inputbg mb-5 focus:bg-inputbg-focus hover:bg-inputbg-hover focus:outline-none transition-colors duration-75 px-4 py-2 rounded-lg shadow-md mt-2"
                        type="email"
                        name="email"
                        placeholder=""
                        onChange={(e) => {
                          setFieldValue('email', e.target.value)
                        }}
                      />
                      <ErrorMessage name="email">
                        {(msg) => <span className="text-xs text-red">{msg}</span>}
                      </ErrorMessage>

                      <Button className="mt-2 w-full" type="submit">
                        Emit changes
                      </Button>
                    </div>
                  </form>
                )
              }}
            </Formik>
          </FooterElement>
        </div>
      </div>
      {/* <SubFooter /> */}
    </>
  )
}

type ContentProps = {
  logIn: LogIn
  logOut: LogOut
  authData: AuthData
  hasMetamask: boolean
  nftList: NFT[]
}

export default function User(props: ContentProps) {
  const router = useRouter()
  const userAddress = router.query.user as string
  return (
    <div className="App text-white bg-mainbg min-h-screen font-body">
      <NavBar {...props} />
      <Content {...{ ...props }} />
      {/* <Footer /> */}
    </div>
  )
}
