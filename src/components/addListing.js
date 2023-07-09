import { setAddListingModal } from '@/slice/listingSlice'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Field, Form, Formik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const propertyType = [
  { id: 1, name: 'House' },
  { id: 2, name: 'Apartment' },
  { id: 3, name: 'House' },
  { id: 4, name: 'Villa' },
  { id: 5, name: 'Self-contain' },
  { id: 6, name: 'Duplex' },
  { id: 7, name: 'Bungalow' },
]

const paymentOption = [
  { id: 1, name: 'Daily' },
  { id: 2, name: 'Monthly' },
  { id: 3, name: 'Annually' },
]

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
  const [categories, setCategories] = useState(propertyType)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null)

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
    'Washer', 
    'Dryer', 
    'Dishwasher',
    'Microwave',
    'Fridge',
    'Freeze',
    'Oven',
    'Gas Cooker',
    'Smart TV',
    'Gym',
    'Sauna',
    'Parking Space',
    '24/7 Electricity',
    'Free Wi-Fi',
    'Air Condition'
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

  // Function to handle category selection
  const handleCategorySelection = (categoryId) => {
    setSelectedCategoryId(categoryId)
  }

  // Function to handle payment option selection
  const handlePaymentOptionSelection = (optionId) => {
    setSelectedPaymentOption(optionId)
  }

  const handleSubmit = async (values) => {
    const userId = localStorage.getItem('userId')
    try {
      // Perform the post request to the backend with the collected form values
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/listings`,
        {
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
            propertyType: selectedCategoryId,
            paymentOption: selectedPaymentOption,
            userId: userId,
          }),
        }
      )

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
    <>
      <div className='bg-[#000000b1] fixed top-0 left-0 w-full h-screen z-10 overflow-hidden '></div>
      <main
        className='flex flex-col justify-start items-start gap-2 mx-auto absolute bg-white rounded-md shadow-2xl z-20 3xl:w-[50%] 2xl:w-[60%] xl:w-[70%] 
        xl:left-1/2 xl:top-[2rem] xl:transform xl:-translate-x-1/2 xl:-translate-y-[2rem] md:w-full sm:w-full '
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
                  <label htmlFor='title' className='font-medium'>
                    Title
                  </label>
                  <Field
                    type='text'
                    id='title'
                    name='title'
                    className='border h-[40px] rounded-md w-full outline-color3 indent-2 '
                  />
                </div>
                <div className='flex flex-col justify-start items-start gap-2 w-full'>
                  <label htmlFor='description' className='font-medium'>
                    Description
                  </label>
                  <Field
                    as='textarea'
                    id='description'
                    name='description'
                    className='h-[150px] border rounded-md w-full outline-color3 p-2 '
                  />
                </div>
                <button
                  type='button'
                  onClick={handleNext}
                  className='bg-color3 text-white py-2 px-5 rounded-md flex justify-end items-end ml-auto '
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
                  <label htmlFor='address' className='font-medium'>
                    Location:
                  </label>
                  <Field
                    type='text'
                    id='address'
                    name='address'
                    className='border h-[40px] rounded-md w-full outline-color3 indent-3 '
                  />
                </div>

                <div className='grid grid-cols-2 gap-5 w-full'>
                  <div className='flex flex-col justify-start items-start gap-2 w-full'>
                    <label htmlFor='price' className='font-medium'>
                      Price:
                    </label>
                    <Field
                      type='number'
                      id='price'
                      name='price'
                      className='border h-[40px] rounded-md w-full outline-color3 indent-3 '
                    />
                  </div>

                  <div className='flex flex-col justify-start items-start gap-2 w-full'>
                    <label htmlFor='areaSpace' className='font-medium'>
                      Area Space:
                    </label>
                    <Field
                      type='number'
                      id='areaSpace'
                      name='areaSpace'
                      className='border h-[40px] rounded-md w-full outline-color3 indent-3 '
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
                    className='bg-color3 text-white py-2 px-5 rounded-md '
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

                <div className='grid 2xl:grid-cols-5 2xl:py-5 xl:grid-cols-4 lg:grid-cols-3 lg:gap-5 md:grid-cols-4 md:gap-5 sm:grid-cols-2 sm:gap-5 w-full '>
                  {previewPictures.map((preview, index) => (
                    <Image
                      key={index}
                      src={preview}
                      alt={`Preview ${index}`}
                      width={1000}
                      height={1000}
                      className='object-cover rounded-md 2xl:h-[200px] xl:h-[150px] lg:h-[150px] md:h-[150px]
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
                    className='bg-color3 text-white py-2 px-5 rounded-md '
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
                  <label htmlFor='amenities' className='font-medium'>
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
                              ? 'bg-color3 text-white'
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
                  <label htmlFor='bedrooms' className='font-medium'>
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
                              ? 'bg-color3 text-white'
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
                  <label htmlFor='bathrooms' className='font-medium'>
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
                              ? 'bg-color3 text-white'
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
                  <label htmlFor='isNewProperty' className='font-medium'>
                    Property Status:
                  </label>
                  <div className='flex gap-4'>
                    <button
                      type='button'
                      onClick={() => setIsNewProperty(true)}
                      className={`${
                        isNewProperty === true
                          ? 'bg-color3 text-white p-2 px-5 rounded-md '
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
                          ? 'bg-color3 text-white p-2 px-5 rounded-md '
                          : 'border px-5 py-2 rounded-md'
                      }`}
                    >
                      Used Property
                    </button>
                  </div>
                </div>

                <div className='flex flex-col gap-4'>
                  <label htmlFor='isNewProperty' className='font-medium'>
                    Is this property for sale or rent?
                  </label>
                  <div className='flex gap-4'>
                    <button
                      type='button'
                      onClick={() => setIsPropertyForSale(true)}
                      className={`${
                        isPropertyForSale === true
                          ? 'bg-color3 text-white p-2 px-5 rounded-md '
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
                          ? 'bg-color3 text-white p-2 px-5 rounded-md '
                          : 'border px-5 py-2 rounded-md'
                      }`}
                    >
                      Rent
                    </button>
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='propertyType' className='font-medium'>
                    Property Type
                  </label>
                  <div className='category-container flex flex-row gap-5 flex-wrap'>
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className={`${
                          selectedCategoryId === category.name
                            ? 'cursor-pointer bg-color3 text-white h-[40px] px-5 flex justify-center items-center rounded-full font-medium '
                            : 'flex justify-center items-center font-medium cursor-pointer bg-color2 h-[40px] px-5 rounded-full hover:bg-color3 hover:text-white '
                        } category-item`}
                        onClick={() => handleCategorySelection(category.id)}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='payment'>Payment Option:</label>
                  <div className='flex flex-wrap gap-2'>
                    {paymentOption.map((option) => (
                      <span
                        key={option.id}
                        className={`${
                          selectedPaymentOption === option.name
                            ? 'cursor-pointer bg-color3 text-white h-[40px] px-5 flex justify-center items-center rounded-full font-medium '
                            : 'flex justify-center items-center font-medium cursor-pointer bg-color2 h-[40px] px-5 rounded-full hover:bg-color3 hover:text-white '
                        } category-item`}
                        onClick={() => handlePaymentOptionSelection(option.id)}
                      >
                        {option.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className=''>
                  {Array.isArray(errorMsg) ? (
                    errorMsg.map((err, index) => (
                      <li key={index} className='text-color3'>
                        {err}
                      </li>
                    ))
                  ) : (
                    <li className='text-color3'>{errorMsg}</li>
                  )}
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
                    className='bg-color3 text-white py-2 px-5 rounded-md '
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </main>
    </>
  )
}

export default AddListingModal
