import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faBarsStaggered, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { setAddListingModal } from '@/slice/listingSlice'
import {
  setSearchQuery,
  setSearched,
  setToken,
  setUserProfile,
} from '@/slice/userSlice'
import Button from '@/hooks/button'

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-100%' },
}

const DashboardHeader = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const searchQuery = useSelector((state) => state.user.searchQuery)
  const userProfile = useSelector((state) => state.user.userProfile)
  const searchedKeywords = useSelector((state) => state.user.searched)

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/logout`,
        {
          method: 'POST',
        }
      )

      const data = await response.json()

      if (data.status === true) {
        localStorage.removeItem('token')
        dispatch(setToken(null)) // Update token to null
        router.push('/login')
      }
    } catch (error) {
      console.error('An error occurred during logout', error)
    }
  }

  const getSearchDatas = async () => {
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/search?q=${searchQuery}`,
        {
          method: 'GET',
        }
      )

      const data = await response.json()
      if (data.status === true) {
        dispatch(setSearched(data))
      } else {
        console.log('Cannot find the searched keywords')
      }
    } catch (error) {}
  }

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        getSearchDatas()
      }
    }, 500) // Adjust the delay duration (in milliseconds) to your desired value

    return () => {
      clearTimeout(delayTimer) // Clear the timeout when component unmounts or searchQuery changes
    }
  }, [searchQuery])

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
        } else {
          console.log('error occured')
        }
      } catch (error) {
        console.error(error)
      }
    }

    getUserProfile()
  }, [dispatch])

  return (
    <>
      <main className='flex xl:flex-row md:p-5 md:flex-row sm:p-5 sm:gap-5 sm:flex-row items-center '>
        <div className='relative xl:w-[50%] md:w-[50%] w-full'>
          <input
            type='text'
            name='search'
            placeholder='Search estate agent'
            className='h-[55px] lg:w-[400px] md:w-[400px] sm:w-full sm:h-[55px] py-4 rounded-full outline-none border-2 border-color2 focus:border-hover indent-3 '
            value={searchQuery}
            onChange={(e) => {
              dispatch(setSearchQuery(e.target.value))
            }}
          />
          {searchQuery && (
            <div className='xl:w-auto md:w-full sm:w-full h-auto absolute top-20 left-0 p-5 rounded-lg shadow-2xl bg-white z-20 flex flex-col gap-5 '>
              {searchedKeywords?.users?.map((usersFound) => {
                return (
                  <Link
                    key={usersFound._id}
                    href={`/users/${usersFound._id}`}
                    onClick={() => dispatch(setSearchQuery(''))}
                    className='flex justify-start items-center gap-5 bg-white shadow-2xl p-2 rounded-lg w-full'
                  >
                    <Image
                      src={usersFound.avatarUrl}
                      alt={usersFound.username}
                      width={500}
                      height={500}
                      className='h-[70px] w-[70px] rounded-full object-cover '
                    />
                    <div className='flex flex-col gap-1'>
                      <h1 className='text-xl font-bold'>
                        {usersFound.firstname} {usersFound.lastname}
                      </h1>
                      <span className='text-sm text-gray-500 font-semibold'>
                        @{usersFound.username}
                      </span>
                      <span className='text-sm text-gray-500 font-medium'>
                        {usersFound.address}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className='flex xl:w-[50%] xl:justify-end xl:gap-10 xl:items-center md:w-[50%] md:gap-8 md:justify-end md:items-center '>
          <button
            type='button'
            onClick={() => {
              dispatch(setAddListingModal(true))
            }}
            className='bg-color3 text-white h-[50px] justify-center items-center 2xl:px-5 xl:px-5 xl:flex md:px-5 sm:px-5 sm:hidden rounded-full shadow-2xl font-medium '
          >
            Add Listing
          </button>

          <button
            type='button'
            className='xl:flex xl:bg-color3 xl:w-[50px] xl:h-[50px] xl:justify-center xl:items-center xl:rounded-full md:flex sm:hidden '
          >
            <FontAwesomeIcon icon={faBell} className='text-3xl text-white' />
          </button>

          <Link href={'/profile'} className='xl:flex md:flex sm:hidden'>
            <Image
              src={
                userProfile.avatarUrl
                  ? userProfile?.avatarUrl
                  : 'https://via.placeholder.com/500'
              }
              alt='Profile Picture'
              width={500}
              height={500}
              className='rounded-full border-[3px] border-color3 2xl:h-[60px] 2xl:w-[60px] xl:w-[70px] xl:h-[70px] md:w-[70px] md:h-[70px] sm:w-[80px] sm:h-[80px] object-cover'
            />
          </Link>

          <button
            type='button'
            onClick={() => setShowModal(!showModal)}
            className='xl:hidden md:flex sm:flex '
          >
            <FontAwesomeIcon icon={faBarsStaggered} className='text-[30px] ' />
          </button>
        </div>
      </main>

      {showModal && (
        <>
          <div
            onClick={() => setShowModal(false)}
            className='fixed top-0 left-0 z-10 w-full h-screen bg-[#000000bb]'
          ></div>
          <motion.nav
            initial='closed'
            animate={showModal ? 'open' : 'closed'}
            variants={variants}
            transition={{ duration: 0.5 }}
            className='flex flex-col justify-start items-start gap-5 absolute top-0 left-0 bg-white h-auto rounded-lg pb-10 md:w-full 
            sm:w-full z-10 text-black'
          >
            <header className='flex justify-between w-full p-5'>
              <Link href={'/'} className='logo font-bold text-2xl'>
                Untitlted
              </Link>

              <button type='button' onClick={() => setShowModal(false)}>
                <FontAwesomeIcon icon={faClose} className='text-[30px]' />
              </button>
            </header>

            <article className='flex flex-col justify-start items-start gap-5 px-5 font-medium w-full text-lg'>
              <Link href={'/rent'}>Rent</Link>
              <Link href={'/sell'}>Sell</Link>
              <Link href={'/listings'}>Listings</Link>
              <Link href={'/profile'}>Profile</Link>

              <Link
                href={'/messages'}
                className='flex justify-between items-center relative w-full'
              >
                Messages
                <span className='bg-color3 text-white rounded-full w-[30px] h-[30px] absolute right-0 top-2 flex justify-center items-center text-sm '>
                  3
                </span>
              </Link>

              <Link
                href={'/notification'}
                className='flex justify-between items-center relative w-full'
              >
                Notifications
                <span className='bg-color3 text-white rounded-full w-[30px] h-[30px] absolute right-0 top-2 flex justify-center items-center text-sm '>
                  1
                </span>
              </Link>

              <Button
                type='button'
                label='Logout'
                onClick={handleLogout}
                className='w-full rounded-md'
                // className='bg- text-white font-medium h-[45px] px-4 rounded-lg w-full flex justify-center items-center '
              />
            </article>
          </motion.nav>
        </>
      )}
    </>
  )
}

export default DashboardHeader
