import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faBarsStaggered, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { setAddListingModal } from '@/slice/listingSlice'
import { getProfile } from '@/slice/userSlice'
import Button from '@/hooks/button'
import Search from '@/hooks/search'
import { logout } from '@/slice/logoutSlice'
import { getNotifications, setNotifyModal } from '@/slice/notificationSlice'
import moment from 'moment'
import useClickOutsideToClose from '@/hooks/clickOutisdeToClose'

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-100%' },
}

const DashboardHeader = () => {
  const ref = useRef()
  const router = useRouter()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const userProfile = useSelector((state) => state.user.userProfile)
  const notification = useSelector((state) => state.notifications.activities)
  const modal = useSelector((state) => state.notifications.notifyModal)

  const handleClose = () => {
    dispatch(setNotifyModal(false))
  }

  useClickOutsideToClose(ref, handleClose)

  const handleLogout = async () => {
    try {
      await dispatch(logout())
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  // get profile
  useEffect(() => {
    const userId = localStorage.getItem('userId')
    dispatch(getProfile(userId))
  }, [dispatch])

  useEffect(() => {
    dispatch(getNotifications())
  }, [dispatch])

  return (
    <>
      <main className='flex xl:flex-row md:p-5 md:flex-row sm:p-5 sm:gap-5 sm:flex-row items-center relative '>
        <Search />

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
            onClick={() => dispatch(setNotifyModal(true))}
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

        {modal && (
          <article
            ref={ref}
            className='absolute top-[5rem] right-10 bg-white shadow-2xl rounded-lg z-20 p-2 flex flex-col divide-y divide-[#9DB2BF] overflow-auto 
          xl:w-[400px] xl:h-[400px] md:w-full md:h-[400px] sm:w-full sm:h-[400px] '
          >
            {notification.map((activities) => {
              return (
                <div className='flex justify-start items-center gap-3 py-2'>
                  <FontAwesomeIcon
                    icon={faBell}
                    className='text-xl border border-[#9DB2BF] text-[#9DB2BF] rounded-full p-1'
                  />

                  <div className='flex flex-col gap-1 '>
                    <div className='flex flex-col flex-wrap '>
                      <h1 className='text-sm '>{activities.activity}</h1>
                      <p className='text-[14px]'>{activities.listing}</p>
                    </div>
                    <span className='text-[11px] text-[#8097a5] '>
                      {moment(activities.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
              )
            })}
          </article>
        )}
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
                label='Add listings'
                onClick={() => {
                  dispatch(setAddListingModal(true))
                  setShowModal(false)
                }}
                className='w-full rounded-md h-[50px] '
                // className='bg- text-white font-medium h-[45px] px-4 rounded-lg w-full flex justify-center items-center '
              />
              <Button
                type='button'
                label='Logout'
                onClick={handleLogout}
                className='w-full rounded-md h-[50px] '
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
