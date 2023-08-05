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
import ShortenedText from '@/hooks/ShortenedText'

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

  const handleMarkAllAsRead = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT_RENDER}/api/notification/mark-all-as-read`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (data.status === true) {
        router.reload()
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.error(error)
      return rejectWithValue('An error occurred. Please try again later.')
    }
  }

  return (
    <>
      <main className='flex xl:flex-row md:p-5 md:flex-row sm:p-5 sm:gap-5 sm:flex-row items-center relative '>
        {/* <Search /> */}

        <div className='flex xl:w-[50%] xl:justify-end xl:gap-10 items-center md:ml-auto sm:gap-5 sm:ml-auto '>
          <Button
            type='button'
            onClick={() => {
              dispatch(setAddListingModal(true))
            }}
            label='Add listing'
            className='bg-color3 text-white h-[50px] justify-center items-center 2xl:px-5 xl:px-5 xl:flex md:px-5 sm:px-5 sm:hidden rounded-full shadow-2xl font-medium '
          />

          <div className='relative'>
            {notification?.filter((unread) => !unread.isRead)?.length > 0 && (
              <span className='absolute -top-2 right-0 bg-red text-white rounded-full w-[25px] h-[25px] text-[11px] flex justify-center items-center font-medium '>
                {notification?.filter((unread) => !unread.isRead)?.length}
              </span>
            )}
            <button
              type='button'
              onClick={() => dispatch(setNotifyModal(true))}
              className='xl:flex bg-color3 xl:w-[50px] xl:h-[50px] justify-center items-center rounded-full md:flex md:w-[60px] md:h-[60px] sm:flex sm:w-[50px] sm:h-[50px] '
            >
              <FontAwesomeIcon
                icon={faBell}
                className='xl:text-3xl md:text-2xl sm:text-xl text-white'
              />
            </button>
          </div>

          <Link href={'/profile'} className=''>
            <Image
              src={
                userProfile.avatarUrl
                  ? userProfile?.avatarUrl
                  : 'https://via.placeholder.com/500'
              }
              alt='Profile Picture'
              width={500}
              height={500}
              className='rounded-full border-[3px] border-color3 2xl:h-[60px] 2xl:w-[60px] xl:w-[70px] xl:h-[70px] md:w-[70px] md:h-[70px] sm:w-[50px] sm:h-[50px] object-cover'
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
          <>
            <div className='bg-[#000000d8] fixed w-full h-full top-0 left-0 z-10 '></div>
            <article
              ref={ref}
              className='category-container absolute bg-white shadow-2xl rounded-lg z-20 p-4 flex flex-col justify-between gap-3  overflow-auto xl:top-[5rem] xl:right-10
          xl:w-[400px] xl:h-[500px] md:w-full md:h-[400px] md:right-0 md:top-[7rem] sm:w-full sm:h-[500px] sm:right-0 sm:top-0 '
            >
              <div className='flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                  <h1 className=''>Notifications</h1>
                  {/* <p className='text-sm'>Do not disturb </p> */}
                </div>
                {notification
                  ?.slice(0, 10)
                  .map((activities, index) => {
                    return (
                      <div
                        key={index}
                        className='flex justify-start items-start gap-3 relative after:absolute after:w-full after:border-b-2 after:border-softgrey after:-bottom-2 '
                      >
                        {activities.isRead === false && (
                          <div className='p-1 mt-2 rounded-full bg-red shadow-lg'></div>
                        )}

                        <div className='flex flex-col gap-2 '>
                          <div className='flex flex-col flex-wrap '>
                            <h1 className='text-[14px] capitalize '>
                              {activities.activity}
                            </h1>
                            {activities.comment && (
                              <p className='text-[14px] text-[grey] '>
                                <ShortenedText
                                  text={activities.comment}
                                  maxLength={150}
                                />
                              </p>
                            )}
                          </div>
                          <span className='text-[11px] text-[#8097a5] '>
                            {moment(activities.createdAt).fromNow()}
                          </span>
                        </div>
                      </div>
                    )
                  })
                  .reverse()}

                {notification.length === 0 && (
                  <div className='flex flex-col justify-center items-center gap-4 mt-[8rem] '>
                    <h1>There is no activities available</h1>
                  </div>
                )}
              </div>

              {notification.length > 0 && (
                <Button
                  type='button'
                  label='Mark all as read'
                  onClick={handleMarkAllAsRead}
                  className='rounded-lg h-[60px] py-2 '
                />
              )}
            </article>
          </>
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
                href={'/notifications'}
                className='flex justify-between items-center relative w-full'
              >
                Notifications
                {notification?.filter((unread) => !unread.isRead)?.length >
                  0 && (
                  <span className='bg-color3 text-white rounded-full w-[30px] h-[30px] absolute right-0 top-2 flex justify-center items-center text-sm '>
                    {notification?.filter((unread) => !unread.isRead)?.length}
                  </span>
                )}
              </Link>

              <Button
                type='button'
                label='Add listings'
                onClick={() => {
                  dispatch(setAddListingModal(true))
                  setShowModal(false)
                }}
                className='w-full rounded-md h-[50px] '
              />

              <Button
                type='button'
                label='Logout'
                onClick={handleLogout}
                className='w-full rounded-md h-[50px] '
              />
            </article>
          </motion.nav>
        </>
      )}
    </>
  )
}

export default DashboardHeader
