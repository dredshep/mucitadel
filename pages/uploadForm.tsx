// import { Button } from '@material-ui/core'
import Button from 'components/styled/Button'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row' as 'row',
  flexWrap: 'wrap' as 'wrap',
  marginTop: 16,
}

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box' as 'border-box',
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
}

function Previews(props) {
  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    // maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
  })

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ))

  const alertFile = async () => (location.href = window.URL.createObjectURL(files[0]))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files],
  )

  return (
    <section className="container ml-10">
      <div
        {...getRootProps({
          className:
            'dropzone border-dashed rounded-lg w-40 h-40 p-3 font-body text-secondary border-2 border-mupurpleselect-none cursor-pointer hover:bg-asidebg-hover hover:border-mupurple-hover hover:text-secondary-hover active:bg-asidebg-active',
        })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      {files.length ? <Button onClick={alertFile}>Submit (to me)</Button> : undefined}
    </section>
  )
}

export default function uploadForm() {
  return (
    <div className="App min-h-screen w-full bg-mainbg mt-0 pt-10">
      {/* <Head>
        <style>{'body { margin-top: 0 }'}</style>
      </Head> */}
      {/* <div className="bg-asidebg h-40 w-40 mx-auto"> */}
      <Previews />
      {/* </div> */}
    </div>
  )
}
