import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DashboardLayout from '@/components/DashboardLayout'
import { setEditProfileModal, setUserProfile } from '@/slice/userSlice'
import { setLoading } from '@/slice/listingSlice'

import 'react-toastify/dist/ReactToastify.css'

const Profile = () => {
  const dispatch = useDispatch()
  const [profileTab, setProfileTab] = useState('listings')

  const userProfile = useSelector((state) => state.user.userProfile)
  const loading = useSelector((state) => state.listings.loading)

  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      try {
        const response = await fetch(
          `${process.env.API_ENDPOINT_RENDER}/api/profile?userId=${userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (data?.status === true) {
          dispatch(setUserProfile(data.profile))
          dispatch(setLoading(false))
        } else {
          dispatch(setLoading(false))
        }
      } catch (error) {
        console.error(error)
      }
    }

    getUserProfile()
  }, [dispatch])

  if (loading) {
    return <p className='p-10 text-4xl'>Loading...</p>
  }

  return (
    <DashboardLayout>
      <main className='flex flex-col justify-start items-start gap-4 mx-auto relative md:px-8 md:py-8 sm:px-5 sm:py-8 '>
        <header className='flex flex-col justify-center items-center gap-5 mx-auto'>
          <div className='flex justify-start 2xl:items-center xl:items-center lg:items-center md:items-start sm:items-start gap-4 lg:flex-row md:flex-row sm:flex-col'>
            <Image
              src={userProfile?.avatarUrl || 'https://via.placeholder.com/500'}
              alt='Profile Picture'
              width={500}
              height={500}
              className='rounded-full p-[2px] bg-[#F30A49] object-cover 2xl:h-[130px] 2xl:w-[130px] xl:w-[80px] xl:h-[80px] md:w-[120px] md:h-[120px] 
              sm:w-[120px] sm:h-[120px] '
            />
          </div>

          <div className='flex flex-col justify-center items-center gap-2 w-full'>
            <div className='flex flex-col gap-1 justify-center items-center'>
              <h1 className='2xl:text-5xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-4xl text-center '>
                {userProfile?.firstname} {userProfile?.lastname}
              </h1>
              <span className='text-base text-gray-400 font-medium'>
                @{userProfile?.username}
              </span>
            </div>
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
              onClick={() => dispatch(setEditProfileModal(true))}
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
      </main>
    </DashboardLayout>
  )
}

export default Profile
