import Button from 'components/styled/Button'
import React, { useEffect, useState } from 'react'

export default function CookieModal() {
  const [showCookieModal, setShowCookieModal] = useState(true)
  useEffect(function () {
    const boolStr = localStorage.getItem('hasRemoved')
    const bool = JSON.parse(boolStr)
    if (!bool) setShowCookieModal(true)
    else setShowCookieModal(false)
  }, [])
  function closeCookieModal() {
    localStorage.setItem('hasRemoved', 'true')
    setShowCookieModal(false)
  }
  return (
    <div className="w-full fixed origin-bottom-left bottom-3  z-10 ">
      <div
        className={
          !showCookieModal
            ? 'hidden'
            : ' mx-10 bg-white rounded-xl opacity-90 text pl-6 h-22 text-mainbg flex flex-col items-center overflow-hidden cursor-default font-body px-10 py-5 text-center'
        }
      >
        <h1 className="font-title text-lg font-bold mb-3">Welcome to MU Citadel open beta 0.9</h1>
        This is our Open Beta, meaning that some functions may respond in a different manner than intended. If you find
        any bugs, please use the bug reporting button on the top right to report it. Enjoy the Citadel!
        <br />
        We use cookies 🍪
        <span
          className="h-10 flex items-center w-10 justify-center cursor-pointer hover:text-mupurple mt-3"
          onClick={closeCookieModal}
        >
          <Button className="flex items-center space-x-3">
            <div>Alright!</div> {/* <FontAwesomeIcon icon={faTimes} /> */}
          </Button>
        </span>
      </div>
    </div>
  )
}
