import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DashboardLayout from '@/components/DashboardLayout'
import { setEditProfileModal, setUserProfile } from '@/slice/userSlice'
import { setLoading, setUserListings } from '@/slice/listingSlice'

import 'react-toastify/dist/ReactToastify.css'
import Button from '@/hooks/button'
import Spinner from '@/hooks/LoadingSpinner'
import Link from 'next/link'

const Profile = () => {
  const dispatch = useDispatch()
  const [profileTab, setProfileTab] = useState('listings')

  const userProfile = useSelector((state) => state.user.userProfile)
  const loading = useSelector((state) => state.listings.loading)
  const userListing = useSelector((state) => state.listings.userListings)

  const getUserListing = async () => {
    dispatch(setLoading(true))

    const userId = localStorage.getItem('userId')
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/users/${userId}/listings`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()

      if (data?.status === true) {
        dispatch(setUserListings(data.listings))
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getUserProfile = async () => {
    dispatch(setLoading(true))
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

  useEffect(() => {
    getUserListing()
    getUserProfile()
  }, [dispatch])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen m-auto'>
        <Spinner />
      </div>
    )
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
              className='rounded-full p-[2px] bg-color3 object-cover 2xl:h-[130px] 2xl:w-[130px] xl:w-[80px] xl:h-[80px] md:w-[120px] md:h-[120px] 
              sm:w-[120px] sm:h-[120px] '
            />
          </div>

          <div className='flex flex-col justify-center items-center gap-2 w-full'>
            <div className='flex flex-col gap-1 justify-center items-center'>
              <h1 className='2xl:text-5xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-4xl text-center '>
                {userProfile?.firstname} {userProfile?.lastname}
              </h1>
              <span className='text-base text-[gray] font-medium'>
                @{userProfile?.username}
              </span>
            </div>
            <p className='2xl:w-[60%] text-center text-base '>
              {userProfile?.bio}
            </p>
          </div>
          <div className='flex justify-center items-center gap-3'>
            <Button
              type='button'
              label='Share'
              className='px-5 rounded-full bg-color3 '
            />

            <Button
              type='button'
              label='Edit profile'
              onClick={() => dispatch(setEditProfileModal(true))}
              className='px-5 rounded-full '
            />
          </div>
        </header>

        <div className='flex justify-center items-center gap-5 w-full py-4 font-semibold'>
          <button
            type='button'
            onClick={() => setProfileTab('listings')}
            className={`${
              profileTab === 'listings' ? 'border-b-[3px] border-color3' : ''
            }`}
          >
            Listings
          </button>
          <button
            type='button'
            onClick={() => setProfileTab('sold')}
            className={`${
              profileTab === 'sold' ? 'border-b-[2px] border-black' : ''
            }`}
          >
            Sold
          </button>
          <button
            type='button'
            onClick={() => setProfileTab('favorite')}
            className={`${
              profileTab === 'favorite' ? 'border-b-[2px] border-black' : ''
            }`}
          >
            Favorite
          </button>
        </div>

        {profileTab === 'listings' && (
          <section className='grid 3xl:grid-cols-4 2xl:grid-cols-4 2xl:gap-5 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:gap-5 '>
            {userListing?.map((listing) => {
              return (
                <Link
                  key={listing._id}
                  href={`/listings/${listing._id}`}
                  className='flex flex-col gap-3 bg-white shadow-2xl p-4 rounded-lg'
                >
                  <Image
                    src={listing?.images?.[0]}
                    alt='image'
                    width={500}
                    height={500}
                    className='rounded-lg object-cover 3xl:h-[250px] 2xl:h-[250px] xl:h-[250px] md:h-[250px] sm:h-[200px] '
                  />
                  <div className='h-full flex flex-col justify-between items-start'>
                    <div className='flex flex-col gap-1'>
                      <h1 className='2xl:text-lg '>{listing.title}</h1>
                      <span className='text-sm text-[gray] '>
                        {listing.address}
                      </span>
                    </div>
                  </div>
                  <h1 className='2xl:text-xl text-black '>
                    {listing.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'NGN',
                    })}
                  </h1>
                </Link>
              )
            })}
          </section>
        )}
      </main>
    </DashboardLayout>
  )
}

export default Profile
