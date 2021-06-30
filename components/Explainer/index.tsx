export default function Explainer(props: { hidden: boolean; children: any; href?: string }) {
  return (
    <>
      {!props.href ? (
        <div
          className={
            props.hidden
              ? 'hidden'
              : 'py-1 px-2 text-sm bg-explanation1 text-white absolute top-14 right-4 rounded-md min-w-max'
          }
        >
          {props.children}
        </div>
      ) : (
        <a
          href={props.href}
          target="_blank"
          className={
            props.hidden
              ? 'hidden'
              : 'py-1 px-2 text-sm bg-explanation1 text-white absolute top-14 right-4 rounded-md min-w-max'
          }
        >
          {props.children}
        </a>
      )}
    </>
  )
}
