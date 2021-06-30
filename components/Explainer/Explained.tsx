import { useState } from 'react'
import Explainer from '.'

export default function Explained(props: {
  children: any
  explanation: string
  onClick?: () => void
  className?: string
  href?: string
}) {
  const [hidden, setHidden] = useState(true)
  const hide = () => setHidden(true)
  const show = () => setHidden(false)
  return (
    <>
      {!props.href ? (
        <div
          onClick={props.onClick}
          onMouseEnter={show}
          onMouseLeave={hide}
          className={
            'relative cursor-pointer px-4 h-full flex items-center justify-center hover:bg-asidebg-hover' +
            (' ' + props.className || '')
          }
        >
          {props.children}
          <Explainer hidden={hidden} href={props.href}>
            {props.explanation}
          </Explainer>
        </div>
      ) : (
        <a
          href={props.href}
          target="_blank"
          onClick={props.onClick}
          onMouseEnter={show}
          onMouseLeave={hide}
          className={
            'relative cursor-pointer px-4 h-full flex items-center justify-center hover:bg-asidebg-hover' +
            (' ' + props.className || '')
          }
        >
          {props.children}
          <Explainer hidden={hidden} href={props.href}>
            {props.explanation}
          </Explainer>
        </a>
      )}
    </>
  )
}
