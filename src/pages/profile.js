import { Form, Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Profile = () => {
  const [userProfile, setUserProfile] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsloading] = useState(true)

  console.log(userProfile, 'as profile')

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
        setUserProfile(data.user)
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

  useEffect(() => {
    getUserProfile()
  }, [])

  return (
    <main className='p-10 flex justify-start items-start gap-5 xl:flex-row md:flex-row sm:flex-col '>
      <section className='2xl:w-[20%] xl:w-[20%] md:w-[20%] flex flex-col justify-start items-start gap-5 '>
        <span className='text-base font-medium'>Profile</span>
        <span className='text-base font-medium'>Notification</span>
        <span className='text-base font-medium'>Password</span>
        <span className='text-base font-medium'>Privacy</span>
      </section>

      <section className='2xl:w-[70%] xl:w-[70%] md:w-[80%] flex flex-col justify-start items-start gap-4 w-full bg-white shadow-2xl rounded-lg p-10 '>
        <h1 className='2xl:text-3xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-XL font-bold'>
          Profile
        </h1>
        <div className='flex items-center gap-4'>
          <Image
            src='https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
            alt='Profile Picture'
            width={500}
            height={500}
            className='rounded-full 2xl:h-[80px] 2xl:w-[80px] xl:w-[80px] xl:h-[80px] md:w-[100px] md:h-[100px] '
          />

          <input
            type='button'
            value='Upload'
            className='border text-red-500 h-[40px] px-4 rounded-lg font-medium cursor-pointer hover:bg-black hover:text-white'
          />
          <button
            type='button'
            className='border text-grey-400 h-[40px] px-4 rounded-lg font-medium cursor-pointer hover:bg-black hover:text-white'
          >
            Remove
          </button>
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
                    setUserProfile(updatedProfile)
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
                    setUserProfile(updatedProfile)
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
                    setUserProfile(updatedProfile)
                  }}
                  className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
                />
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <label htmlFor='firstname' className='font-medium'>
                Address
              </label>
              <input
                type='text'
                name='firstname'
                value={userProfile.address}
                onChange={(e) => {
                  const updatedProfile = {
                    ...userProfile,
                    address: e.target.value,
                  }
                  setUserProfile(updatedProfile)
                }}
                className='border border-gray-400 h-[45px] w-full indent-3 outline-none rounded-lg'
              />
            </div>

            <button
              type='submit'
              className='bg-red-500 text-white px-4 py-2 rounded-lg w-[150px] h-[45px] flex justify-center items-center ml-auto xl:mt-10 lg:mt-5 '
            >
              Save
            </button>
          </Form>
        </Formik>
      </section>
    </main>
  )
}

export default Profile
