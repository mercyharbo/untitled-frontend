import { useState } from 'react'

const UploadPictures = () => {
  const [selectedPictures, setSelectedPictures] = useState([])
  const [previewPictures, setPreviewPictures] = useState([])

  const handlePictureSelect = async (event) => {
    const files = event.target.files
    const selected = Array.from(files)
    setSelectedPictures(selected)

    const previews = await Promise.all(
      selected.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve(reader.result)
          }
          reader.readAsDataURL(file)
        })
      })
    )
    setPreviewPictures(previews)
  }

  return (
    <div>
      {!selectedPictures && <div className='flex flex-col h-auto justify-center items-center gap-4'>
        <label
          htmlFor='upload'
          className='cursor-pointer border py-2 px-5 capitalize flex  justify-center items-center font-medium rounded-md'
        >
          Upload listing images
          <input
            id='upload'
            type='file'
            multiple
            onChange={handlePictureSelect}
            style={{ display: 'none' }}
          />
        </label>
        <span className='w-[50%] text-center text-sm '>
          Select at least 3 pictures of your listing and maximium of 10 picture
          per listing.{' '}
        </span>
      </div>}
      <div className='grid 2xl:grid-cols-4 xl:gap-5 2xl:py-5 '>
        {previewPictures.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Preview ${index}`}
            className='object-cover rounded-md'
          />
        ))}
      </div>
    </div>
  )
}

export default UploadPictures
