import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { setUserProfile } from '@/slice/userSlice'
import { useRouter } from 'next/router'
import { setLoading } from '@/slice/listingSlice'

import 'react-toastify/dist/ReactToastify.css'

const Profile = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [editProfileModal, setEditProfileModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [profileTab, setProfileTab] = useState('listings')

  const userProfile = useSelector((state) => state.user.userProfile)
  const loading = useSelector((state) => state.listings.loading)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        const base64Image = reader.result
        setSelectedImage(base64Image)
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
      avatarUrl: selectedImage,
    }

    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT}/api/profile?userId=${userId}`,
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
        dispatch(setUserProfile({ updatedProfile }))
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
        setEditProfileModal(false)
        // router.reload(window.location.pathname)
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

  if (loading) {
    return <p className=''>Loading...</p>
  }

  return (
    <>
      <Head>
        <title> Untitled Realty | {userProfile?.profile?.username}</title>
        <meta
          name='description'
          content='Access the exclusive realtor login at Untitled Realty and unlock your dream home. Discover personalized listings, powerful tools, and expert guidance to make your real estate journey a success. Join our network of top realtors and gain an edge in the competitive housing market.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main
        className='2xl:w-[70%] 2xl:my-10 xl:w-[70%] lg:p-10 md:w-[90%] md:p-10 md:my-10 sm:p-5 sm:w-[100%] sm:py-10 flex flex-col justify-start items-start gap-4 
      bg-white shadow-2xl rounded-lg mx-auto relative  '
      >
        <header className='flex flex-col justify-center items-center gap-5'>
          <div className='flex justify-start 2xl:items-center xl:items-center lg:items-center md:items-start sm:items-start gap-4 lg:flex-row md:flex-row sm:flex-col'>
            <Image
              src={
                selectedImage ||
                `https://untitled-frontend-peach.vercel.app/${userProfile?.avatarUrl}` ||
                'https://via.placeholder.com/500'
              }
              alt='Profile Picture'
              width={500}
              height={500}
              className='rounded-full p-[2px] bg-[#F30A49] object-cover 2xl:h-[130px] 2xl:w-[130px] xl:w-[80px] xl:h-[80px] md:w-[120px] md:h-[120px] 
              sm:w-[100px] sm:h-[100px] '
            />
          </div>

          <div className='flex flex-col justify-center items-center gap-2'>
            <h1 className='2xl:text-5xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-2xl '>
              {userProfile?.firstname} {userProfile?.lastname}
            </h1>
            <span className='text-base text-gray-400'>
              {userProfile?.username}
            </span>
            <p className='2xl:w-[60%] text-center text-base '>
              {userProfile?.bio}
            </p>
          </div>
          <div className='flex justify-center items-center gap-3'>
            <button
              type='button'
              className='bg-gray-200 font-semibold p-2 px-5 rounded-full '
            >
              Share
            </button>
            <button
              type='button'
              onClick={() => setEditProfileModal(true)}
              className='bg-gray-200 font-semibold p-2 px-5 rounded-full '
            >
              Edit profiile
            </button>
          </div>
        </header>

        <div className='flex justify-center items-center gap-5 w-full py-4 font-semibold'>
          <button
            type='button'
            onClick={() => setProfileTab('listings')}
            className={`${
              profileTab === 'listings' ? 'border-b-[3px] border-black' : ''
            }`}
          >
            Listings
          </button>
          <button
            type='button'
            onClick={() => setProfileTab('sold')}
            className={`${
              profileTab === 'sold' ? 'border-b-[3px] border-black' : ''
            }`}
          >
            Sold
          </button>
          <button
            type='button'
            onClick={() => setProfileTab('favorite')}
            className={`${
              profileTab === 'favorite' ? 'border-b-[3px] border-black' : ''
            }`}
          >
            Favorite
          </button>
        </div>

        {profileTab === 'listings' && (
          <section className='grid 2xl:grid-cols-3 2xl:gap-5 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:gap-5 '>
            {userProfile?.listings?.map((userListing) => {
              return (
                <article
                  key={userListing.id}
                  className='flex flex-col gap-3 bg-white shadow-2xl p-4 rounded-lg'
                >
                  <Image
                    src={userListing?.images?.[0]}
                    alt='image'
                    width={500}
                    height={500}
                    className='rounded-lg'
                  />
                  <div className=''>
                    <h1 className='2xl:text-lg '>{userListing.title}</h1>
                    <span className='text-sm text-gray-400'>
                      {userListing.address}
                    </span>
                  </div>
                  <h1 className='2xl:text-xl text-[#F30A49] '>
                    {userListing.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'NGN',
                    })}
                  </h1>
                </article>
              )
            })}
          </section>
        )}

        {editProfileModal && (
          <>
            <div
              className='bg-[#000000d8] fixed w-full h-full top-0 left-0 '
              onClick={() => setEditProfileModal(false)}
            ></div>
            <section
              className='absolute top-0 bg-white rounded-lg flex flex-col gap-7 2xl:m-auto 2xl:w-[80%] 2xl:p-10 2xl:left-[10rem] md:w-full md:left-0 
              md:p-10 sm:p-5 sm:w-full sm:top-0 sm:left-0 sm:m-0'
            >
              <div className='flex justify-start items-center gap-4 lg:flex-row md:flex-row sm:flex-row'>
                <Image
                  src={
                    selectedImage ||
                    `${process.env.API_ENDPOINT}/${userProfile?.avatarUrl}` ||
                    'https://via.placeholder.com/500'
                  }
                  alt='Profile Picture'
                  width={1000}
                  height={1000}
                  className='rounded-full p-[2px] bg-[#F30A49] object-cover 2xl:h-[130px] 2xl:w-[130px] xl:w-[130px] xl:h-[130px] md:w-[120px] 
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
                    className='bg-[#F30A49] text-white px-4 py-2 rounded-lg  h-[45px] flex justify-center items-center ml-auto xl:mt-10 lg:mt-5 lg:w-[150px] 
                    md:w-[150px] sm:w-full '
                  >
                    {loading ? 'Loading...' : 'Save'}
                  </button>
                </Form>
              </Formik>
            </section>
          </>
        )}
      </main>
    </>
  )
}

export default Profile
