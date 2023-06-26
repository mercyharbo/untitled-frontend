import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import DashboardLayout from '@/components/DashboardLayout'
import { setLoading, setUser } from '@/slice/userAccountSlice'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot,
  faMessage,
  faPhone,
  faStar,
} from '@fortawesome/free-solid-svg-icons'

const User = () => {
  const router = useRouter()
  const { id } = router.query // Get the id parameter from the router query

  console.log(id, 'as id')
  console.log(router, 'as id')

  const dispatch = useDispatch()
  const [profileTab, setProfileTab] = useState('listings')

  const user = useSelector((state) => state.usersAccount.user)
  console.log(user, 'as userssss')

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${process.env.API_ENDPOINT_RENDER}/api/users/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()
        if (data?.status === true) {
          dispatch(setUser(data.user))
          dispatch(setLoading(false))
        } else {
          dispatch(setLoading(false))
          // setErrorMsg(data.error)
        }
      } catch (error) {
        console.error(error)
      }
    }

    getUser()
  }, [dispatch, id])

  return (
    <DashboardLayout>
      <main className='flex flex-col gap-5 justify-center w-full'>
        <header className='flex flex-col justify-center items-center gap-5 mx-auto'>
          <div className='flex justify-start 2xl:items-center xl:items-center lg:items-center md:items-start sm:items-start gap-4 lg:flex-row md:flex-row sm:flex-col'>
            <Image
              src={
                // selectedImage ||
                user?.avatarUrl || 'https://via.placeholder.com/500'
              }
              alt='Profile Picture'
              width={500}
              height={500}
              className='rounded-full p-[2px] bg-[#F30A49] object-cover 2xl:h-[130px] 2xl:w-[130px] xl:w-[80px] xl:h-[80px] md:w-[120px] md:h-[120px] 
              sm:w-[120px] sm:h-[120px] '
            />
          </div>

          <div className='flex flex-col justify-center items-center gap-4 w-full'>
            <div className='flex flex-col gap-2 justify-center items-center'>
              <h1 className='2xl:text-5xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-4xl text-center '>
                {user?.firstname} {user?.lastname}
              </h1>
              <div className='flex gap-3 divide-x-2'>
                <span className='text-sm text-gray-500 font-medium'>
                  @{user.username}
                </span>
                <span className='text-sm text-gray-500 font-medium flex items-center gap-1 px-3'>
                  <FontAwesomeIcon icon={faLocationDot} />
                  {user.address}
                </span>
              </div>
            </div>
            <p className='2xl:w-[60%] text-center text-base '>{user?.bio}</p>
          </div>

          <div className='flex justify-center items-center gap-3'>
            <Link
              href={`tel:${user.phoneNumber}`}
              className='bg-gray-200 font-semibold p-2 px-5 rounded-full flex gap-3 justify-center items-center '
            >
              <FontAwesomeIcon icon={faPhone} />
              Contact
            </Link>
            <button
              type='button'
              className='bg-gray-200 font-semibold p-2 px-5 rounded-full flex gap-3 justify-center items-center '
            >
              <FontAwesomeIcon icon={faMessage} />
              Message
            </button>
            <button
              type='button'
              className='bg-gray-200 font-semibold p-2 px-5 rounded-full flex gap-3 justify-center items-center '
            >
              <FontAwesomeIcon icon={faStar} />
              Rate
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
            {user?.listings?.map((userListing) => {
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

export default User
