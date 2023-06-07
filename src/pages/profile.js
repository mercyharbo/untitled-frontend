import { setLoading } from '@/slice/listingSlice'
import { setUserProfile } from '@/slice/userSlice'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
  const dispatch = useDispatch()

  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsloading] = useState(true)

  const [activeTab, setActiveTab] = useState('Profile')

  const userProfile = useSelector((state) => state.user.userProfile)
  // const token = useSelector((state) => state.user.token)
  const loading = useSelector((state) => state.listings.loading)

  /**
   * This function retrieves a user's profile information from a server using an authentication token.
   */
  const getUserProfile = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`http://localhost:3000/api/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (data?.status === true) {
        setIsloading(false)
        dispatch(setUserProfile(data.user))
        dispatch(setLoading(false))
      } else {
        setIsloading(false)
        setErrorMsg(data.error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const updateUserProfile = async (updatedProfile) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`http://localhost:3000/api/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      })

      const data = await response.json()

      if (data?.status === true) {
        console.log('Profile updated successfully')
      } else {
        console.error('Failed to update profile:', data.error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getProtectedRoute = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://localhost:3000/api/protected', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (data.status === true) {
        console.log('You are authenticated')
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProtectedRoute()
    getUserProfile()
  }, [])

  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
  }

  if (loading) {
    return <p className=''>Loading...</p>
  }

  return (
    <>
      <Head>
        <title> Untitled Realty | {userProfile.username}</title>
        <meta
          name='description'
          content='Access the exclusive realtor login at Untitled Realty and unlock your dream home. Discover personalized listings, powerful tools, and expert guidance to make your real estate journey a success. Join our network of top realtors and gain an edge in the competitive housing market.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='lg:p-10 flex justify-start items-start gap-5 xl:flex-row md:flex-row md:p-10 sm:p-5 sm:flex-col '>
        <section
          className='2xl:w-[20%] xl:w-[20%] xl:flex-col xl:justify-start xl:items-start md:flex-col md:justify-start md:items-start md:w-[20%] 
      sm:flex-row sm:justify-between sm:items-center sm:w-full sm:p-3 rounded-lg bg-white shadow-2xl flex gap-2 cursor-pointer'
        >
          <span
            className={`text-base h-[40px] w-full px-2 flex justify-start items-center font-semibold ${
              activeTab === 'Profile' ? 'bg-[#ffb703] h-[40px] rounded-md' : ''
            }`}
            onClick={() => handleTabClick('Profile')}
          >
            Profile
          </span>
          <span
            className={`text-base h-[40px] w-full px-2 flex justify-start items-center font-semibold ${
              activeTab === 'Notification'
                ? 'bg-[#ffb703] h-[40px] rounded-md'
                : ''
            }`}
            onClick={() => handleTabClick('Notification')}
          >
            Notification
          </span>
          <span
            className={`text-base h-[40px] w-full px-2 flex justify-start items-center font-semibold ${
              activeTab === 'Password'
                ? 'bg-[#ffb703] h-[40px] rounded-md '
                : ''
            }`}
            onClick={() => handleTabClick('Password')}
          >
            Password
          </span>
          <span
            className={`text-base h-[40px] w-full px-2 flex justify-start items-center font-semibold ${
              activeTab === 'Privacy' ? 'bg-[#ffb703] h-[40px] rounded-md' : ''
            }`}
            onClick={() => handleTabClick('Privacy')}
          >
            Privacy
          </span>
        </section>

        {activeTab === 'Profile' && (
          <section
            className='2xl:w-[70%] xl:w-[70%] lg:p-10 md:w-[80%] md:p-10 sm:p-5 sm:w-[100%] flex flex-col justify-start items-start gap-4 
      bg-white shadow-2xl rounded-lg  '
          >
            <Link
              href={'/'}
              className='2xl:text-3xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-2xl font-bold'
            >
              Profile
            </Link>
            <div className='flex justify-start 2xl:items-center xl:items-center lg:items-center md:items-start sm:items-start gap-4 lg:flex-row md:flex-row sm:flex-col'>
              <Image
                src='https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
                alt='Profile Picture'
                width={500}
                height={500}
                className='rounded-full 2xl:h-[80px] 2xl:w-[80px] xl:w-[80px] xl:h-[80px] md:w-[100px] md:h-[100px] sm:w-[80px] sm:h-[80px] '
              />

              <div className='flex flex-row justify-start items-start gap-5'>
                <input
                  type='button'
                  value='Upload'
                  className='border h-[40px] px-4 rounded-lg font-semibold cursor-pointer hover:bg-black hover:text-white'
                />
                <button
                  type='button'
                  className='border h-[40px] px-4 rounded-lg font-semibold cursor-pointer hover:bg-black hover:text-white'
                >
                  Remove
                </button>
              </div>
            </div>
            <hr />
            <Formik
              initialValues={userProfile}
              onSubmit={(values) => {
                updateUserProfile(values)
              }}
            >
              <Form className='flex flex-col gap-5 w-full'>
                <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5'>
                  <div className='flex flex-col gap-3'>
                    <label htmlFor='username' className='font-medium'>
                      Username
                    </label>
                    <input
                      type='text'
                      name='username'
                      value={userProfile.username}
                      onChange={(e) => {
                        const updatedProfile = {
                          ...userProfile,
                          username: e.target.value,
                        }
                        dispatch(setUserProfile(updatedProfile))
                      }}
                      className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
                    />
                  </div>

                  <div className='flex flex-col gap-3'>
                    <label htmlFor='email' className='font-medium'>
                      Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={userProfile.email}
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
                    <input
                      type='text'
                      name='firstname'
                      value={userProfile.firstname}
                      onChange={(e) => {
                        const updatedProfile = {
                          ...userProfile,
                          firstname: e.target.value,
                        }
                        dispatch(setUserProfile(updatedProfile))
                      }}
                      className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
                    />
                  </div>
                  <div className='flex flex-col gap-3'>
                    <label htmlFor='lastname' className='font-medium'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      name='lastname'
                      value={userProfile.lastname}
                      onChange={(e) => {
                        const updatedProfile = {
                          ...userProfile,
                          lastname: e.target.value,
                        }
                        dispatch(setUserProfile(updatedProfile))
                      }}
                      className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
                    />
                  </div>
                </div>

                <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5'>
                  <div className='flex flex-col gap-3'>
                    <label htmlFor='address' className='font-medium'>
                      Address
                    </label>
                    <input
                      type='text'
                      name='address'
                      value={userProfile.address}
                      onChange={(e) => {
                        const updatedProfile = {
                          ...userProfile,
                          address: e.target.value,
                        }
                        dispatch(setUserProfile(updatedProfile))
                      }}
                      className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
                    />
                  </div>
                  <div className='flex flex-col gap-3'>
                    <label htmlFor='state' className='font-medium'>
                      State
                    </label>
                    <input
                      type='text'
                      name='state'
                      value={userProfile.state}
                      onChange={(e) => {
                        const updatedProfile = {
                          ...userProfile,
                          state: e.target.value,
                        }
                        dispatch(setUserProfile(updatedProfile))
                      }}
                      className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
                    />
                  </div>
                </div>

                <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5'>
                  <div className='flex flex-col gap-3'>
                    <label htmlFor='phoneNumber' className='font-medium'>
                      Phone Number
                    </label>
                    <input
                      type='text'
                      name='phoneNumber'
                      value={userProfile.phoneNumber}
                      onChange={(e) => {
                        const updatedProfile = {
                          ...userProfile,
                          phoneNumber: e.target.value,
                        }
                        dispatch(setUserProfile(updatedProfile))
                      }}
                      className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
                    />
                  </div>
                </div>

                <button
                  type='submit'
                  className='bg-red-500 text-white px-4 py-2 rounded-lg  h-[45px] flex justify-center items-center ml-auto xl:mt-10 lg:mt-5 lg:w-[150px] 
              md:w-[150px] sm:w-full '
                >
                  Save
                </button>
              </Form>
            </Formik>
          </section>
        )}

        {activeTab === 'Notification' && (
          <section className=''>
            <h1 className='text-4xl font-semibold'>Notification</h1>
          </section>
        )}

        {activeTab === 'Password' && (
          <section className=''>
            <h1 className='text-4xl font-semibold'>Password</h1>
          </section>
        )}

        {activeTab === 'Privacy' && (
          <section className=''>
            <h1 className='text-4xl font-semibold'>Privacy</h1>
          </section>
        )}
      </main>
    </>
  )
}

export default Profile
