import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React from 'react'
import MemeCreationForm from './MemeCreationForm'

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: `calc(100vh - 60px)`,
  },
  form: {
    maxHeight: `calc(100vh - 116px)`,
  },
}))

export default function MintModal(props: {
  visible: boolean
  role: 'user' | 'admin' | 'guest'
  address: string
  closeMintModal: () => void
}) {
  const classes = useStyles()
  return (
    <div
      className={
        !props.visible
          ? 'hidden'
          : 'fixed origin-top-left top-0 left-0 z-20 h-screen w-full max-h-full pt-6 pb-6 pl-2 pr-2 max-h-screen'
      }
    >
      <div className="flex items-center justify-center h-full w-full">
        <div className="bg-mainbg rounded-xl w-full max-h-full max-w-max shadow-2xl">
          <div
            className={clsx('text-title text-secondary text-lg font-semibold justify-around max-w-max', classes.root)}
          >
            <div className="w-full flex justify-between">
              <div className="px-10 flex justify-around items-center">Create Meme NFT Token</div>
              <div
                className="w-14 h-14 flex justify-around cursor-pointer items-center hover:bg-asidebg hover:text-white"
                onClick={props.closeMintModal}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
            {/* <div className="max-w-max pb-3">Choose your login method:</div> */}
            <div className={clsx('space-x-5 py-10 bg-asidebg max-w-7xl p-8 overflow-auto', classes.form)}>
              <MemeCreationForm role={props.role} closeModal={props.closeMintModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
