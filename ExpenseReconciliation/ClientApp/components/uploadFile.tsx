import React, { useEffect, useState } from 'react'
import Card from './Card'
import Icon from './Icon'

const UploadFile = () => {
  const [badFile, setBadFile] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (badFile === true) {
      timeout = setTimeout(() => {
        setBadFile(false)
      }, 4000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [badFile])

  const handleChange = (event: any) => {
    const reader = new FileReader()

    const file: File = event.target.files[0]

    reader.onloadend = () => {
      sendFile(reader.result)
    }

    if (file && file.size < 100000 && file.name.endsWith('.ofx')) {
      reader.readAsText(file)
    } else {
      setBadFile(true)
    }
  }

  const sendFile = async (file: string | ArrayBuffer) => {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: file,
    })

    if (response.status !== 201 && !response.ok) {
      setBadFile(true)
    }
  }

  const uploadBar = (
    <label className='w-full h-full cursor-pointer'>
      <Icon icon='upload' classes='w-20 mx-auto' />
      <input type='file' className='hidden' onChange={handleChange} />
      <p className='text-center font-semibold'>Upload transactions file</p>
    </label>
  )

  const badFileBar = (
    <div className='text-red-400'>
      <Icon icon='cross' classes='w-20 mx-auto animate-bounce' />
      <p className='text-center font-bold'>Was not able to upload file</p>
    </div>
  )

  return <Card link={true}>{badFile ? badFileBar : uploadBar}</Card>
}

export default UploadFile
