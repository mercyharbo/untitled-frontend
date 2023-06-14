import { setAddListingModal } from '@/slice/listingSlice'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Field, Form, Formik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const AddListingModal = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [step, setStep] = useState(1)
  const [bedrooms, setBedrooms] = useState(null)
  const [bathrooms, setBathrooms] = useState(null)
  const [isNewProperty, setIsNewProperty] = useState(false)
  const [isPropertyForSale, setIsPropertyForSale] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [selectedPictures, setSelectedPictures] = useState([])
  const [previewPictures, setPreviewPictures] = useState([])
  const [errorMsg, setErrorMsg] = useState([])
  console.log(errorMsg, 'as err')

  const addListingModal = useSelector((state) => state.listings.addListingModal)

  const initialValues = {
    title: '',
    description: '',
    address: '',
    price: '',
    areaSpace: '',
  }

  const numbers = [1, 2, 3, 4, 5]

  const amenities = [
    'Swimming pool',
    'Garden',
    'Garage',
    'Fireplace',
    'Balcony',
    'Fitness center',
    'Home theater',
    'Study room',
    'Laundry room',
    'Walk-in closet',
    'Smart home technology',
    'Security system',
    'Outdoor BBQ area',
    'Spa or hot tub',
    'Game room',
  ]

  const handleNext = () => {
    setStep(step + 1)
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleReset = () => {
    setStep(1)
  }

  const handleSubmit = async (values) => {
    try {
      // Perform the post request to the backend with the collected form values
      const response = await fetch('http://localhost:3000/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          bedrooms: bedrooms,
          bathroom: bathrooms,
          isNewProperty: isNewProperty,
          isPropertyForSale: isPropertyForSale,
          amenities: selectedAmenities,
          images: previewPictures,
        }),
      })

      const data = await response.json()

      if (data.status === true) {
        toast.success('You listing as been posted successfully')
        router.reload(window.location.pathname)
      } else {
        // toast.failure(data.errors)
        setErrorMsg(data.errors)
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAmenitySelect = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((item) => item !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

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
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-[#000000dd] overflow-auto bg-opacity-50 ${
        addListingModal ? '' : 'hidden'
      }`}
    //   onClick={() => dispatch(setAddListingModal(false))}
    >
      <main
        className=' flex flex-col justify-center items-center m-auto bg-white shadow-2xl rounded-lg 2xl:relative 2xl:top-[0] 2xl:left-[0] 2xl:w-[60%] 
      xl:w-[80%] lg:w-[80%] xl:my-5 xl:p-8 lg:relative lg:top-0 lg:p-10 md:relative md:top-0 md:w-full md:mx-10 sm:mx-2 sm:w-full sm:relative sm:top-0'
      >
        <button
          type='button'
          onClick={() => dispatch(setAddListingModal(false))}
          className='flex justify-end items-end ml-auto p-2'
        >
          <FontAwesomeIcon icon={faClose} className='text-[25px]' />
        </button>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className='w-full'>
            {step === 1 && (
              <div className='flex flex-col justify-start items-start gap-7 sm:p-5'>
                <div className='flex flex-col gap-3'>
                  <h2 className='text-xl '>
                    Add listing title and description
                  </h2>
                  <p>
                    Provides machants with detailed information of your list to
                    make them know more about your offer.
                  </p>
                </div>
                <div className='flex flex-col justify-start items-start gap-2 w-full'>
                  <label htmlFor='title' className='font-semibold'>
                    Title
                  </label>
                  <Field
                    type='text'
                    id='title'
                    name='title'
                    className='border h-[40px] rounded-md w-full outline-[#F30A49] indent-2 '
                  />
                </div>
                <div className='flex flex-col justify-start items-start gap-2 w-full'>
                  <label htmlFor='description' className='font-semibold'>
                    Description
                  </label>
                  <Field
                    as='textarea'
                    id='description'
                    name='description'
                    className='h-[150px] border rounded-md w-full outline-[#F30A49] p-2 '
                  />
                </div>
                <button
                  type='button'
                  onClick={handleNext}
                  className='bg-[#F30A49] text-white py-2 px-5 rounded-md flex justify-end items-end ml-auto '
                >
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div className='flex flex-col justify-start items-start gap-7 sm:p-5 '>
                <div className='flex flex-col gap-3'>
                  <h2 className='text-xl '>Fill all the required</h2>
                  <p>
                    Machants will want to know the price, address, and length of
                    their new home.
                  </p>
                </div>
                <div className='flex flex-col justify-start items-start gap-2 w-full'>
                  <label htmlFor='address' className='font-semibold'>
                    Location:
                  </label>
                  <Field
                    type='text'
                    id='address'
                    name='address'
                    className='border h-[40px] rounded-md w-full outline-[#F30A49] indent-3 '
                  />
                </div>

                <div className='grid grid-cols-2 gap-5 w-full'>
                  <div className='flex flex-col justify-start items-start gap-2 w-full'>
                    <label htmlFor='price' className='font-semibold'>
                      Price:
                    </label>
                    <Field
                      type='number'
                      id='price'
                      name='price'
                      className='border h-[40px] rounded-md w-full outline-[#F30A49] indent-3 '
                    />
                  </div>

                  <div className='flex flex-col justify-start items-start gap-2 w-full'>
                    <label htmlFor='areaSpace' className='font-semibold'>
                      Area Space:
                    </label>
                    <Field
                      type='number'
                      id='areaSpace'
                      name='areaSpace'
                      className='border h-[40px] rounded-md w-full outline-[#F30A49] indent-3 '
                    />
                  </div>
                </div>

                <div className='flex justify-center items-center gap-4 ml-auto '>
                  <button
                    type='button'
                    onClick={handlePrevious}
                    className='bg-gray-400 text-white py-2 px-5 rounded-md '
                  >
                    Prev
                  </button>

                  <button
                    onClick={handleNext}
                    className='bg-[#F30A49] text-white py-2 px-5 rounded-md '
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className='flex flex-col justify-start items-start gap-7 sm:p-5  '>
                {previewPictures && (
                  <div className='flex flex-col h-auto justify-center items-center gap-4 w-full'>
                    <label
                      htmlFor='upload'
                      className='cursor-pointer border py-2 px-5 capitalize flex  justify-center items-center font-medium rounded-md'
                    >
                      Upload
                      <input
                        id='upload'
                        type='file'
                        multiple
                        onChange={handlePictureSelect}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <span className='xl:w-[50%] text-center text-sm '>
                      Select at least 3 pictures of your listing and maximium of
                      10 picture per listing.{' '}
                    </span>
                  </div>
                )}

                <div className='grid 2xl:grid-cols-5 2xl:py-5 xl:grid-cols-4 lg:grid-cols-3 lg:gap-5 md:grid-cols-2 md:gap-5 sm:grid-cols-2 sm:gap-5 w-full '>
                  {previewPictures.map((preview, index) => (
                    <Image
                      key={index}
                      src={preview}
                      alt={`Preview ${index}`}
                      width={1000}
                      height={1000}
                      className='object-cover rounded-md 2xl:h-[200px] xl:h-[150px] lg:h-[150px] md:h-[120px]
                      w-full sm:h-[100px] '
                    />
                  ))}
                </div>

                <div className='flex justify-center items-center gap-4 ml-auto '>
                  <button
                    type='button'
                    onClick={handlePrevious}
                    className='bg-gray-400 text-white py-2 px-5 rounded-md '
                  >
                    Prev
                  </button>

                  <button
                    onClick={handleNext}
                    className='bg-[#F30A49] text-white py-2 px-5 rounded-md '
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className='flex flex-col xl:justify-start xl:items-start gap-7 sm:p-5 '>
                <h2 className='xl:text-xl '>Fill all the required</h2>

                <div className='flex flex-col justify-start items-start gap-2 w-full'>
                  <label htmlFor='amenities' className='font-semibold'>
                    Amenities:
                  </label>
                  <div className='flex flex-wrap gap-5'>
                    {amenities.map((amenty, index) => {
                      return (
                        <button
                          key={index}
                          type='button'
                          className={`${
                            selectedAmenities.includes(amenty)
                              ? 'bg-[#F30A49] text-white'
                              : 'bg-transparent'
                          } border p-1 px-3 rounded-md`}
                          onClick={() => handleAmenitySelect(amenty)}
                        >
                          {amenty}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className='flex flex-col justify-start items-start gap-2 w-full'>
                  <label htmlFor='bedrooms' className='font-semibold'>
                    Bedrooms:
                  </label>
                  <div className='flex gap-5'>
                    {numbers.map((num, index) => {
                      return (
                        <button
                          key={index}
                          type='button'
                          className={`${
                            bedrooms === num
                              ? 'bg-[#F30A49] text-white'
                              : 'bg-transparent'
                          } border p-1 px-3 rounded-md`}
                          onClick={() => setBedrooms(num)}
                        >
                          {num}+
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className='flex flex-col justify-start items-start gap-2 w-full'>
                  <label htmlFor='bathrooms' className='font-semibold'>
                    Bathrooms:
                  </label>
                  <div className='flex gap-5'>
                    {numbers.map((num, index) => {
                      return (
                        <button
                          key={index}
                          type='button'
                          className={`${
                            bathrooms === num
                              ? 'bg-[#F30A49] text-white'
                              : 'bg-transparent'
                          } border p-1 px-3 rounded-md`}
                          onClick={() => setBathrooms(num)}
                        >
                          {num}+
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className='flex flex-col gap-4'>
                  <label htmlFor='isNewProperty' className='font-semibold'>
                    Is this a newly built and used property?
                  </label>
                  <div className='flex gap-4'>
                    <button
                      type='button'
                      onClick={() => setIsNewProperty(true)}
                      className={`${
                        isNewProperty === true
                          ? 'bg-[#F30A49] text-white p-2 px-5 rounded-md '
                          : 'border px-5 py-2 rounded-md'
                      }`}
                    >
                      Newly Built
                    </button>
                    <button
                      type='button'
                      onClick={() => setIsNewProperty(false)}
                      className={`${
                        isNewProperty === false
                          ? 'bg-[#F30A49] text-white p-2 px-5 rounded-md '
                          : 'border px-5 py-2 rounded-md'
                      }`}
                    >
                      Used Property
                    </button>
                  </div>
                </div>

                <div className='flex flex-col gap-4'>
                  <label htmlFor='isNewProperty' className='font-semibold'>
                    Is this property for sale or rent?
                  </label>
                  <div className='flex gap-4'>
                    <button
                      type='button'
                      onClick={() => setIsPropertyForSale(true)}
                      className={`${
                        isPropertyForSale === true
                          ? 'bg-[#F30A49] text-white p-2 px-5 rounded-md '
                          : 'border px-5 py-2 rounded-md'
                      }`}
                    >
                      Sale
                    </button>
                    <button
                      type='button'
                      onClick={() => setIsPropertyForSale(false)}
                      className={`${
                        isPropertyForSale === false
                          ? 'bg-[#F30A49] text-white p-2 px-5 rounded-md '
                          : 'border px-5 py-2 rounded-md'
                      }`}
                    >
                      Rent
                    </button>
                  </div>
                </div>

                <div className=''>
                  {errorMsg.map((err, index) => {
                    return (
                      <li key={index} className='text-[#F30A49]'>
                        {err}
                      </li>
                    )
                  })}
                </div>

                <div className='flex justify-center items-center gap-4 ml-auto '>
                  <button
                    type='button'
                    onClick={handlePrevious}
                    className='bg-gray-400 text-white py-2 px-5 rounded-md '
                  >
                    Prev
                  </button>

                  <button
                    type='submit'
                    className='bg-[#F30A49] text-white py-2 px-5 rounded-md '
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </main>
    </div>
  )
}

export default AddListingModal
