import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import SideBarNavigation from './sidebar'
import DashboardHeader from './DashboardHeader'
import {
  setEditProfileModal,
  setSelectedImage,
  setUserProfile,
} from '@/slice/userSlice'
import {
  setListingDetail,
  setListings,
  setLoading,
  setModal,
  setTotalPages,
} from '@/slice/listingSlice'
import Image from 'next/image'
import TextareaField from '@/hooks/Textarea'
import InputField from '@/hooks/InputField'
import SelectField from '@/hooks/SelectField'
import Button from '@/hooks/button'

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch()
  const [selectedPictures, setSelectedPictures] = useState([])
  const [previewPictures, setPreviewPictures] = useState([])
  const numbers = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
  ]

  const loading = useSelector((state) => state.listings.loading)
  const userProfile = useSelector((state) => state.user.userProfile)
  const editProfileModal = useSelector((state) => state.user.editProfileModal)
  const selectedImage = useSelector((state) => state.user.selectedImage)
  const modal = useSelector((state) => state.listings.modal)
  const listingDetails = useSelector((state) => state.listings.listingDetail)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        const base64Image = reader.result
        dispatch(setSelectedImage(base64Image))
      }
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const updateUserProfile = async (values) => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const updatedProfile = {
      ...userProfile,
      ...values,
      avatarUrl: selectedImage || userProfile?.avatarUrl,
    }

    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/profile?userId=${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProfile),
        }
      )

      const data = await response.json()

      if (data?.status === true) {
        dispatch(setUserProfile(updatedProfile))
        dispatch(setLoading(false))
        toast.success(data.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        })
        dispatch(setEditProfileModal(false))
      } else {
        toast.failure('Failed to update your profile', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const updateListingReq = async (values) => {
    let updateListing = {
      ...listingDetails,
      ...values,
    }

      if (previewPictures.length > 0) {
        const combinedImages = [...listingDetails.images, ...previewPictures]
        updateListing = {
          ...updateListing,
          images: combinedImages,
        }
      }

    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/listings/${listingDetails._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateListing),
        }
      )
      const data = await response.json()

      if (data.status === true) {
        dispatch(setListingDetail(updateListing))
        dispatch(setLoading(false))
        toast.success('Your listing has been updated successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        })
        dispatch(setModal(false))
      } else {
        toast.failure('Failed to update this listing', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getRentingListings = async (page) => {
      try {
        const response = await fetch(
          `${process.env.API_ENDPOINT_RENDER}/api/listings?page=${page}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()

        if (data.status === true) {
          dispatch(setListings(data.listings))
          dispatch(setLoading(false))
          dispatch(setTotalPages(data.totalPages))
        } else {
          console.log('there is an error')
        }
      } catch (error) {
        console.error(error)
      }
    }

    getRentingListings()
  }, [dispatch])

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
      <Head>
        <title>Dashboard | Discover Your Dream Home: Untitlted Realty</title>
        <meta
          name='description'
          content='Embark on a remarkable real estate journey with XYZ Realty. Explore a vast collection of extraordinary properties, from luxurious estates to charming starter homes. Our expert agents are ready to guide you every step of the way. Start your search today and find the perfect place to call home.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex w-full relative'>
        <SideBarNavigation />
        <main className='2xl:w-[83%] xl:w-[83%] lg:w-[83%] md:w-full sm:w-full bg-white absolute top-0 right-0 h-screen '>
          <DashboardHeader />
          {children}
        </main>

        {editProfileModal && (
          <>
            <div
              className='bg-[#000000d8] fixed w-full h-full top-0 left-0 '
              onClick={() => dispatch(setEditProfileModal(false))}
            ></div>
            <section
              className='absolute top-0 bg-white rounded-lg flex flex-col gap-7 2xl:m-auto 2xl:w-[70%] 2xl:p-10 2xl:left-[15rem] xl:w-[70%] xl:left-[11rem] md:w-full md:left-0 
              md:p-10 sm:p-5 sm:w-full sm:top-0 sm:left-0 sm:m-0'
            >
              <div className='flex justify-start items-center gap-4 lg:flex-row md:flex-row sm:flex-row'>
                <Image
                  src={
                    selectedImage ||
                    userProfile?.avatarUrl ||
                    'https://via.placeholder.com/500'
                  }
                  alt='Profile Picture'
                  width={1000}
                  height={1000}
                  className='rounded-full p-[2px] bg-color3 object-cover 2xl:h-[130px] 2xl:w-[130px] xl:w-[130px] xl:h-[130px] md:w-[120px] 
                  md:h-[120px] sm:w-[100px] sm:h-[100px] '
                />
                <div className='flex flex-row justify-start items-start gap-5'>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                    id='upload-input'
                  />
                  <label
                    htmlFor='upload-input'
                    className='border h-[40px] px-4 rounded-lg font-semibold cursor-pointer flex justify-center items-center hover:bg-[#F30A49] hover:text-white'
                  >
                    Upload
                  </label>
                </div>
              </div>

              <Formik
                initialValues={userProfile}
                onSubmit={(values) => {
                  updateUserProfile(values)
                }}
              >
                <Form className='flex flex-col gap-5 w-full'>
                  <div className='flex flex-col gap-3'>
                    <label htmlFor='bio' className='font-medium'>
                      Bio:
                    </label>
                    <Field
                      as='textarea'
                      id='bio'
                      name='bio'
                      rows={4}
                      cols={50}
                      className='border border-gray-400 outline-none p-2 rounded-lg'
                    />
                  </div>
                  <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5'>
                    <div className='flex flex-col gap-3'>
                      <label htmlFor='username' className='font-medium'>
                        Username
                      </label>
                      <Field
                        type='text'
                        name='username'
                        className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
                      />
                    </div>

                    <div className='flex flex-col gap-3'>
                      <label htmlFor='email' className='font-medium'>
                        Email
                      </label>
                      <Field
                        type='email'
                        name='email'
                        disabled
                        className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
                      />
                    </div>
                  </div>

                  <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5'>
                    <div className='flex flex-col gap-3'>
                      <label htmlFor='firstname' className='font-medium'>
                        First name
                      </label>
                      <Field
                        type='text'
                        name='firstname'
                        className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
                      />
                    </div>
                    <div className='flex flex-col gap-3'>
                      <label htmlFor='lastname' className='font-medium'>
                        Last Name
                      </label>
                      <Field
                        type='text'
                        name='lastname'
                        className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
                      />
                    </div>
                  </div>

                  <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5'>
                    <div className='flex flex-col gap-3'>
                      <label htmlFor='address' className='font-medium'>
                        Address
                      </label>
                      <Field
                        type='text'
                        name='address'
                        className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
                      />
                    </div>
                    <div className='flex flex-col gap-3'>
                      <label htmlFor='state' className='font-medium'>
                        State
                      </label>
                      <Field
                        type='text'
                        name='state'
                        className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
                      />
                    </div>
                  </div>

                  <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5'>
                    <div className='flex flex-col gap-3'>
                      <label htmlFor='phoneNumber' className='font-medium'>
                        Phone Number
                      </label>
                      <Field
                        type='text'
                        name='phoneNumber'
                        className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
                      />
                    </div>
                    <div className='flex flex-col gap-3'>
                      <label htmlFor='dob' className='font-medium'>
                        Date of birth
                      </label>
                      <Field
                        type='date'
                        id='dob'
                        name='dob'
                        className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
                      />
                    </div>
                  </div>

                  <button
                    type='submit'
                    className='bg-color3 text-white px-4 py-2 rounded-lg  h-[45px] flex justify-center items-center ml-auto xl:mt-10 lg:mt-5 lg:w-[150px] 
                    md:w-[150px] sm:w-full '
                  >
                    {loading ? 'Loading...' : 'Save'}
                  </button>
                </Form>
              </Formik>
            </section>
          </>
        )}

        {modal && (
          <>
            <div
              className='bg-[#000000d8] fixed w-full h-full top-0 left-0 '
              onClick={() => dispatch(setModal(false))}
            ></div>
            <section
              className='absolute top-0 bg-white rounded-lg flex flex-col gap-7 3xl:w-[50%] 3xl:left-[25rem] 2xl:m-auto 2xl:w-[60%] 2xl:p-10 2xl:left-[15rem] xl:w-[70%] xl:left-[11rem] xl:top-8 md:w-full md:left-0 
              md:p-10 sm:p-5 sm:w-full sm:top-0 sm:left-0 sm:m-0'
            >
              <Formik
                initialValues={listingDetails}
                onSubmit={(values) => {
                  updateListingReq(values)
                }}
              >
                <Form className='flex flex-col gap-5 w-full'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='title' className='font-medium'>
                      Title
                    </label>
                    <InputField
                      type='text'
                      name='title'
                      id='title'
                      className='w-full'
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='description' className='font-medium'>
                      Description
                    </label>
                    <TextareaField
                      name='description'
                      id='description'
                      row={5}
                      className='w-full text-base p-2 indent-0'
                    />
                  </div>

                  <div className='flex w-full xl:justify-between xl:flex-row md:flex-col sm:flex-col gap-2'>
                    <div className='flex flex-col gap-2 w-full'>
                      <label htmlFor='address' className='font-medium'>
                        Address
                      </label>
                      <InputField
                        type='text'
                        name='address'
                        id='address'
                        className='w-full'
                      />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                      <label htmlFor='price' className='font-medium'>
                        Price
                      </label>
                      <InputField
                        type='number'
                        name='price'
                        id='price'
                        className='w-full'
                      />
                    </div>
                  </div>

                  <div className='flex w-full xl:justify-between xl:flex-row md:flex-col sm:flex-col gap-2'>
                    <div className='flex flex-col gap-2 w-full'>
                      <label htmlFor='bedrooms' className='font-medium'>
                        Bedrooms
                      </label>
                      <SelectField
                        options={numbers.map((x) => x)}
                        name='bedrooms'
                        id='bedrooms'
                        className='w-full'
                      />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                      <label htmlFor='bathroom' className='font-medium'>
                        Bathrooms
                      </label>
                      <SelectField
                        options={numbers.map((x) => x)}
                        name='bathroom'
                        id='bathroom'
                        className='w-full'
                      />
                    </div>
                  </div>

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

                  <div className='grid gap-2 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 '>
                    {listingDetails?.images?.map((img, index) => {
                      return (
                        <Image
                          key={index}
                          src={img}
                          alt={`Preview`}
                          width={1000}
                          height={1000}
                          className='object-cover rounded-md 2xl:h-[200px] xl:h-[150px] lg:h-[150px] md:h-[120px]
                      w-full sm:h-[100px] '
                        />
                      )
                    })}
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
                  <Button
                    type='submit'
                    label='Save'
                    name='submit'
                    className='rounded-md'
                  />
                </Form>
              </Formik>
            </section>
          </>
        )}
      </div>
    </>
  )
}

export default DashboardLayout
